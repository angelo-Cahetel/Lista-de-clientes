"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { buscarUsuarioPorId } from "../../src/services/usuarioService";

export default function DetalhesFuncionario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await buscarUsuarioPorId(id);
        setUsuario(dados);
      } catch (error) {
        setErro(error.message || "Falha ao carregar o funcionário");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarUsuario();
  }, [id]);

  if (carregando) return <p className="p-6">Carregando funcionário...</p>;
  if (erro) return <p className="p-6">Erro: {erro}</p>;
  if (!usuario) return <p className="p-6">Funcionário não encontrado.</p>;

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <Link href="/" className="text-blue-700 underline">
        Voltar para a lista
      </Link>

      <h1 className="mt-6 mb-6 text-3xl font-bold">{usuario.name}</h1>

      <div className="grid gap-4 rounded border border-gray-300 p-6 sm:grid-cols-2">
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Nome de usuário:</strong> {usuario.username}</p>
        <p><strong>Nome completo:</strong> {usuario.name}</p>
        <p><strong>E-mail:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.phone}</p>
        <p><strong>Website:</strong> {usuario.website}</p>

        <p><strong>Rua:</strong> {usuario.address.street}</p>
        <p><strong>Número:</strong> {usuario.address.suite}</p>
        <p><strong>Cidade:</strong> {usuario.address.city}</p>
        <p><strong>CEP:</strong> {usuario.address.zipcode}</p>
        <p><strong>Latitude:</strong> {usuario.address.geo.lat}</p>
        <p><strong>Longitude:</strong> {usuario.address.geo.lng}</p>

        <p><strong>Empresa:</strong> {usuario.company.name}</p>
        <p><strong>Slogan:</strong> {usuario.company.catchPhrase}</p>
        <p className="sm:col-span-2">
          <strong>Área de atuação:</strong> {usuario.company.bs}
        </p>
      </div>
    </main>
  );
}
