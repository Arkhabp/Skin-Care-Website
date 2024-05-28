import {
  Flex,
  Heading,
  Box,
  Spacer,
  Hide,
  useColorModeValue,
  Text,
  Show,
  Menu,
  MenuButton,
  MenuList
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Icons from "../icons";
import Colors from "../../constans/color";
import { useAppSelector } from "../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavbarAdmin = () => {
  const cartItems = useAppSelector((state) => state.addTochart.product.data);

  // Mengambil total quantity dari semua item di keranjang belanja
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Flex
      className="navbar"
      position="sticky"
      top="0"
      zIndex="100"
      bgColor={useColorModeValue("transparent", "fontColor.black")}
      backdropFilter="blur(10px)"
    >
      <Hide breakpoint="(max-width: 989px)">
        <Box flex={1} mx="5" py="5">
          <Flex justifyContent={"space-between"}>
            <Heading
              fontWeight={"bold"}
              size={"md"}
              color={useColorModeValue("fontColor.black", "primary.whiteDoff")}
            >
              HALAMAN ADMIN
            </Heading>

            <Box display={"flex"} alignItems={"center"}>
              <NavLink to="/admin/products">
                <Text
                  ml={8}
                  fontWeight={"semibold"}
                  size={"md"}
                  color={useColorModeValue(
                    "fontColor.black",
                    "primary.whiteDoff"
                  )}
                >
                  Produk
                </Text>
              </NavLink>
              <NavLink to="/admin/edukasi">
                <Text
                  ml={8}
                  fontWeight={"semibold"}
                  size={"md"}
                  color={useColorModeValue(
                    "fontColor.black",
                    "primary.whiteDoff"
                  )}
                >
                  Edukasi
                </Text>
              </NavLink>
              <NavLink to="/admin">
                <Box ml={8} position={"relative"}>
                  <Icons name="Profile" size="lg" />
                </Box>
                {totalQuantity ? (
                  <Box
                    background={Colors.darkGreen}
                    w={"18px"}
                    h={"18px"}
                    borderRadius={"10px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={"flex"}
                    position={"absolute"}
                    right={2}
                    top={5}
                  >
                    <Text
                      color={Colors.white}
                      fontSize={"12px"}
                      fontWeight={"medium"}
                    >
                      {totalQuantity}
                    </Text>
                  </Box>
                ) : null}
              </NavLink>
            </Box>
          </Flex>
          <Spacer />
        </Box>
      </Hide>

      <Show breakpoint="(max-width: 989px)">
        <Flex
          w="100%"
          px={5}
          display={"flex"}
          bgColor={"fontColor.white"}
          alignItems="center"
        >
          <Heading
            fontWeight={"bold"}
            size={"md"}
            color={useColorModeValue("fontColor.black", "primary.whiteDoff")}
          >
            HALAMAN ADMIN
          </Heading>

          <Spacer />
          <Box py="3">
            <Menu>
              <MenuButton
                as={FontAwesomeIcon}
                icon={faBars}
                aria-label="Options"
              />
              <MenuList>
                <NavLink to="/admin/produk">
                  <Text
                    ml={8}
                    fontWeight={"semibold"}
                    size={"md"}
                    color={useColorModeValue(
                      "fontColor.black",
                      "primary.whiteDoff"
                    )}
                  >
                    Produk
                  </Text>
                </NavLink>
                <NavLink to="/admin/edukasi">
                  <Text
                    ml={8}
                    fontWeight={"semibold"}
                    size={"md"}
                    color={useColorModeValue(
                      "fontColor.black",
                      "primary.whiteDoff"
                    )}
                  >
                    Edukasi
                  </Text>
                </NavLink>
                <NavLink to="/admin">
                  <Box ml={8} position={"relative"}>
                    <Icons name="Profile" size="lg" />
                  </Box>
                  {totalQuantity ? (
                    <Box
                      background={Colors.darkGreen}
                      w={"18px"}
                      h={"18px"}
                      borderRadius={"10px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      display={"flex"}
                      position={"absolute"}
                      right={2}
                      top={5}
                    >
                      <Text
                        color={Colors.white}
                        fontSize={"12px"}
                        fontWeight={"medium"}
                      >
                        {totalQuantity}
                      </Text>
                    </Box>
                  ) : null}
                </NavLink>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Show>
    </Flex>
  );
};

export default NavbarAdmin;
