import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.js";
import ProdukPage from "./Pages/ProdukPage.js";
import NotFoundPage from "./Pages/NotFoundPage.js";
import TentangKami from "./Pages/TentangKamiPage.tsx";
import EdukasiPage from "./Pages/EdukasiPage.tsx";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/produk" element={<ProdukPage />} />
          <Route path="/edukasi" element={<EdukasiPage />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
