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
  useToast
} from "@chakra-ui/react";
import axios from "axios"; // Import Axios
import Colors from "../../../constans/color";
import dataProduct from "../../../Data/dummyDataProduct";
import ProductCard from "../../../Components/cards/productCard";
import Helper from "../../../helpers";
import { NavLink } from "react-router-dom";
import FooterComponent from "../../../Components/Footer";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/redux/action/admin/getProducts.fuinction";

const AdminProdukPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageNamePath, setImageNamePath] = useState("");
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch action to fetch products when component mounts
  }, [dispatch]);
  const products = useAppSelector((state) => state.fetchProduct.products);

  console.log("PRODUCTS", products);

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
          setIsOpen(false);
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

          <Button
            colorScheme="teal"
            variant="solid"
            mt={4}
            mb={4}
            ml={2}
            onClick={() => setIsOpen(true)}
          >
            Tambah Produk
          </Button>
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
                <NavLink to={`/admin/detail-produk/${item.id}`} key={item.id}>
                  <ProductCard
                    imageProduct={item.image}
                    key={item.id}
                    productName={item.productName}
                    desc={item.description}
                    price={Helper.formatPriceToRp(item.price)}
                  />
                </NavLink>
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
              {filteredDataProduct.map((item: any) => (
                <NavLink to={`/detail-produk/${item.id}`} key={item.id}>
                  <ProductCard
                    imageProduct={item.image}
                    key={item.id}
                    productName={item.productName}
                    desc={item.description}
                    price={Helper.formatPriceToRp(item.price)}
                  />
                </NavLink>
              ))}
            </Grid>
          )}
        </Box>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
                <Input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
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
              <Button onClick={() => setIsOpen(false)}>Batal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default AdminProdukPage;
