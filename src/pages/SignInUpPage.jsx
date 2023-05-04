import { useEffect, useReducer } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Toast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

const reducerActions = {
  nameUpdated: "nameUpdated",
  emailUpdated: "emailUpdated",
  passwordUpdated: "passwordUpdated",
  showPasswordUpdated: "showPasswordUpdated",
  updateInputDisbale: "updateInputDisbale",
};

const initialState = {
  name: "",
  nameError: false,
  email: "",
  emailError: false,
  password: "",
  passwordError: false,
  showPassword: false,
  isInputDisabled: false,
};

function PageReducer(state, action) {
  switch (action.type) {
    case reducerActions.nameUpdated:
      const nameError = action.payload.name === "" ? true : false;
      return { ...state, name: action.payload.name, nameError: nameError };
    case reducerActions.emailUpdated:
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailError =
        action.payload.email === ""
          ? true
          : !emailRegex.test(action.payload.email)
          ? true
          : false;
      return { ...state, email: action.payload.email, emailError: emailError };
    case reducerActions.passwordUpdated:
      const passwordError = action.payload.password.length < 8 ? true : false;
      return {
        ...state,
        password: action.payload.password,
        passwordError: passwordError,
      };
    case reducerActions.showPasswordUpdated:
      return { ...state, showPassword: !state.showPassword };
    case reducerActions.updateInputDisbale:
      return { ...state, isInputDisabled: action.payload.isDisable };
    default:
      console.log("Error");
      return state;
  }
}

function SignInUpPage(props) {
  const [PageState, dispatch] = useReducer(PageReducer, initialState);

  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("trello-react-rahul-user"));
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  async function handleSignUp() {
    if (
      PageState.nameError ||
      PageState.emailError ||
      PageState.passwordError
    ) {
      return;
    }
    dispatch({
      type: reducerActions.updateInputDisbale,
      payload: { isDisable: true },
    });
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        PageState.email,
        PageState.password
      );
      toast(
        Toast("Success", "success", `Welcome ${PageState.name} , Please Login`)
      );
      const updatedProfile = await updateProfile(auth.currentUser, {
        displayName: PageState.name,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      dispatch({
        type: reducerActions.updateInputDisbale,
        payload: { isDisable: false },
      });
      dispatch({
        type: reducerActions.passwordUpdated,
        payload: { password: "" },
      });
    } catch (err) {
      dispatch({
        type: reducerActions.updateInputDisbale,
        payload: { isDisable: false },
      });
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        toast(
          Toast(
            "Failed",
            "error",
            `You are already registered with ${PageState.email}`
          )
        );
      } else {
        console.log(err.message);
      }
    }
  }

  async function handleLogIn() {
    if (
      PageState.nameError ||
      PageState.emailError ||
      PageState.passwordError
    ) {
      return;
    }
    dispatch({
      type: reducerActions.updateInputDisbale,
      payload: { isDisable: true },
    });
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        PageState.email,
        PageState.password
      );
      toast(
        Toast(
          "Success",
          "success",
          `Log In Succesfull ,${PageState.name} , Please Wait`
        )
      );
      localStorage.setItem(
        "trello-react-rahul-user",
        JSON.stringify({
          name: response.user.displayName,
          email: response.user.email,
          currentUser: auth.currentUser,
        })
      );
      setTimeout(() => {
        navigate("/home");
      }, 1000);
      dispatch({
        type: reducerActions.updateInputDisbale,
        payload: { isDisable: false },
      });
    } catch (err) {
      dispatch({
        type: reducerActions.updateInputDisbale,
        payload: { isDisable: false },
      });
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        toast(Toast("Failed", "error", "No user found , Plase Register"));
      } else if (err.message === "Firebase: Error (auth/wrong-password).") {
        toast(Toast("Failed", "error", "Wrong Password. Try Again!"));
      } else {
        console.log(err.message);
      }
    }
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Heading color="teal.400">{props.signInUp}</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (props.signInUp === "Log In") {
                handleLogIn();
              } else {
                handleSignUp();
              }
            }}
          >
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl
                display={props.signInUp === "Log In" ? "none" : "block"}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    {...(props.signInUp === "Log In" ? {} : { required: true })}
                    value={PageState.name}
                    onChange={({ target }) =>
                      dispatch({
                        type: reducerActions.nameUpdated,
                        payload: { name: target.value },
                      })
                    }
                    type="text"
                    placeholder="Name"
                    border={
                      PageState.nameError ? "1px solid red" : "1px solid teal"
                    }
                    disabled={PageState.isInputDisabled}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    required
                    value={PageState.email}
                    onChange={({ target }) =>
                      dispatch({
                        type: reducerActions.emailUpdated,
                        payload: { email: target.value },
                      })
                    }
                    type="email"
                    placeholder="email address"
                    border={
                      PageState.emailError ? "1px solid red" : "1px solid teal"
                    }
                    disabled={PageState.isInputDisabled}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    required
                    value={PageState.password}
                    onChange={({ target }) =>
                      dispatch({
                        type: reducerActions.passwordUpdated,
                        payload: { password: target.value },
                      })
                    }
                    type={PageState.showPassword ? "text" : "password"}
                    placeholder="Password"
                    border={
                      PageState.passwordError
                        ? "1px solid red"
                        : "1px solid teal"
                    }
                    disabled={PageState.isInputDisabled}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() =>
                        dispatch({
                          type: reducerActions.showPasswordUpdated,
                        })
                      }
                    >
                      {PageState.showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isDisabled={PageState.isInputDisabled}
              >
                {props.signInUp}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        {props.signInUp === "Log In" ? "New to us?" : "Already Signed Up ?"}{" "}
        <Link
          color="teal.500"
          href={props.signInUp === "Log In" ? "/signUp" : "/logIn"}
        >
          {props.signInUp === "Log In" ? "Sign Up" : "Log In"}
        </Link>
      </Box>
    </Flex>
  );
}

export default SignInUpPage;
