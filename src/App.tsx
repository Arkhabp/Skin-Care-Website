import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.js";
import ProdukPage from "./Pages/ProdukPage.js";
import NotFoundPage from "./Pages/NotFoundPage.js";
import EdukasiPage from "./Pages/EdukasiPage.tsx";
import KeranjangBelanja from "./Pages/KeranjangBelanja.tsx";
import DetailProduct from "./Pages/DetailProduct.tsx";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/produk" element={<ProdukPage />} />
          <Route path="/detail-produk/:id" element={<DetailProduct />} />
          <Route path="/edukasi" element={<EdukasiPage />} />
          <Route path="/keranjang-belanja" element={<KeranjangBelanja />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
