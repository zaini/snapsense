import { useContext } from "react";
import MenuItem from "./MenuItem";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../context/auth";

const NavbarMenuItems = () => {
  const { user } = useContext(AuthContext);

  // Right now the navbar for admin, doctor and patient are all identical, but it's possible they could be different in the future
  if (user) {
    switch (user.accountType) {
      case "ADMIN":
        return (
          <>
            <MenuItem to="/dashboard">Dashboard</MenuItem>
            <MenuItem to="/contact">Contact Us</MenuItem>
            <MenuItem to="/logout" isLast>
              <Button
                size="sm"
                rounded="md"
                color={["primary.500", "primary.500", "white", "white"]}
                bg={["white", "white", "primary.500", "primary.500"]}
                _hover={{
                  bg: [
                    "primary.100",
                    "primary.100",
                    "primary.600",
                    "primary.600",
                  ],
                }}
              >
                Logout
              </Button>
            </MenuItem>
          </>
        );
      case "DOCTOR":
        return (
          <>
            <MenuItem to="/dashboard">Dashboard</MenuItem>
            <MenuItem to="/contact">Contact Us</MenuItem>
            <MenuItem to="/logout" isLast>
              <Button
                size="sm"
                rounded="md"
                color={["primary.500", "primary.500", "white", "white"]}
                bg={["white", "white", "primary.500", "primary.500"]}
                _hover={{
                  bg: [
                    "primary.100",
                    "primary.100",
                    "primary.600",
                    "primary.600",
                  ],
                }}
              >
                Logout
              </Button>
            </MenuItem>
          </>
        );
      case "PATIENT":
        return (
          <>
            <MenuItem to="/dashboard">Dashboard</MenuItem>
            <MenuItem to="/contact">Contact Us</MenuItem>
            <MenuItem to="/logout" isLast>
              <Button
                size="sm"
                rounded="md"
                color={["primary.500", "primary.500", "white", "white"]}
                bg={["white", "white", "primary.500", "primary.500"]}
                _hover={{
                  bg: [
                    "primary.100",
                    "primary.100",
                    "primary.600",
                    "primary.600",
                  ],
                }}
              >
                Logout
              </Button>
            </MenuItem>
          </>
        );
      default:
        break;
    }
  }
  // If user not logged in
  return (
    <>
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/about">About Us</MenuItem>
      <MenuItem to="/contact">Contact Us</MenuItem>
      <MenuItem to="/login" isLast>
        <Button
          size="sm"
          rounded="md"
          color={["primary.500", "primary.500", "white", "white"]}
          bg={["white", "white", "primary.500", "primary.500"]}
          _hover={{
            bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
          }}
        >
          Login
        </Button>
      </MenuItem>
    </>
  );
};

export default NavbarMenuItems;
