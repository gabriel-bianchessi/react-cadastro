import {
  Dispatch,
  KeyboardEventHandler,
  MouseEvent,
  SetStateAction,
  useState,
} from "react"

import { Link } from "react-router-dom"

import InputCidades from "../components/InputCidades"
import InputEstados from "../components/InputEstados"
import GenericForm from "../StyledComponnents/GenericForm"
import StyledButton from "../StyledComponnents/StyledButton"

export default function () {
  const [cep, setCep] = useState("")
  const [uf, setUf] = useState("")
  const [cidade, setCidade] = useState("")
  const [bairro, setBairro] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const controller = new AbortController()

  async function buscaCep(cep: string) {
    cep.replace("-", "")
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: controller.signal,
    })
    let result = await request.json()
    console.log(result)
    console.log(result)
    setUf(result.uf)
    setCidade(result.localidade)
    setBairro(result.bairro)
    setRua(result.logradouro)
  }

  const keyDownCep: KeyboardEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.key == "Backspace") {
      controller.abort()
      console.log("Consulta cancelada")
      return
    }

    if (ev.key == "-") {
      ev.stopPropagation()
      ev.preventDefault()
      return
    }

    if (ev.currentTarget.value.length >= 8) {
      ev.stopPropagation()
      ev.preventDefault()
      return
    }
  }

  const keyUpCep: KeyboardEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.currentTarget.value.length >= 8) {
      setCep(ev.currentTarget.value)
      await buscaCep(ev.currentTarget.value)
    }
  }

  function handleChange(set: React.Dispatch<React.SetStateAction<string>>) {
    return (event: any) => set(event.currentTarget.value)
  }


  return (
    <>
      <GenericForm formTitle="Cadastro" submitTo={"user"} redirectTo="login">
        <p>
          Já tem uma conta? Clique <Link to={"/login"}>aqusi</Link>
        </p>
        <h2>Dados Pessoais</h2>
        <input
          placeholder="Nome"
          name="name"
          onChange={handleChange(setName)}
        />
        <input
          placeholder="E-mail"
          name="email"
          onChange={handleChange(setEmail)}
        />
        <input
          placeholder="Senha"
          name="password"
          onChange={handleChange(setPassword)}
        />

        <h2>Dados de Endereço</h2>
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

        <StyledButton title="Cadastrar"/>
      </GenericForm>
    </>
  )
}
