import { useState } from "react";
import InputCep from "../components/InputCep";
import InputCidades from "../components/InputCidades";
import InputEstados from "../components/InputEstados";

export default function () {
  const [uf, setUf] = useState("");
  const [bairro, setBairro] = useState("")
  const [rua, setRua] = useState("")
  const [complemento, setComplemento] = useState("")

  return (
    <>
      <main>
        <h1>Cadastro: Dados de Endereço</h1>
        <InputCep></InputCep>
        <InputEstados setUf={setUf} />
        <InputCidades uf={uf} />
        <input name="bairro" placeholder="Bairro"/>
        <input name="rua" placeholder="Rua" />
        <input name="complemento" placeholder="Complemento" />
      </main>  
    </>
  );
}
