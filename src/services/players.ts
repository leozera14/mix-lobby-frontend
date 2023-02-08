export async function fetchPlayers() {
  const request = await fetch("http://localhost:8080/players/all", {
    method: "GET",
  });

  return request.json();
}
