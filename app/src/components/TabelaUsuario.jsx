"use client";

import React from "react";
import { useUsuarios } from "../hooks/useUsuarios";

export default function TabelaUsuarios() {
  const { usuarios, busca, setBusca, carregando, erro } = useUsuarios();

  if (carregando) return <p>Carregando funcionários...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <div>
        <h2>Lista de Funcionários</h2>
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou empresa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {usuarios.length === 0 ? (
        <p>Nenhum funcionário encontrado para "{busca}".</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Cidade</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.address.city}</td>
                <td>{usuario.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
