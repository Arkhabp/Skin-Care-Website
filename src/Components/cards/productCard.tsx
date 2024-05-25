import { Box, Image, Stack, Text } from "@chakra-ui/react";
import Colors from "../../constans/color";

interface ProductCardProps {
  imageProduct?: string;
  altProduct?: string;
  productName?: string;
  desc?: string;
  price?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageProduct,
  altProduct,
  productName,
  desc,
  price,
  onClick
}) => {
  return (
    <Box
      onClick={onClick}
      _hover={{ cursor: "pointer" }}
      w={"200px"}
      mb={"25px"}
    >
      <Box
        role="group"
        w="210px"
        h="260px"
        borderWidth="1px"
        borderRadius="sm"
        overflow="hidden"
        background={Colors.bgProduct}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Use imageProduct directly in the src attribute */}
        <Image src={imageProduct} alt={altProduct} />
      </Box>

      <Stack>
        <Text
          fontSize={"md"}
          fontWeight={"bold"}
          width={"100%"}
          noOfLines={1}
          mt={"5px"}
        >
          {productName}
        </Text>
        <Text
          fontSize={"sm"}
          fontWeight={"regular"}
          width={"100%"}
          noOfLines={2}
        >
          {desc}
        </Text>
        <Text
          fontSize={"md"}
          fontWeight={"semibold"}
          width={"100%"}
          mt={"10px"}
        >
          {price}
        </Text>
      </Stack>
    </Box>
  );
};

export default ProductCard;
