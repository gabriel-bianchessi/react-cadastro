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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const controller = new AbortController();

  async function buscaCep(cep: string) {
    cep.replace("-", "");
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: controller.signal,
    });
    let result = await request.json();
    console.log(result);
    console.log(result);
    setUf(result.uf);
    setCidade(result.localidade);
    setBairro(result.bairro);
    setRua(result.logradouro);
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

  function handleChange(set: React.Dispatch<React.SetStateAction<string>>) {
    return (event: any) => set(event.currentTarget.value);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    }

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    console.log(options)
    
    const request = await fetch('http://127.0.0.1:8080/api/teste', options) 
    const result = await request.json()  
    console.log(result)
  }

  return (
    <>
      <div>
        <h1>Cadastro</h1>
        <h2>Dados Pessoais</h2>
        <input placeholder="Nome" name="name" onChange={handleChange(setName)}/>
        <input placeholder="E-mail" name="email" onChange={handleChange(setEmail)}/>
        <input placeholder="Senha" name="password" onChange={handleChange(setPassword)}/>

        <h2>Dados de Endereço</h2>
        <input
          placeholder="CEP"
          onKeyUp={keyUpCep}
          onKeyDown={keyDownCep}
        ></input>
        <div className="info">
          <InputEstados uf={uf} setUf={setUf} />
          <InputCidades uf={uf} setCidade={setCidade} cidade={cidade} />
          <input
            name="bairro"
            placeholder="Bairro"
            defaultValue={bairro}
            onKeyUp={handleChange(setBairro)}
          />
          <input
            name="rua"
            placeholder="Rua"
            defaultValue={rua}
            onKeyUp={handleChange(setRua)}
          />
          <input
            name="numero"
            placeholder="Número"
            defaultValue={numero}
            onKeyUp={handleChange(setNumero)}
          />
          <input
            name="complemento"
            placeholder="Complemento"
            defaultValue={complemento}
            onKeyUp={handleChange(setComplemento)}
          />
        </div>

        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </>
  );
}
