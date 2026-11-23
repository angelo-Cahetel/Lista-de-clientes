"use client";

import React from "react";
import Link from "next/link";
import { useUsuarios } from "../hooks/useUsuarios";

export default function TabelaUsuarios() {
  const {
    usuarios,
    busca,
    setBusca,
    carregando,
    erro,
    tentarNovamente,
  } = useUsuarios();

  if (carregando) {
    return (
      <p
        className="mx-auto w-full max-w-6xl px-4 py-10 text-center"
        role="status"
        aria-live="polite"
      >
        Carregando a lista de funcionários...
      </p>
    );
  }

  if (erro) {
    return (
      <div
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center"
        role="alert"
      >
        <p>{erro}</p>
        <button
          type="button"
          onClick={tentarNovamente}
          className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
      <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
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
        <>
          <ul className="space-y-3 md:hidden">
            {usuarios.map((usuario) => (
              <li
                key={usuario.id}
                className="rounded-lg border border-gray-300 p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold">
                  <Link
                    href={`/funcionarios/${usuario.id}`}
                    className="text-blue-700 underline"
                  >
                    {usuario.name}
                  </Link>
                </h2>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-zinc-600">Cidade</dt>
                    <dd className="min-w-0 wrap-break-word">
                      {usuario.address.city}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-zinc-600">Telefone</dt>
                    <dd className="min-w-0 wrap-break-word">{usuario.phone}</dd>
                  </div>
                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-zinc-600">E-mail</dt>
                    <dd className="min-w-0 wrap-break-word">{usuario.email}</dd>
                  </div>
                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-zinc-600">Empresa</dt>
                    <dd className="min-w-0 wrap-break-word">
                      {usuario.company.name}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <div className="hidden w-full overflow-x-auto md:block">
            <table className="w-full min-w-180 border-collapse border border-gray-400 table-auto">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-start">
                    Nome
                  </th>
                  <th className="border border-gray-300 p-2 text-start">
                    Cidade
                  </th>
                  <th className="border border-gray-300 p-2 text-start">
                    Telefone
                  </th>
                  <th className="border border-gray-300 p-2 text-start">
                    E-mail
                  </th>
                  <th className="border border-gray-300 p-2 text-start">
                    Empresa
                  </th>
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
                    <td className="border border-gray-300 p-2">
                      {usuario.phone}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.email}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.company.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
