import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./containers/NavBar";
import BoardContainer from "./containers/BoardContainer";
import BoardPage from "./containers/BoardPage";
import ErrorPage from "./containers/ErrorPage";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<BoardContainer />} />
            <Route path="board/:id" element={<BoardPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
