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
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure
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
import { useRef, useState } from "react";

const KeranjangBelanja = () => {
  const cartItems = useAppSelector((state) => state.addTochart.product.data);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    productName: string;
  } | null>(null);

  // Menghitung total belanja
  const totalBelanja = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  // Menghitung total barang
  const totalBarang = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Subtotal sebelum diskon (sama dengan total belanja)
  const subtotalBeforeDiscount = totalBelanja;

  const alertConfirmDelete = (item: { id: number; productName: string }) => {
    setSelectedItem(item);
    onOpenAlert();
  };

  const handleDelete = () => {
    if (selectedItem) {
      dispatch(deleteProduct(selectedItem.id));
      toast({
        title: `Berhasil menghapus dari keranjang: ${selectedItem.productName}`,
        status: "error",
        isClosable: true
      });
      setSelectedItem(null);
      onCloseAlert();
    }
  };

  const handleIncrease = (itemId: number) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId: number) => {
    dispatch(decreaseQuantity(itemId));
  };

  // WHATSAPP
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
                  <Th>Aksi</Th>
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
                            alertConfirmDelete({
                              id: item.id,
                              productName: item.productName
                            })
                          } // Pass item details to the confirmation dialog
                          cursor="pointer" // Add pointer cursor to indicate clickability
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

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Produk
            </AlertDialogHeader>

            <AlertDialogBody>
              Kamu yakin ingin menghapus produk ini?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Batal
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <FooterComponent />
    </>
  );
};

export default KeranjangBelanja;
