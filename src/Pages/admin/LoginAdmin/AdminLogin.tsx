import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username: email,
          password: password
        }
      );
      if (response.status === 200) {
        const data = response.data;
        // Assuming the API response contains a token
        localStorage.setItem("token", data.token);
        toast({
          title: "Login successful.",
          status: "success",
          isClosable: true
        });
        // navigate("/admin/products");
        navigate("/admin/products", { replace: true });
      }
    } catch (error: any) {
      toast({
        title: "Login failed.",
        description: error.response?.data?.msg || "Invalid email or password.",
        status: "error",
        isClosable: true
      });
    }
  };

  return (
    <Box width="100%" maxWidth="400px" mx="auto" mt="10%">
      <Heading as="h1" mb="6" textAlign="center">
        Admin Login
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl id="email" mb="4">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="password" mb="6">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
