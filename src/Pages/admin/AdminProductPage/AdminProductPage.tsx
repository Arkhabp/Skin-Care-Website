import {
  Box,
  Input,
  Text,
  Grid,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useToast,
  Select,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure
} from "@chakra-ui/react";
import axios from "axios"; // Import Axios
import Colors from "../../../constans/color";
import dataProduct from "../../../Data/dummyDataProduct";
import ProductCard from "../../../Components/cards/productCard";
import Helper from "../../../helpers";
import FooterComponent from "../../../Components/Footer";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/redux/action/admin/getProducts.fuinction";

const AdminProdukPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageNamePath, setImageNamePath] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch action to fetch products when component mounts
  }, [dispatch]);
  const products = useAppSelector((state) => state.fetchProduct.products);

  useEffect(() => {
    // Ambil kategori produk dari server ketika komponen dimount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
        console.log("categories", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filterProducts = (products: any, term: any) => {
    return products.filter((product: any) =>
      product.productName.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredDataProduct = filterProducts(dataProduct, searchTerm);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImagePath(file); // Disimpan file itu sendiri, bukan hanya namanya
    setImageNamePath(file.name); // Disimpan file itu sendiri, bukan hanya namanya
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imagePath);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      if (response.status === 200) {
        // Jika pengiriman file gambar berhasil, tambahkan path gambar ke data produk
        let productData = {
          productName,
          category,
          price,
          description,
          quantity: 1,
          image: response.data.path // Gunakan path dari respons
        };

        // Periksa apakah imageNamePath sudah terisi
        if (imageNamePath) {
          productData = { ...productData, image: imageNamePath };
        }

        // Kirim data produk ke endpoint /api/products
        const productResponse = await axios.post(
          "http://localhost:5000/api/products",
          productData
        );

        if (productResponse.status === 201) {
          // Jika penambahan produk berhasil, tampilkan pesan sukses dan reset form
          toast({
            title: "Produk berhasil ditambahkan.",
            status: "success",
            isClosable: true
          });
          setIsOpenToast(false);
          setProductName("");
          setCategory("");
          setPrice("");
          setDescription("");
          setImagePath("");
        }
      }
    } catch (error: any) {
      // Tangani kesalahan jika terjadi
      toast({
        title: "Gagal menambahkan produk.",
        description: error.message,
        status: "error",
        isClosable: true
      });
    }
  };

  const alertConfirmDelete = () => {
    onOpenAlert();
  };
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedProducts.map(async (productId) => {
          const response = await axios.delete(
            `http://localhost:5000/api/products/${productId}`
          );
          if (response.status !== 200) {
            throw new Error("Failed to delete product");
          }
        })
      );
      toast({
        title: "Produk berhasil dihapus.",
        status: "success",
        isClosable: true
      });
      setSelectedProducts([]);
      window.location.reload(); // Reload halaman setelah beberapa detik
    } catch (error) {
      console.error("Error deleting products:", error);
      toast({
        title: "Failed to delete products.",
        status: "error",
        isClosable: true
      });
    }
  };

  const handleProductSelection = (itemId: string) => {
    setSelectedProducts((prevSelected) => {
      return prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId];
    });
  };
  console.log("Selected Products", selectedProducts);
  return (
    <Box backgroundColor={Colors.lightgrey}>
      <NavbarAdmin />
      <Box px={5}>
        <Flex alignItems={"center"} justify={"space-between"}>
          <Box w={"20%"}>
            <Input
              placeholder="Cari Produk"
              size="md"
              borderColor={Colors.black}
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>

          <Flex>
            <Button
              colorScheme="teal"
              variant="solid"
              mt={4}
              mb={4}
              ml={2}
              onClick={() => setIsOpenToast(true)}
            >
              Tambah Produk
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              mt={4}
              mb={4}
              ml={2}
              onClick={() => alertConfirmDelete()}
              isDisabled={selectedProducts.length === 0}
            >
              Hapus Produk
            </Button>
          </Flex>
        </Flex>

        <Box mt={"20px"}>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            width={"100%"}
            color={Colors.darkGreen}
            mb={"12px"}
          >
            Serum
          </Text>

          {filteredDataProduct.length === 0 ? (
            <Text color={Colors.red} fontSize={"md"}>
              Produk tidak ada
            </Text>
          ) : (
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {products.map((item: any) => (
                <ProductCard
                  imageProduct={item.image} // URL ke gambar di folder uploads
                  key={item.id}
                  productName={item.productName}
                  desc={item.description}
                  price={Helper.formatPriceToRp(item.price)}
                  to={`/admin/detail-produk/${item._id}`}
                  itemId={item.id}
                  isAdmin={true}
                  isSelected={selectedProducts.includes(item._id)}
                  onSelect={() => handleProductSelection(item._id)}
                />
              ))}
            </Grid>
          )}

          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            width={"100%"}
            color={Colors.darkGreen}
            mb={"12px"}
          >
            Toner
          </Text>

          {filteredDataProduct.length === 0 ? (
            <Box minHeight="100vh">
              <Text color={Colors.red} fontSize={"md"}>
                Produk tidak ada
              </Text>
            </Box>
          ) : (
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {products.map((item: any) => (
                <ProductCard
                  imageProduct={item.image} // URL ke gambar di folder uploads
                  key={item.id}
                  productName={item.productName}
                  desc={item.description}
                  price={Helper.formatPriceToRp(item.price)}
                  to={`/admin/detail-produk/${item._id}`}
                  itemId={item.id}
                  isAdmin={true}
                  isSelected={selectedProducts.includes(item._id)}
                  onSelect={() => handleProductSelection(item._id)}
                />
              ))}
            </Grid>
          )}
        </Box>
        <Modal isOpen={isOpenToast} onClose={() => setIsOpenToast(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tambah Produk</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb="4">
                <Text>Nama Produk:</Text>
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Box>
              <Box mb="4">
                <Text>Category:</Text>
                <Select
                  placeholder="Pilih Kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box mb="4">
                <Text>Harga:</Text>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Box>
              <Box mb="4">
                <Text>Deskripsi:</Text>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box mb="4">
                <Text>Gambar:</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
                Simpan
              </Button>
              <Button onClick={() => setIsOpenToast(false)}>Batal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <AlertDialog
          isOpen={isOpenAlert}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Hapus Produk
              </AlertDialogHeader>

              <AlertDialogBody>
                Kamu yakin ingin menghapus produk ini?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                  Batal
                </Button>
                <Button colorScheme="red" onClick={handleDeleteSelected} ml={3}>
                  Hapus
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default AdminProdukPage;
