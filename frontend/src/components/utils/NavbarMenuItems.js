import { useContext } from "react";
import MenuItem from "./MenuItem";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";

export const NavbarMenuItems = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    switch (user.accountType) {
      case "ADMIN":
        return (
          <>
            <MenuItem data-testid="myDash" to="/my/profile">My Dashboard</MenuItem>
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
