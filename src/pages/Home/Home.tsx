import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex w="100%" minH="100%" alignItems="center" justifyContent="center">
      <Button
        color="black"
        fontWeight="600"
        boxShadow="2px 2px 15px rgba(0,0,0, .5);"
        onClick={() => navigate("/lobby")}
      >
        COMECE EL ABALO
      </Button>
    </Flex>
  );
};
