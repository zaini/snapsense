import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import NavbarMenuItems from "./NavbarMenuItems";

const Header = () => {
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      data-testid="MainNavbarID"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      color="primary.900"
    >
      <Flex align="center">
        <Logo
          w="100px"
          color={["white", "white", "primary.500", "primary.500"]}
          data-testid="navLogo"
        />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <NavbarMenuItems testName="navbarItems" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
