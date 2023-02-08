import { Flex } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home, Lobby } from "../pages";
import { AddPlayer } from "../pages/Players";
import { PlayerProfile } from "../pages/Players/Player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RoutesComponent = () => {
  return (
    <Flex minH="100vh" w="100%">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route index path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/player" element={<PlayerProfile />} />
          <Route path="/player/add" element={<AddPlayer />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </Flex>
  );
};
