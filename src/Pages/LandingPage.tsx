import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Landing Page</h1>
      <Button onClick={() => navigate("/produk")}>Produk Page</Button>
    </>
  );
};

export default LandingPage;
