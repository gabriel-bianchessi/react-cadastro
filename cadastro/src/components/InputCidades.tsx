import { Dispatch, SetStateAction, useEffect, useState } from "react"

type props = {
    uf: string
    cidade: string
    setCidade: Dispatch<SetStateAction<string>>
}

export default function ({ uf, cidade, setCidade }: props) {
    const [cidades, setCidades] = useState([])
    const [loading, setLoading] = useState(true)

    async function buscarCidades() {
        setLoading(true)
        if (!uf) return
        const requestCidades = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        const cidades = await requestCidades.json()
        setLoading(false)
        setCidades(cidades)
    }

    useEffect(() => {
        buscarCidades()
    }, [uf])

    return <>
      {loading ? (
        <select><option>Carregando</option></select>
      ) : (
        <select
          onChange={(event) => setCidade(event.currentTarget.value)}
          value={cidade}
        >
          {cidade == "" ? (
            <option value="">
              --Selecione {uf == "" ? "um Estado" : "uma Cidade"}--
            </option>
          ) : (
            ""
          )}
          {cidades.map(({ nome }, idx) => (
            <option key={idx}>{nome}</option>
          ))}
        </select>
      )}
    </>
}