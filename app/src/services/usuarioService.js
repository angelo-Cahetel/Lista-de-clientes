const BASE_URL = "https://jsonplaceholder.typicode.com/";

export async function buscarUsuarios() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}

export async function buscarUsuarioPorId(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}
