import { useEffect, useRef } from "react";
import { Box, Text, Stack, Image, Flex, HStack } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

import demoProduk from "../assets/images/demo-produk.png";
import ButtonComponent from "../Components/Buttons/ButtonComponent";
import Colors from "../constans/color";
import ProductCard from "../Components/cards/productCard";
import EducationCard from "../Components/cards/educationCard";
import dataVitamins from "../Data/dummyDataEducations";
import FooterComponent from "../Components/Footer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Helper from "../helpers";
import { fetchProducts } from "../store/redux/action/admin/getProducts.fuinction";

const LandingPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const products = useAppSelector((state) => state.fetchProduct.products);

  return (
    <Box backgroundColor={Colors.lightgrey}>
      <Navbar />
      <Box>
        <Flex justifyContent={"space-between"}>
          <Stack px={5} width={"60%"}>
            <Text fontSize={"7xl"} fontWeight={"semibold"}>
              Pilih yang Terbaik Untuk Kamu
            </Text>
            <Text fontSize={"md"} fontWeight={"regular"} width={"70%"}>
              Kami memberikan keindahan dan informasi dengan kualitas dan harga
              terbaik.
            </Text>

            <ButtonComponent
              title="BELI SEKARANG"
              width={"sm"}
              as={Link}
              to="/produk"
            />
          </Stack>
          <Box boxSize="35%">
            <Image src={demoProduk} alt="Demo Produk" />
          </Box>
        </Flex>
      </Box>

      <Box pt={6} backgroundColor={Colors.white}>
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"regular"}>
          Penjualan Terbaik
        </Text>

        <Box overflowX="hidden" py={5} position="relative">
          <Box overflowX="auto" py={5} _hover={{ cursor: "pointer" }}>
            <Box
              overflowX="auto"
              ref={scrollRef}
              sx={{ scrollBehavior: "smooth" }}
              pl="10px"
            >
              <HStack spacing={4} px={5}>
                {products.map((item: any) => (
                  <ProductCard
                    imageProduct={item.image} // URL ke gambar di folder uploads
                    key={item._id || item.id}
                    productName={item.productName}
                    desc={item.description}
                    price={Helper.formatPriceToRp(item.price)}
                    to={`/detail-produk/${item._id}`}
                    itemId={item.id}
                  />
                ))}
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box px={5} pt={6}>
        <Box mb={2}>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            width={"100%"}
            color={Colors.darkGreen}
          >
            Edukasi
          </Text>
          <Text
            fontSize={"md"}
            fontWeight={"regular"}
            width={"100%"}
            color={Colors.darkGreen}
          >
            Kegunaan Vitamin
          </Text>
        </Box>

        <Flex wrap="wrap" gap={2} justifyContent={"space-between"}>
          {dataVitamins.slice(0, 6).map((vitamin) => (
            <EducationCard
              key={vitamin.id}
              productName={vitamin.title}
              desc={vitamin.desc}
            />
          ))}
        </Flex>

        <Text
          // as={"u"}
          py={"4"}
          fontSize={"md"}
          fontWeight={"regular"}
          textAlign={"center"}
        >
          Lihat lainnya
        </Text>
      </Box>

      <FooterComponent />
    </Box>
  );
};

export default LandingPage;
