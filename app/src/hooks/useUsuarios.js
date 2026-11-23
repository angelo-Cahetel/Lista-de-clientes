"use client";
import { useState, useEffect, useMemo } from "react";
import { buscarUsuarios } from "../services/usuarioService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

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
    if (!termo) return usuarios;

    return usuarios.filter((usuario) =>
      usuario.name.toLowerCase().includes(termo) ||
      usuario.company.name.toLowerCase().includes(termo)
    );
  }, [usuarios, busca]);

  return {
    usuarios: usuariosFiltrados,
    busca,
    carregando,
    erro,
    setBusca,
    tentarNovamente,
  };
}
