import { Box, Wrap, Input, Text, useToast } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Colors from "../constans/color";
import dataProduct from "../Data/dummyDataProduct";
import ProductCard from "../Components/cards/productCard";

import { useAppDispatch } from "../store/hooks";
import { addTochart } from "../store/redux/action/addToChart.function";
import Helper from "../helpers";
import { NavLink } from "react-router-dom";

const ProdukPage = () => {
  const dispatch = useAppDispatch();

  const toast = useToast();

  const onSubmit = (item: any) => {
    const productData: any = {
      category: item.category,
      price: item.price,
      productName: item.productName,
      quantity: item.quantity
    };
    dispatch(addTochart(productData));
    toast({
      title: `Berhasil menambahkan ke keranjang: ${item.productName}`,
      status: "success",
      isClosable: true
    });
  };

  return (
    <Box backgroundColor={Colors.lightgrey}>
      <Navbar />
      <Box px={5}>
        <Box w={"20%"}>
          <Input
            placeholder="Cari Produk"
            size="md"
            borderColor={Colors.black}
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

          <Wrap justify={"space-between"}>
            {dataProduct.map((item) => (
              <NavLink to={`/detail-produk/${item.id}`} key={item.id}>
                <ProductCard
                  imageProduct={item.image}
                  key={item.id}
                  productName={item.productName}
                  desc={item.description}
                  price={Helper.formatPriceToRp(item.price)}
                  // onClick={() => onSubmit(item)}
                />
              </NavLink>
            ))}
          </Wrap>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            width={"100%"}
            color={Colors.darkGreen}
            mb={"12px"}
          >
            Toner
          </Text>

          <Wrap justify={"space-between"}>
            {dataProduct.map((item) => (
              <ProductCard
                key={item.id}
                productName={item.productName}
                desc={item.description}
                price={Helper.formatPriceToRp(item.price)}
                onClick={() => onSubmit(item)}
              />
            ))}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
};

export default ProdukPage;
