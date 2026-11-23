# Lista de Clientes

## Descrição

O app `Lista de Clientes` é um sistema que lê uma arquivo ´JSON´, e devolve as informações em uma tabela onde o usuário pode facilemente encontrar o seu cliente e suas informações completas.

## Tecnologias utilizadas

- NextJS
- React
- TailwindCSS

## Como instalar e utilizar a aplicação

No seu terminal rode os seguintes comandos:

```
npm install

# depois disso

npm run dev
```
## Estrutua do projeto

Em `/funcionario/[id]/page.jsx` contém o arquivo que contém todas as informações do cliente ao clicar no nome dele.

Em `/services/usuarioService.js` é o trecho em que centraliza as chamadas à API de clientes.

- `buscarUsarios()` faz uma requisição para obter a lista de usuários
- `buscarUsuarioPorId()` busca um usuário específico pelo ID

O arquivo `/hook/useUsuarios.js` cria um hook personalizado para carregar e filtrar usuarios.