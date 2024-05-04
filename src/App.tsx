import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ProdukPage from "./Pages/ProdukPage";
import NotFoundPage from "./Pages/NotFoundPage";
import TentangKami from "./Pages/TentangKamiPage";
import EdukasiPage from "./Pages/EdukasiPage";

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
