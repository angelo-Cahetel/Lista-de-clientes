"use client";
import { useState, useEffect, useMemo } from "react";
import { buscarUsuarios } from "../services/usuarioService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);
  const [ordem, setOrdem] = useState("az");

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const dados = await buscarUsuarios();
        if (ativo) setUsuarios(dados);
      } catch {
        if (ativo) {
          setErro(
            "Não foi possível carregar os funcionários. Verifique sua conexão e tente novamente."
          );
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [tentativa]);

  function tentarNovamente() {
    setErro(null);
    setCarregando(true);
    setTentativa((valor) => valor + 1);
  }

  const usuariosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    const filtrados = termo
      ? usuarios.filter(
          (usuario) =>
            usuario.name.toLowerCase().includes(termo) ||
            usuario.company.name.toLowerCase().includes(termo)
        )
      : usuarios;

    return [...filtrados].sort((a, b) => {
      const resultado = a.name.localeCompare(b.name, "pt-BR", {
        sensitivity: "base",
      });
      return ordem === "az" ? resultado : -resultado;
    });
  }, [usuarios, busca, ordem]);

  return {
    usuarios: usuariosFiltrados,
    busca,
    carregando,
    erro,
    setBusca,
    ordem,
    setOrdem,
    tentarNovamente,
  };
}
