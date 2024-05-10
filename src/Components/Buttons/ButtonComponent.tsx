import { Box } from "@chakra-ui/react";
import Colors from "../../constans/color";
import Icons from "../icons";

interface ButtonProps {
  title: string;
  width: string | number;
}

const ButtonComponent: React.FC<ButtonProps> = ({ title, width }) => {
  return (
    <Box
      as="button"
      height="40px"
      width={width}
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="20px"
      fontSize="14px"
      fontWeight="semibold"
      bg={Colors.darkBlue}
      color="#ffff"
      _hover={{ bg: "#ebedf0" }}
      // _active={{
      //   bg: "#dddfe2",
      //   transform: "scale(0.98)",
      //   borderColor: "#bec3c9"
      // }}
    >
      {title} <Icons name="ArrowRight" color={Colors.white} size="lg" />
    </Box>
  );
};

export default ButtonComponent;
