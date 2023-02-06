import { Flex } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home, Lobby } from "../pages";

export const RoutesComponent = () => {
  return (
    <Flex minH="100vh" w="100%">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </Flex>
  );
};
