import { Flex, Input, Select, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IAddPlayerRequestProps } from "../../types/addPlayerRequest";

export const AddPlayer = () => {
  const navigate = useNavigate();

  //Function to clean the JSON.Stringfy body at the handleSubmit function to prevent the Circular JSON Error
  const removeAllCircularReferenceFromJson = () => {
    const seen = new WeakSet();
    return (_: any, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  // Function to handle the status code from POST request and show correctly toast
  const showCorrectlyToast = (statusCode: number, message: string) => {
    switch (statusCode) {
      case 201:
        return toast.success(message);
      case 400:
        return toast.error(message);
      case 500:
        return toast.error(message);
    }
  };

  //Function to handle form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { playerName, playerLevel }: any = event.currentTarget.elements;

    const valuesValidation = [
      String(playerName.value).length === 0,
      String(playerLevel.value).length === 0,
    ];

    if (valuesValidation.some((validation) => validation === true)) return;

    try {
      const request: IAddPlayerRequestProps = await fetch(
        "http://localhost:8080/players/add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              playerName: playerName.value,
              playerLevel: playerLevel.value,
            },
            removeAllCircularReferenceFromJson()
          ),
        }
      ).then((res) => res.json());

      showCorrectlyToast(request.status, request.message);

      if (request.status === 201) {
        setTimeout(() => {
          navigate("/lobby");
        }, 1500);

        return;
      }
    } catch (error) {
      console.log("add player error", error);
      showCorrectlyToast(500, "Erro ao tentar adicionar esse lixo!");
    }
  };

  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <form onSubmit={(event) => handleSubmit(event)}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="1.25rem"
        >
          <Text>Lixo Infos</Text>

          <Input placeholder="Nome do lixo" name="playerName" isRequired />
          <Select isRequired name="playerLevel">
            {[...Array(21).keys()].slice(1).map(
              (
                level // Options with value 1-20 for levels
              ) => (
                <option value={level} key={level}>
                  {level}
                </option>
              )
            )}
          </Select>

          <Button type="submit">Adiciona esse lixo</Button>
        </Flex>
      </form>
    </Flex>
  );
};
