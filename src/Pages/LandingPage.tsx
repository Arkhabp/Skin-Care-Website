import { useState, useRef } from "react";
import { Box, Text, Stack, Image, Flex, HStack } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

import demoProduk from "../assets/images/demo-produk.png";
import ButtonComponent from "../Components/Buttons/ButtonComponent";
import Colors from "../constans/color";
import ProductCard from "../Components/cards/productCard";
import dataProduct from "../Data/dummyDataProduct";
import EducationCard from "../Components/cards/educationCard";
import dataVitamins from "../Data/dummyDataEducations";
import FooterComponent from "../Components/Footer";
import Icons from "../Components/icons";

const LandingPage = () => {
  const [scrollX, setScrollX] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right"): void => {
    const scrollWidth: number = scrollRef.current!.scrollWidth;
    const visibleWidth: number = scrollRef.current!.clientWidth;
    const newScrollX: number =
      direction === "left" ? scrollX - visibleWidth : scrollX + visibleWidth;

    if (newScrollX < 0) {
      setScrollX(0);
    } else if (newScrollX > scrollWidth - visibleWidth) {
      setScrollX(scrollWidth - visibleWidth);
    } else {
      setScrollX(newScrollX);
    }
  };
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
            {/* <Box
              aria-label="Scroll Left"
              position="absolute"
              top="50%"
              left="0"
              transform="translateY(-50%)"
              onClick={() => handleScroll("left")}
            >
              <Icons name="ArrowLeft" />
            </Box> */}
            <Box
              overflowX="auto"
              ref={scrollRef}
              sx={{ scrollBehavior: "smooth" }}
              pl="10px"
            >
              <HStack spacing={4} px={5}>
                {dataProduct.map((item) => (
                  <ProductCard
                    key={item.id}
                    productName={item.name}
                    desc={item.description}
                    price={`Rp. ${item.price}`}
                    onClick={() => alert("halo")}
                  />
                ))}
              </HStack>
            </Box>
            {/* <Box
              aria-label="Scroll Left"
              position="absolute"
              top="50%"
              left="0"
              transform="translateY(-50%)"
              onClick={() => handleScroll("left")}
            >
              <Icons name="ArrowRight" />
            </Box> */}
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
