import {
  Flex,
  Heading,
  Box,
  Spacer,
  Hide,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Icons from "../icons";
import Colors from "../../constans/color";
import { useAppSelector } from "../../store/hooks";

const NavbarComponent = () => {
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
    >
      <Hide breakpoint="(max-width: 989px)">
        <Box flex={1} mx="5" py="5">
          <Flex justifyContent={"space-between"}>
            <NavLink to="/">
              <Heading
                fontWeight={"bold"}
                size={"md"}
                color={useColorModeValue(
                  "fontColor.black",
                  "primary.whiteDoff"
                )}
              >
                MS Glow "Reseller"
              </Heading>
            </NavLink>

            <Box display={"flex"} alignItems={"center"}>
              <NavLink to="/produk">
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
              <NavLink to="/edukasi">
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
              <NavLink to="/keranjang-belanja">
                <Box ml={8} position={"relative"}>
                  <Icons name="BagShopping" size="lg" />
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
          {/* <Flex alignItems="center">
            <a
              href="https://drive.google.com/file/d/1QsXoSthybAhpCJsLzR_jjnYHa-HoAplZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heading fontWeight={"bold"} size={"md"} mr="4">
                My Resume
              </Heading>
            </a>
            <ToggleColorMode />
          </Flex> */}
        </Box>
      </Hide>

      {/* <Show breakpoint="(max-width: 989px)">
        <Flex
          w="100%"
          px={5}
          display={"flex"}
          bgColor={"fontColor.white"}
          alignItems="center"
        >
          <Box>
            <ToggleColorMode />
          </Box>
          <Spacer />
          <Box py="3">
            <Menu>
              <MenuButton
                as={FontAwesomeIcon}
                icon={faBars}
                aria-label="Options"
                variant="outline"
              />
              <MenuList>
                <Link to="#about-me" smooth>
                  <MenuItem
                    key="about-me"
                    _focus={{ outline: "none" }}
                    command="⌘A"
                  >
                    About Me
                  </MenuItem>
                </Link>
                <Link to="#experience" smooth>
                  <MenuItem
                    key="experience"
                    _focus={{ outline: "none" }}
                    command="⌘E"
                  >
                    Experience{" "}
                  </MenuItem>
                </Link>
                <Link to="#education" smooth>
                  <MenuItem
                    key="education"
                    _focus={{ outline: "none" }}
                    command="⌘E"
                  >
                    Education
                  </MenuItem>
                </Link>
                <Link to="#portfolio" smooth>
                  <MenuItem
                    key="portfolio"
                    _focus={{ outline: "none" }}
                    command="⌘P"
                  >
                    Portofolio
                  </MenuItem>
                </Link>
                <a
                  href="https://drive.google.com/file/d/1QsXoSthybAhpCJsLzR_jjnYHa-HoAplZ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Flex alignItems="center" justifyContent="flex-end" px="4">
                    <MenuItem
                      key="download-resume"
                      _focus={{ outline: "none" }}
                    >
                      My Resume
                    </MenuItem>
                    <Icon as={FontAwesomeIcon} icon={faDownload} />
                  </Flex>
                </a>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Show> */}
    </Flex>
  );
};

export default NavbarComponent;
