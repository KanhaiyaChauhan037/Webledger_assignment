import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Input,
} from "@chakra-ui/react";
import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // tokens from loacal storage
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // search function
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Invoke the provided onSearch callback with the search query
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link to={"/"}>
              <Heading
                as="h5"
                size="sm"
                fontSize={{ base: "16px", sm: "20px", md: "24px", lg: "28px" }}
              >
                Recipe Application
              </Heading>
            </Link>
          </Box>
          <Box
            mr={{ base: "2px", sm: "5px", md: "30px" }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Input
              placeholder="Search recipes..."
              border={"1px solid grey"}
              bgColor={"whiteAlpha.400"}
              mr={"5px"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button colorScheme="teal" variant="solid" onClick={handleSearch}>
              <Search2Icon />
            </Button>
          </Box>
          <Flex alignItems={"center"}>
            <Stack
              direction={"row"}
              spacing={{ base: "5px", sm: "5px", md: "30px", lg: "30px" }}
            >
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isLoggedIn ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    {/* ... other menu items ... */}
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>User's Name: {user}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link to={"/profile"}>
                      <MenuItem>Your Account</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link to={"/authentication"}>
                  <Button variant={"outline"} colorScheme="teal">
                    Sign up
                  </Button>
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
