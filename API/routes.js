const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer'); 
const path = require('path');
const {getConnectedClient} = require('./database') 
const { ObjectId } = require('mongodb');

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("skincaredb").collection("products")
    return collection
}

const getAdminCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("skincaredb").collection("admin");
    return collection;
};

const JWT_SECRET = "TPLP001";
const SALT_ROUNDS = 10;

//GET 
routes.get("/products", async (req, res) => {
    const collection = getCollection()
    const products = await collection.find({}).toArray()
    res.status(200).json(products)
})

//POST
routes.post("/products", async (req, res) => {
    const collection = getCollection();
    const { productName, category, description, price, quantity, image } = req.body;

    if (!productName || !category || !description || !price || !quantity ) {
        return res.status(400).json({ msg: "Product and description are required" });
    }
    try {
        const newProduct = await collection.insertOne({ productName, category ,description, price, quantity, image });
        res.status(201).json({ msg: "Produk berhasil ditambahkan", newProduct });
    } catch (error) {
        res.status(500).json({ msg: "Error inserting product", error: error.message });
    }
});

// DELETE a product by ID
routes.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const collection = getCollection();
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product successfully deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting product", error: error.message });
    }
});

// PUT (update) a product by ID
routes.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const collection = getCollection();
    try {
        const product = await collection.findOne({ _id: new ObjectId(id) });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving product", error: error.message });
    }
});



//ADMIN ROUTES
routes.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Username and password are required" });
    }

    const collection = getAdminCollection();

    try {
        const admin = await collection.findOne({ username });

        if (!admin) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ msg: "Error during login", error: error.message });
    }
});

// Tentukan folder tempat gambar akan disimpan
const uploadDir = path.join(__dirname, './uploads');

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk mengunggah gambar
routes.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Kirim path file yang disimpan sebagai respons
  res.json({ imagePath: req.file.path });
});

// Admin registration
routes.post('/admin/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Username and password are required" });
    }

    const collection = getAdminCollection();

    try {
        const existingAdmin = await collection.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newAdmin = await collection.insertOne({ username, password: hashedPassword });

        res.status(201).json({ msg: "Admin registered successfully", newAdmin });
    } catch (error) {
        res.status(500).json({ msg: "Error registering admin", error: error.message });
    }
});

// EDIT BY ID
routes.put("/admin/product/:id", async (req, res) => {
    const { id } = req.params;
    const { productName, category, description, price, quantity, image } = req.body;
    const collection = getCollection(); // Menggunakan fungsi untuk mendapatkan koleksi dari database Anda
   

    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { productName, category, description, price, quantity, image } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product successfully updated" });
    } catch (error) {
        res.status(500).json({ msg: "Error updating product", error: error.message });
    }
});


module.exports = routes;