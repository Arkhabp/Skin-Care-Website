import { Box, Flex, Stack, Text, Image, Wrap } from "@chakra-ui/react";
import Colors from "../../../constans/color";

import tipsImage from "../../../assets/images/tips-illustation.png";
import dataVitamins from "../../../Data/dummyDataEducations";
import EducationCard from "../../../Components/cards/educationCard";
import FooterComponent from "../../../Components/Footer";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";

const AdminEdukasiPage = () => {
  return (
    <Box backgroundColor={Colors.lightgrey}>
      <NavbarAdmin />

      <Box>
        <Flex justifyContent={"space-between"}>
          <Stack px={5} width={"60%"}>
            <Text fontSize={"7xl"} fontWeight={"semibold"}>
              Temukan Berbagai Informasi
            </Text>
            <Text fontSize={"md"} fontWeight={"regular"} width={"70%"}>
              Halaman ini akan memberikan kamu informasi mengenai perawatan
              kulit.
            </Text>
          </Stack>
          <Box boxSize="35%">
            <Image src={tipsImage} alt="Demo Produk" />
          </Box>
        </Flex>
      </Box>

      <Box px={5} pb={12}>
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
          mb={"12px"}
        >
          Kegunaan Vitamin
        </Text>

        <Wrap justify={"space-between"}>
          {dataVitamins.slice(0, 6).map((vitamin) => (
            <EducationCard
              key={vitamin.id}
              productName={vitamin.title}
              desc={vitamin.desc}
            />
          ))}
        </Wrap>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default AdminEdukasiPage;
