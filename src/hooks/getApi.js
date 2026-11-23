async function buscarUsuario(id) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const dados = await response.json();
    console.log(dados);
    return dados;
  } catch (error) {
    console.log("Falaha ao consumir a API:", error);
  }
}
