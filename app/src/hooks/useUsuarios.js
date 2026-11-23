"use client";
import { useState, useEffect, useMemo } from "react";
import { buscarUsuarios } from "../services/usuarioService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await buscarUsuarios();
        setUsuarios(dados);
      } catch (error) {
        setErro(error.message || "Falha ao consumir a API");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const usuariosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    if (!termo) return usuarios;

    return usuarios.filter(
      (usuario) => {
        usuario.name.toLowerCase().includes(termo) ||
          usuario.company.name.toLowerCase().includes(termo);
      },
      [usuarios, busca],
    );
  });

  return { usuarios: usuariosFiltrados, carregando, erro, setBusca };
}
