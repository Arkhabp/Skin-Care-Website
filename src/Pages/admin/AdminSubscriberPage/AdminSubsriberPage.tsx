import { Box, Table, Thead, Tr, Th, Tbody, Td, Text } from "@chakra-ui/react";
import Icons from "../../../Components/icons";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import {
  deleteCustomer,
  fetchCustomer
} from "../../../store/redux/action/admin/getCustomer.function";
import Colors from "../../../constans/color";

const AdminSubsriberPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);

  const customer = useAppSelector((state) => state.fetchCustomer.customer);

  const handleDelete = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <NavbarAdmin />
      <Box>
        <Text fontSize={"xl"} textAlign={"center"} color={Colors.grey} mb={10}>
          DATA CUSTOMER
        </Text>
        <Table variant="simple" borderWidth={1} borderRadius={"lg"}>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Customer</Th>
              <Th>Nomor Telepon</Th>
              <Th>Tanggal Bergabung</Th>
              <Th>Id</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(customer) &&
              customer.map((item: any, index: number) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.phoneNumber}</Td>
                  <Td>{formatDate(item.createdAt)}</Td>
                  <Td>{item._id}</Td>
                  <Td>
                    <Box
                      as="button"
                      onClick={() => handleDelete(item._id)}
                      cursor="pointer" // Add pointer cursor to indicate clickability
                    >
                      <Icons name="Delete" size="sm" color={Colors.red} />
                    </Box>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default AdminSubsriberPage;
