import { Box, Checkbox, Image, Stack, Text } from "@chakra-ui/react";
import Colors from "../../constans/color";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  imageProduct?: string;
  altProduct?: string;
  productName?: string;
  desc?: string;
  price?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  to?: string;
  itemId?: string;
  isAdmin?: boolean; // Add isAdmin prop
  isSelected?: boolean;
  onSelect?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageProduct,
  altProduct,
  productName,
  desc,
  price,
  onClick,
  itemId,
  to = "/",
  isAdmin = false, // Default value is false,
  isSelected = false, // Default value is false
  onSelect
}) => {
  return (
    <Box
      _hover={{ cursor: "pointer" }}
      w={"200px"}
      mb={"25px"}
      position="relative"
    >
      <NavLink to={to} key={itemId}>
        <Box
          onClick={onClick}
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
          <Image
            src={`../../../API/uploads/${imageProduct}`}
            alt={altProduct}
          />
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
      </NavLink>

      {isAdmin && (
        <Checkbox
          isChecked={isSelected} // Bind isChecked to the selection state of the product
          onChange={onSelect} // Bind onChange to handleProductSelection
          isInvalid
          position="absolute"
          top="2"
          right="0"
        />
      )}
      {/* Render Checkbox based on isAdmin prop */}
    </Box>
  );
};

export default ProductCard;
