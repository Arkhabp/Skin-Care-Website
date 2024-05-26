import { useState } from "react";
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
  FormLabel
} from "@chakra-ui/react";
import Colors from "../../../constans/color";
import { useParams } from "react-router-dom";
import dataProduct from "../../../Data/dummyDataProduct";
import Helper from "../../../helpers";
import FooterComponent from "../../../Components/Footer";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";
import Icons from "../../../Components/icons";

const AdminDetailProduct = () => {
  const { id } = useParams();
  const product = dataProduct.find((item) => item.id.toString() === id);

  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState(product?.productName || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState(product?.image || "");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSave = () => {
    // Simpan perubahan produk di sini
    // Misalnya, update produk di state atau kirim ke API
    handleClose();
  };

  if (!product) {
    return (
      <Box>
        <Text>Produk tidak ditemukan</Text>
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
              src={product.image}
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
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
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
