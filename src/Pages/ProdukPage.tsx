import { Box, Input, Text, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react"; // Import useState hook
import Navbar from "../Components/Navbar";
import Colors from "../constans/color";
import dataProduct from "../Data/dummyDataProduct";
import ProductCard from "../Components/cards/productCard";
import Helper from "../helpers";
import FooterComponent from "../Components/Footer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/redux/action/admin/getProducts.fuinction";

const ProdukPage = () => {
  // State untuk menyimpan kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const products = useAppSelector((state) => state.fetchProduct.products);

  // Function untuk menghandle perubahan input pencarian
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Function untuk memfilter produk berdasarkan kata kunci pencarian
  const filterProducts = (products: typeof dataProduct, term: string) => {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredDataProduct = filterProducts(dataProduct, searchTerm);

  return (
    <Box backgroundColor={Colors.lightgrey}>
      <Navbar />
      <Box px={5}>
        <Box w={"20%"}>
          <Input
            placeholder="Cari Produk"
            size="md"
            borderColor={Colors.black}
            value={searchTerm} // Mengikat nilai input dengan state
            onChange={handleSearch} // Menambahkan event handler untuk perubahan input
          />
        </Box>

        <Box mt={"20px"}>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            width={"100%"}
            color={Colors.darkGreen}
            mb={"12px"}
          >
            Serum
          </Text>

          {products.length === 0 ? (
            <Text color={Colors.red} fontSize={"md"}>
              Produk tidak ada
            </Text>
          ) : (
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {products.map((item: any) => (
                <ProductCard
                  imageProduct={item.image} // URL ke gambar di folder uploads
                  key={item._id || item.id}
                  productName={item.productName}
                  desc={item.description}
                  price={Helper.formatPriceToRp(item.price)}
                  to={`/detail-produk/${item._id}`}
                  itemId={item.id}
                />
              ))}
            </Grid>
          )}

          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            width={"100%"}
            color={Colors.darkGreen}
            mb={"12px"}
          >
            Toner
          </Text>

          {filteredDataProduct.length === 0 ? (
            <Box minHeight="100vh">
              <Text color={Colors.red} fontSize={"md"}>
                Produk tidak ada
              </Text>
            </Box>
          ) : (
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {products
                .filter(
                  (item: any) => item.category.toLowerCase() === "cleanser"
                )
                .map((item: any) => (
                  <ProductCard
                    imageProduct={item.image} // URL ke gambar di folder uploads
                    key={item._id || item.id}
                    productName={item.productName}
                    desc={item.description}
                    price={Helper.formatPriceToRp(item.price)}
                    to={`/detail-produk/${item._id}`}
                    itemId={item.id}
                  />
                ))}
            </Grid>
          )}
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default ProdukPage;
