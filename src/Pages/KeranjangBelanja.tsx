import Navbar from "../Components/Navbar";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  useToast
} from "@chakra-ui/react";
import Colors from "../constans/color";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Helper from "../helpers";
import FooterComponent from "../Components/Footer";
import Icons from "../Components/icons";
import {
  clearCart,
  decreaseQuantity,
  deleteProduct,
  increaseQuantity
} from "../store/redux/action/addToChart.function";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const KeranjangBelanja = () => {
  const cartItems = useAppSelector((state) => state.addTochart.product.data);
  const dispatch = useAppDispatch();
  const toast = useToast();

  // Menghitung total belanja
  const totalBelanja = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  // Menghitung total barang
  const totalBarang = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Subtotal sebelum diskon (sama dengan total belanja)
  const subtotalBeforeDiscount = totalBelanja;

  const handleDelete = (itemId: number, productName: string) => {
    dispatch(deleteProduct(itemId));
    toast({
      title: `Berhasil menghapus dari keranjang: ${productName}`,
      status: "error",
      isClosable: true
    });
  };

  const handleIncrease = (itemId: number) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId: number) => {
    dispatch(decreaseQuantity(itemId));
  };

  //WHATSAPP
  const buildWhatsAppMessage = (items: any[], total: number) => {
    let message = "Halo, saya ingin memesan produk berikut:\n\n";
    items.forEach((item) => {
      message += `${item.productName} - ${
        item.quantity
      } x ${Helper.formatPriceToRp(item.price)} = ${Helper.formatPriceToRp(
        item.price * item.quantity
      )}\n`;
    });
    message += `\nTotal Belanja: ${Helper.formatPriceToRp(
      total
    )}\n\nTerima kasih.`;
    return message;
  };
  const handleCheckout = () => {
    const message = buildWhatsAppMessage(cartItems, totalBelanja);
    const phoneNumber = "+6287871051422"; // Ganti dengan nomor telepon tujuan
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    dispatch(clearCart());
  };

  useEffect(() => {
    axios.post(`http://localhost:5038/api/add-to-chart`).then((response) => {
      console.log(response.data);
    });
  });

  return (
    <>
      <Navbar />

      <Text
        fontSize={"3xl"}
        fontWeight={"bold"}
        width={"100%"}
        color={Colors.black}
        textAlign={"center"}
        my={4}
      >
        Keranjang Belanja
      </Text>

      <Flex
        margin="auto"
        minHeight="calc(100vh - 100px)"
        flexDirection="column"
        px={4}
      >
        {Array.isArray(cartItems) && cartItems.length === 0 ? (
          <>
            <Text fontSize={"xl"} textAlign={"center"} color={Colors.grey}>
              Keranjang kamu kosong
            </Text>
            <Box alignSelf={"center"}>
              <NavLink to={`/produk`}>
                <Button
                  mt={4} // Add margin top
                  w={"fit-content"} // Adjust button width
                  mx="auto" // Center align button
                  colorScheme="teal" // Button color scheme
                >
                  Ayo Belanja
                </Button>
              </NavLink>
            </Box>
          </>
        ) : (
          <Flex gap={5} display={"flex"}>
            <Table variant="simple" borderWidth={1} borderRadius={"lg"}>
              <Thead>
                <Tr>
                  <Th>Nama Produk</Th>
                  <Th>Jumlah</Th>
                  <Th>Harga</Th>
                  <Th>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(cartItems) &&
                  cartItems.map((item: any, index: number) => (
                    <Tr key={index}>
                      <Td>{item.productName}</Td>
                      <Td>
                        <Flex alignItems={"center"}>
                          <Button onClick={() => handleDecrease(item.id)}>
                            -
                          </Button>
                          <Text mx={2}>{item.quantity}</Text>
                          <Button onClick={() => handleIncrease(item.id)}>
                            +
                          </Button>
                        </Flex>
                      </Td>
                      <Td>{Helper.formatPriceToRp(item.price)}</Td>
                      <Td>
                        {Helper.formatPriceToRp(item.price * item.quantity)}
                      </Td>
                      <Td>
                        <Box
                          as="button"
                          onClick={() =>
                            handleDelete(item.id, item.productName)
                          } // Tambahkan onClick pada ikon
                          cursor="pointer" // Tambahkan pointer cursor untuk menunjukkan bahwa ini dapat diklik
                        >
                          <Icons name="Delete" size="sm" color={Colors.red} />
                        </Box>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Box background={Colors.white1} w={"40%"} h={"50%"} py={2} px={3}>
              <Text fontSize={"xl"}>Ringkasan Belanja</Text>
              <Box
                borderWidth={1}
                w={"100%"}
                borderColor={Colors.lightgrey}
                mt={2}
              />

              <Box mt={3}>
                <Flex gap={4} flexDirection="column">
                  <Flex justifyContent="space-between">
                    <Text>Subtotal</Text>
                    <Text>
                      {Helper.formatPriceToRp(subtotalBeforeDiscount)}
                    </Text>
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text>Discount</Text>
                    <Text>Rp. 0</Text>
                  </Flex>
                </Flex>

                <Box
                  borderWidth={1}
                  w={"100%"}
                  borderColor={Colors.lightgrey}
                  my={4}
                />
                <Flex gap={4} flexDirection="column">
                  <Flex justifyContent="space-between">
                    <Text>Total Barang</Text>
                    <Text>{totalBarang}</Text>
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      Total Belanja
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {Helper.formatPriceToRp(totalBelanja)}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Box
                borderWidth={1}
                w={"100%"}
                borderColor={Colors.lightgrey}
                my={4}
              />
              <Button
                w={"100%"}
                backgroundColor={Colors.darkGreen}
                color="white"
                _hover={{
                  backgroundColor: Colors.lightgrey
                }}
                onClick={handleCheckout}
              >
                Lanjut Bayar
              </Button>
            </Box>
          </Flex>
        )}
      </Flex>

      <FooterComponent />
    </>
  );
};

export default KeranjangBelanja;
