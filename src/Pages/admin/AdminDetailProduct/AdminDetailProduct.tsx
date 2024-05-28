import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Stack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast
} from "@chakra-ui/react";
import Colors from "../../../constans/color";
import { useParams } from "react-router-dom";
import Helper from "../../../helpers";
import FooterComponent from "../../../Components/Footer";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";
import Icons from "../../../Components/icons";
import dataProduct from "../../../Data/dummyDataProduct";
import axios from "axios";

const AdminDetailProduct = () => {
  const { id } = useParams();
  const toast = useToast();
  const [product, setProduct] = useState<product | null | any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const productData = response.data;

        setProduct(productData);
        setProductName(productData.productName);
        setDescription(productData.description);
        setPrice(productData.price);
        setImage(productData.image);
      } catch (error: any) {
        // If fetching product fails, use dummy data
        setProduct(dataProduct.find((item) => item.id.toString() === id));
        toast({
          title: "Gagal memuat produk.",
          description: error.message,
          status: "error",
          isClosable: true
        });
      }
    };

    fetchProduct();
  }, [id, toast]);

  //EDIT PRODUCT
  const editProduct = async () => {
    try {
      const updatedProduct = {
        productName,
        description,
        price,
        image
      };
      console.log(updatedProduct, id);

      await axios.put(
        `http://localhost:5000/api/admin/product/${id}`,
        updatedProduct
      );

      toast({
        title: "Produk berhasil diperbarui.",
        status: "success",
        isClosable: true
      });

      handleClose();
    } catch (error: any) {
      // Jika gagal memperbarui produk, tampilkan pesan kesalahan
      toast({
        title: "Gagal memperbarui produk.",
        description: error.message,
        status: "error",
        isClosable: true
      });
    }
  };

  if (!product) {
    return (
      <Box>
        <Text>Memuat produk...</Text>
      </Box>
    );
  }

  return (
    <Box backgroundColor={Colors.lightgrey}>
      <NavbarAdmin />
      <Box padding="20px" mb={"60px"}>
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          <Box flex="1" display="flex" justifyContent="center">
            <Image
              src={`../../../../API/uploads/${product.image}`}
              alt={product.productName}
              borderRadius="md"
              boxSize={{ base: "300px", md: "400px" }}
              objectFit="cover"
            />
          </Box>
          <Box flex="1" padding="20px">
            <Stack spacing="10px">
              <Text fontSize="2xl" fontWeight="bold" color={Colors.darkGreen}>
                {product.productName}
              </Text>
              <Text fontSize="lg" color={Colors.black}>
                {Helper.formatPriceToRp(product.price)}
              </Text>
              <Text fontSize="md" color={Colors.grey}>
                {product.description}
              </Text>
              <Button
                onClick={handleOpen}
                backgroundColor={Colors.grey}
                color="white"
                _hover={{ backgroundColor: Colors.lightgrey }}
                gap={2}
              >
                <Icons name="Edit" size="sm" color={Colors.white} />
                Edit Produk
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      <FooterComponent />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Produk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Nama Produk</FormLabel>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Harga</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Gambar</FormLabel>
              <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editProduct}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDetailProduct;
