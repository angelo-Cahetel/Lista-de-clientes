"use client";

import React from "react";
import Link from "next/link";
import { useUsuarios } from "../hooks/useUsuarios";

export default function TabelaUsuarios() {
  const { usuarios, busca, setBusca, carregando, erro } = useUsuarios();

  if (carregando) return <p>Carregando funcionários...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <div className="p-6 flex justify-between">
        <h1 className="text-2xl">Lista de Funcionários</h1>
        <input
          type="text"
          placeholder="Buscar por nome ou empresa"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border py-2 px-5 rounded-2xl bg-zinc-200"
        />
      </div>

      {usuarios.length === 0 ? (
        <p>
          {busca.trim()
            ? `Nenhum funcionário encontrado para "${busca}".`
            : "Nenhum funcionário encontrado."}
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-400 table-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-start">Nome</th>
              <th className="border border-gray-300 p-2 text-start">Cidade</th>
              <th className="border border-gray-300 p-2 text-start">
                Telefone
              </th>
              <th className="border border-gray-300 p-2 text-start">E-mail</th>
              <th className="border border-gray-300 p-2 text-start">Empresa</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="border border-gray-300 p-2">
                  <Link
                    href={`/funcionarios/${usuario.id}`}
                    className="font-medium text-blue-700 underline"
                  >
                    {usuario.name}
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  {usuario.address.city}
                </td>
                <td className="border border-gray-300 p-2">{usuario.phone}</td>
                <td className="border border-gray-300 p-2">{usuario.email}</td>
                <td className="border border-gray-300 p-2">
                  {usuario.company.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
