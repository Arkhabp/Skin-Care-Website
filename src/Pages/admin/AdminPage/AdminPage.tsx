import { Box, Text, Button, Avatar, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../Components/Navbar/NavbarAdmin";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");
    // Mengarahkan pengguna ke halaman login
    navigate("/admin/login");
  };

  // Data profil contoh
  const userProfile = {
    ownerName: "Admin Name",
    storeName: "Toko Kecantikan",
    location: "Jakarta, Indonesia"
  };

  return (
    <Box>
      <NavbarAdmin />
      <Flex justify="center" align="center" height="100vh" bg="gray.100">
        <Box
          p={5}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          w={["90%", "80%", "60%", "40%"]}
        >
          <Flex alignItems="center" mb={5}>
            <Avatar size="xl" name={userProfile.ownerName} mr={4} />
            <Box>
              <Heading as="h3" size="lg" mb={1}>
                {userProfile.ownerName}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Pemilik Toko
              </Text>
            </Box>
          </Flex>

          <Box mb={5}>
            <Text fontSize="lg" fontWeight="bold">
              Nama Toko:
            </Text>
            <Text fontSize="md" mb={3}>
              {userProfile.storeName}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Lokasi Toko:
            </Text>
            <Text fontSize="md" mb={3}>
              {userProfile.location}
            </Text>
          </Box>

          <Button colorScheme="blue" onClick={handleLogout} width="100%">
            Logout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminPage;
