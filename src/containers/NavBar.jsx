import { Button, Text, Box, Flex, Image } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow="md"
        px="1rem"
        py={{ base: "0.5rem", md: "1rem" }}
        background="#00DDFF"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        zIndex="1"
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
          <Text
            background="ButtonFace"
            px="0.5rem"
            py={{ base: "0.2rem", md: "0.5rem" }}
            border="1px solid teal"
            borderRadius="5px"
          >
            User
          </Text>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
