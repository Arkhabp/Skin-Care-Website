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
  Button
} from "@chakra-ui/react";
import Colors from "../constans/color";
import { useAppSelector } from "../store/hooks";
import Helper from "../helpers";

const KeranjangBelanja = () => {
  const cartItems = useAppSelector((state) => state.addTochart.product.data);

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

      <Box
        width="95%"
        margin="auto"
        borderWidth={1}
        borderRadius={"lg"}
        borderColor={Colors.grey}
      >
        {Array.isArray(cartItems) && cartItems.length === 0 ? (
          <Text fontSize={"xl"} textAlign={"center"} color={Colors.grey}>
            Keranjang kamu kosong
          </Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nama Produk</Th>
                <Th>Jumlah</Th>
                <Th>Harga</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(cartItems) &&
                cartItems.map((item: any, index: number) => (
                  <Tr key={index}>
                    <Td>{item.productName}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{Helper.formatPriceToRp(item.price)}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          // implementasikan fungsi penghapusan jika diperlukan
                        }}
                      >
                        Hapus
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default KeranjangBelanja;
