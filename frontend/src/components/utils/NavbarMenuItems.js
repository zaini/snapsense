import { useContext } from "react";
import MenuItem from "./MenuItem";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";

const NavbarMenuItems = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    switch (user.accountType) {
      case "SUPERADMIN":
        return (
          <>
            <MenuItem to="/my/hospitals">My Dashboard</MenuItem>
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
      case "ADMIN":
        return (
          <>
            <MenuItem to="/my/profile">My Dashboard</MenuItem>
            <MenuItem to="/about">About Us</MenuItem>
            <MenuItem to="/feedback">Share Feedback</MenuItem>
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
            <MenuItem to="/my">My Dashboard</MenuItem>
            <MenuItem to="/about">About Us</MenuItem>
            <MenuItem to="/feedback">Share Feedback</MenuItem>
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
            <MenuItem to="/my">My Dashboard</MenuItem>
            <MenuItem to="/about">About Us</MenuItem>
            <MenuItem to="/feedback">Share Feedback</MenuItem>
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
      <MenuItem to="/feedback">Share Feedback</MenuItem>
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
