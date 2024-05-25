import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  Stack
} from "@chakra-ui/react";
import Colors from "../../constans/color";
import Icons from "../icons";

const FooterComponent = () => {
  return (
    <Box background={Colors.white} px={5}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} py={2}>
        <Stack spacing={4} direction="column" justifyContent="space-between">
          <Heading
            fontWeight={"bold"}
            size={"md"}
            color={useColorModeValue("fontColor.black", "primary.whiteDoff")}
          >
            MS Glow "Reseller"
          </Heading>
          <Text fontSize={"md"} fontWeight={"semibold"} color={Colors.darkGrey}>
            skincare@gmail.com
          </Text>
          <Flex gap={3}>
            <Box
              w={"30px"}
              h={"30px"}
              borderRadius={"15px"}
              background={Colors.silverGrey}
            >
              <Icons name="search" />
            </Box>
            <Box
              w={"30px"}
              h={"30px"}
              borderRadius={"15px"}
              background={Colors.silverGrey}
            >
              <Icons name="search" />
            </Box>
            <Box
              w={"30px"}
              h={"30px"}
              borderRadius={"15px"}
              background={Colors.silverGrey}
            >
              <Icons name="search" />
            </Box>
          </Flex>
        </Stack>

        <Stack spacing={1} direction="column">
          <Text fontSize={"md"} fontWeight={"semibold"} color={Colors.black}>
            Ikuti Tur
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Produk
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Edukasi
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Tentang Kami
          </Text>
        </Stack>

        <Stack spacing={1} direction="column">
          <Text fontSize={"md"} fontWeight={"semibold"} color={Colors.black}>
            Perusahaan Kita
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Kontak Kami
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Syarat dan Kententuan
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Kebijakan
          </Text>
        </Stack>

        <Stack spacing={1} direction="column">
          <Text fontSize={"md"} fontWeight={"semibold"} color={Colors.black}>
            Langganan
          </Text>
          <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
            Langganan untuk mendapatkan kabar baru dari kita
          </Text>

          <Flex
            alignItems={"center"}
            justify={"center"}
            gap={5}
            borderWidth={1}
            borderColor={Colors.silverGrey}
            w={"150px"}
            borderRadius={"75px"}
            p={1}
          >
            <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
              Email Kamu
            </Text>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              background={Colors.silverGrey}
              borderRadius={20}
              height={"25px"}
              width={"25px"}
            >
              <Icons name="ArrowRight" size={"lg"} color={Colors.white} />
            </Box>
          </Flex>
        </Stack>
      </Grid>
    </Box>
  );
};

export default FooterComponent;
