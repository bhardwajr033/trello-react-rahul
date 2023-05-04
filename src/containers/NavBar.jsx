import {
  Button,
  Text,
  Box,
  Flex,
  Image,
  Portal,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import { auth } from "../config/firebase";
import { Toast } from "../components/Toast";

export const NavBar = () => {
  const boardId = useParams().id;

  const toast = useToast();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("trello-react-rahul-user"));

  const handelLogOut = (event) => {
    event.preventDefault();
    auth.signOut();
    localStorage.removeItem("trello-react-rahul-user");
    toast(Toast("Success", "success", "Succesfully loged out"));
    navigate("/login");
  };

  return (
    <>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow="lg"
        px="1rem"
        py={{ base: "0.5rem", md: "1rem" }}
        backgroundColor={boardId ? "rgba(0,0,0, 0.1)" : "#00DDFF"}
        position="fixed"
        top="0"
        left="0"
        width="100%"
        zIndex="2"
      >
        <Flex justify="space-between">
          <Link to="/">
            <Button
              background="ButtonFace"
              colorScheme="teal"
              size={{ base: "sm", md: "md" }}
              variant="outline"
              p="1rem"
            >
              Home
            </Button>
          </Link>
          <Image
            height={{ base: "25px", md: "30px" }}
            src="https://a.trellocdn.com/prgb/assets/87e1af770a49ce8e84e3.gif"
          />
          <Popover>
            <PopoverTrigger>
              <Button
                background="ButtonFace"
                colorScheme="teal"
                size={{ base: "sm", md: "md" }}
                variant="outline"
                p="1rem"
              >
                {user ? user.name : "user"}
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                  <Heading color="teal">{user ? user.name : "user"}</Heading>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Text color="voilet">email : {user ? user.email : ""}</Text>
                </PopoverBody>
                <PopoverFooter>
                  <Button colorScheme="blue" onClick={handelLogOut}>
                    Log Out
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
