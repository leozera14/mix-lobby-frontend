import { useState, useCallback } from "react";
import { Flex, Text, Spinner, Grid, Input } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchPlayers } from "../../services";
import { IFetchPlayerRequest, IPlayerProps } from "../../types";
import { DeleteIcon } from "@chakra-ui/icons";
import "./lobby.css";

export const Lobby = () => {
  //States and initial consts values
  const [playersSelected, setPlayersSelected] = useState<IPlayerProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const { data: allPlayers, isLoading }: IFetchPlayerRequest = useQuery(
    "players",
    fetchPlayers,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 300000, //5 minutes
    }
  ) as IFetchPlayerRequest;

  const filteredPlayers =
    searchInput.length > 0 && allPlayers.length > 0
      ? allPlayers.filter((players) =>
          players.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : allPlayers;

  //Functions to Add and Remove player
  const addSelectedPlayer = (addPlayer: IPlayerProps) => {
    if (playersSelected.some((pSelected) => pSelected.id === addPlayer.id))
      return;
    handleAddSelectedPlayer(addPlayer as IPlayerProps);
  };

  const handleAddSelectedPlayer = useCallback(
    (addPlayer: IPlayerProps) => {
      setPlayersSelected((prevState) => [...prevState, addPlayer]);
    },
    [addSelectedPlayer]
  );

  const removeSelectedPlayer = (removePlayer: IPlayerProps) => {
    handleRemoveSelectedPlayer(removePlayer);
  };

  const handleRemoveSelectedPlayer = useCallback(
    (removePlayer: IPlayerProps) => {
      setPlayersSelected((prevState) => {
        const findAndRemove: IPlayerProps[] = prevState.filter(
          (pState) => pState.id !== removePlayer.id
        );

        prevState = findAndRemove;

        return prevState;
      });
    },
    [removeSelectedPlayer]
  );

  //Usefull consts for validation or usefull values
  const gridRowsCalculated = Math.ceil(allPlayers?.length / 4);

  const limitOfPlayersSelected = playersSelected.length === 10;

  console.log("render");

  return (
    <Flex w="100%" flexDirection="column">
      {isLoading ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.625rem"
        >
          <Spinner />
          <Text>Buscando os newba</Text>
        </Flex>
      ) : (
        <Flex w="100%" flexDirection="column" gap="1.875rem">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="1.25rem"
          >
            {playersSelected.length === 0 ? (
              <Text>Selecione os newba</Text>
            ) : (
              <Text textAlign="center">
                Newbas selecionados: <br />
                {playersSelected.length}
              </Text>
            )}

            <Input
              w="50%"
              placeholder="Pesquise o newba"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Grid
              gridTemplateColumns="repeat(4, 250px)"
              gridTemplateRows={`repeat(${gridRowsCalculated}, 280px)`}
              w="80%"
              gap="1.875rem"
              justifyContent="center"
            >
              {filteredPlayers.map((player) => (
                <Flex
                  key={player.id}
                  boxShadow="
                  0 1px 1px hsl(0deg 0% 0% / 0.075),
                  0 2px 2px hsl(0deg 0% 0% / 0.075),
                  0 4px 4px hsl(0deg 0% 0% / 0.075),
                  0 8px 8px hsl(0deg 0% 0% / 0.075),
                  0 16px 16px hsl(0deg 0% 0% / 0.075)"
                  border={
                    playersSelected.find(
                      (pSelected) => pSelected.id === player.id
                    )
                      ? "2px solid green"
                      : "1px solid rgba(0,0,0, .05)"
                  }
                  cursor={
                    Boolean(
                      playersSelected.find(
                        (pSelected) => pSelected.id === player.id
                      ) || limitOfPlayersSelected
                    )
                      ? "not-allowed"
                      : "pointer"
                  }
                  borderRadius="15px"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  gap="1.875rem"
                  className="player-item"
                  position="relative"
                  onClick={(event) => {
                    event.stopPropagation();

                    !limitOfPlayersSelected && addSelectedPlayer(player);
                  }}
                >
                  {playersSelected.find(
                    (pSelected) => pSelected.id === player.id
                  ) ? (
                    <DeleteIcon
                      style={{
                        position: "absolute",
                        top: "0.625rem",
                        right: "0.625rem",
                        cursor: "pointer",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        removeSelectedPlayer(player);
                      }}
                    />
                  ) : null}

                  <Text>Player: {player.name}</Text>
                  <Text>Level: {player.level}</Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
