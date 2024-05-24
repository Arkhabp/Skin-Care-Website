import { Box, Image, Stack, Text, Button, useToast } from "@chakra-ui/react";
import Colors from "../constans/color";
import { useAppDispatch } from "../store/hooks";
import { addTochart } from "../store/redux/action/addToChart.function";
import { useParams } from "react-router-dom";
import dataProduct from "../Data/dummyDataProduct";
import Helper from "../helpers";
import Navbar from "../Components/Navbar";
import FooterComponent from "../Components/Footer";

const DetailProduct = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { id } = useParams();
  const product = dataProduct.find((item) => item.id.toString() === id);

  if (!product) {
    return (
      <Box>
        <Text>Produk tidak ditemukan</Text>
      </Box>
    );
  }

  const handleAddToCart = () => {
    const productData: any = {
      category: product.category,
      price: product.price,
      productName: product.productName,
      quantity: product.quantity
    };
    dispatch(addTochart(productData));
    toast({
      title: `Berhasil menambahkan ke keranjang: ${product.productName}`,
      status: "success",
      isClosable: true
    });
  };

  return (
    <Box backgroundColor={Colors.lightgrey}>
      <Navbar />
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
                onClick={handleAddToCart}
                backgroundColor={Colors.darkGreen}
                color="white"
                _hover={{ backgroundColor: Colors.lightgrey }}
              >
                Tambah ke Keranjang
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default DetailProduct;
