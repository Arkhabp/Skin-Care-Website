import { Box, Text, Stack, Image, Flex, HStack } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";

import demoProduk from "../assets/images/demo-produk.png";
import ButtonComponent from "../Components/Buttons/ButtonComponent";
import Colors from "../constans/color";
import ProductCard from "../Components/cards/productCard";
import dataProduct from "../Data/dummyDataProduct";
import EducationCard from "../Components/cards/educationCard";
import dataVitamins from "../Data/dummyDataEducations";

const LandingPage = () => {
  return (
    <Box backgroundColor={Colors.lightgrey} mb={20}>
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

            <ButtonComponent title="BELI SEKARANG" width={"sm"} />
          </Stack>
          <Box boxSize="35%">
            <Image src={demoProduk} alt="Demo Produk" />
          </Box>
        </Flex>
      </Box>

      <Box pt={6} backgroundColor={Colors.white}>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"regular"}
          pb={6}
        >
          Penjualan Terbaik
        </Text>

        <Box overflowX="auto" py={5}>
          <HStack spacing={4} px={5}>
            {dataProduct.map((item) => (
              <ProductCard
                key={item.id}
                productName={item.name}
                desc={item.description}
                price={`Rp. ${item.price}`}
              />
            ))}
          </HStack>
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
    </Box>
  );
};

export default LandingPage;
