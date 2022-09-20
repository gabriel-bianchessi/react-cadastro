import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useState,
} from "react";

import InputCidades from "../components/InputCidades";
import InputEstados from "../components/InputEstados";

export default function () {
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const controller = new AbortController();

  async function buscaCep(cep: string) {
    cep.replace("-", "");
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: controller.signal,
    });
    let result = await request.json();
    console.log(result);
    setUf(result.uf);
    setCidade(result.localidade);
    setBairro(result.bairro)
    setRua(result.logradouro)
  }

  const keyDownCep: KeyboardEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.key == "Backspace") {
      controller.abort();
      console.log("Consulta cancelada");
      return;
    }

    if (ev.key == "-") {
      ev.stopPropagation();
      ev.preventDefault();
      return;
    }

    if (ev.currentTarget.value.length >= 8) {
      ev.stopPropagation();
      ev.preventDefault();
      return;
    }
  };

  const keyUpCep: KeyboardEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.currentTarget.value.length >= 8) {
      setCep(ev.currentTarget.value);
      await buscaCep(ev.currentTarget.value);
    }
  };

  function x(set: React.Dispatch<React.SetStateAction<string>>) {
    return (event: any) => set(event.currentTarget.value);
  }

  return (
    <>
      <main>
        <h1>Cadastro: Dados de Endereço</h1>
        <input
          placeholder="CEP"
          onKeyUp={keyUpCep}
          onKeyDown={keyDownCep}
        ></input>
        <InputEstados uf={uf} setUf={setUf} />
        <InputCidades uf={uf} setCidade={setCidade} cidade={cidade} />
        <input
          name="bairro"
          placeholder="Bairro"
          defaultValue={bairro}
          onKeyUp={x(setBairro)}
        />
        <input
          name="rua"
          placeholder="Rua"
          defaultValue={rua}
          onKeyUp={x(setRua)}
        />
        <input
          name="numero"
          placeholder="Número"
          defaultValue={numero}
          onKeyUp={x(setNumero)}
        />
        <input
          name="complemento"
          placeholder="Complemento"
          defaultValue={complemento}
          onKeyUp={x(setComplemento)}
        />
      </main>
    </>
  );
}
