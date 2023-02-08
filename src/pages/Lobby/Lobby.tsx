import { useState, useCallback } from "react";
import {
  Flex,
  Text,
  Spinner,
  Grid,
  Input,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchPlayers } from "../../services";
import { IFetchPlayerRequest, IPlayerProps } from "../../types";
import { DeleteIcon } from "@chakra-ui/icons";
import "./lobby.css";
import { useNavigate } from "react-router-dom";

export const Lobby = () => {
  const navigate = useNavigate();

  //States and initial consts values
  const [playersSelected, setPlayersSelected] = useState<IPlayerProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const {
    data: allPlayers,
    isLoading,
    error,
    isSuccess,
  }: IFetchPlayerRequest = useQuery("players", fetchPlayers, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000, //5 minutes
  }) as IFetchPlayerRequest;

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

  //Usefull consts and function for validation or usefull values
  const verifyIfPlayerIsSelected = (playerId: number) => {
    return Boolean(
      playersSelected.find((pSelected) => pSelected.id === playerId)
    );
  };

  const gridRowsCalculated = Math.ceil(allPlayers?.length / 6);

  const limitOfPlayersSelected = Boolean(playersSelected.length === 10);

  console.log(limitOfPlayersSelected);

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
        <>
          {!isLoading && isSuccess && allPlayers.length > 0 ? ( //Validating getAllPlayers request to show the UI or not
            <Flex w="100%" flexDirection="column" alignItems="center">
              <Flex
                w="80%"
                flexDirection="column"
                alignItems="center"
                gap="2rem"
              >
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                  mt="0.625rem"
                >
                  <Tooltip
                    label={
                      !limitOfPlayersSelected
                        ? "Voce precisa selecionar 10 players seu arrombado"
                        : "Clica logo porra"
                    }
                  >
                    <Button
                      color="black"
                      fontWeight="600"
                      type="button"
                      isDisabled={!limitOfPlayersSelected}
                    >
                      MONTA ESSA MERDA
                    </Button>
                  </Tooltip>
                  <Button
                    type="button"
                    color="black"
                    fontWeight="600"
                    onClick={() => navigate("/player/add")}
                  >
                    ADICIONAR UM LIXO
                  </Button>
                </Flex>
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Input
                    w="50%"
                    placeholder="Pesquise o newba"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                </Flex>

                {filteredPlayers.length > 0 ? ( //Show players if have length, if not only show a message to user
                  <Grid
                    gridTemplateColumns="repeat(6, 225px)"
                    gridTemplateRows={`repeat(${gridRowsCalculated}, 250px)`}
                    w="100%"
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
                          verifyIfPlayerIsSelected(player.id)
                            ? "2px solid green"
                            : "1px solid rgba(0,0,0, .05)"
                        }
                        cursor={
                          Boolean(
                            verifyIfPlayerIsSelected(player.id) ||
                              limitOfPlayersSelected
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
                        {verifyIfPlayerIsSelected(player.id) ? (
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
                ) : (
                  <Flex justifyContent="center" alignItems="center">
                    <Text>
                      Não tem nenhum lixo com essa merda de nome, tenta outro!
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          ) : null}

          {!isLoading && (error || allPlayers.length === 0) ? ( //Show error if get error in getAllPlayers request
            <Text>
              Falha ao buscar os lixos dessa merda, tenta de novo depois,
              disgraça!
            </Text>
          ) : null}
        </>
      )}
    </Flex>
  );
};
