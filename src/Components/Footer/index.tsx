import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  Stack,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import Colors from "../../constans/color";
import Icons from "../icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const FooterComponent = () => {
  const toast = useToast();
  const [name, setName] = useState(""); // State untuk menyimpan nama
  const [phoneNumber, setPhoneNumber] = useState(""); // State untuk menyimpan nomor telepon
  const [showPhoneNumber, setShowPhoneNumber] = useState(false); // State untuk menampilkan input nomor telepon

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleNext = () => {
    setShowPhoneNumber(true);
  };

  const handleSubscribe = () => {
    // Logika untuk mengirim nama dan nomor telepon
    const userName = name;
    const userPhoneNumber = phoneNumber;

    const userData = {};
    console.log("userData", userData);
    axios
      .post(`http://localhost:5000/api/user/subscribe`, {
        name: userName,
        phoneNumber: userPhoneNumber
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast({
            title: "Berhasil bergabung.",
            status: "success",
            isClosable: true
          });
        }
        setShowPhoneNumber(false);
        setName("");
        setPhoneNumber("");
      })
      .catch((err) => {
        console.error(err); // Menambahkan log error untuk debug
        toast({
          title: "Gagal bergabung.",
          status: "error",
          isClosable: true
        });
      });

    console.log("Subscribed name:", name);
    console.log("Subscribed phone number:", phoneNumber);
  };

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
          <NavLink to={`/produk`}>
            <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
              Produk
            </Text>
          </NavLink>
          <NavLink to={`/edukasi`}>
            <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
              Edukasi
            </Text>
          </NavLink>
          <NavLink to={`/keranjang-belanja`}>
            <Text fontSize={"sm"} fontWeight={"regular"} color={Colors.grey}>
              Keranjang
            </Text>
          </NavLink>
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

          <Flex direction="column" gap={2}>
            <Input
              placeholder="Nama Kamu"
              size="sm"
              borderColor={Colors.silverGrey}
              value={name}
              onChange={handleNameChange}
            />
            {showPhoneNumber && (
              <Input
                type="number"
                placeholder="Nomor Kamu"
                size="sm"
                borderColor={Colors.silverGrey}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            )}
            {!showPhoneNumber ? (
              <Button
                size="sm"
                backgroundColor={Colors.darkGreen}
                color={Colors.white}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Flex justify={"space-between"} gap={2}>
                <Button
                  size="sm"
                  backgroundColor={Colors.grey}
                  color={Colors.white}
                  onClick={() => setShowPhoneNumber(false)}
                >
                  Batal
                </Button>
                <Button
                  flex="1"
                  size="sm"
                  backgroundColor={Colors.darkGreen}
                  color={Colors.white}
                  onClick={handleSubscribe}
                  gap={2}
                >
                  Kirim
                  <Icons name="ArrowRight" size={"lg"} color={Colors.white} />
                </Button>
              </Flex>
            )}
          </Flex>
        </Stack>
      </Grid>
    </Box>
  );
};

export default FooterComponent;
