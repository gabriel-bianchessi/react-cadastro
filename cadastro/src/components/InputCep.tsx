import { useState, KeyboardEventHandler } from "react"

export default function() {
    const [cep, setCep] = useState("")
    const controller = new AbortController()

    async function buscaCep(cep: string) {
        cep.replace('-', '')
        parseInt(cep)
        const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {signal: controller.signal})
        let result = await request.json()
        console.log(result)
    }

    const keyDown: KeyboardEventHandler<HTMLInputElement> = async ev => {
        if (ev.key == "Backspace") {
            controller.abort()
            console.log('Consulta cancelada')
            return
        }
        
        if (ev.currentTarget.value.length >= 8) {
            ev.stopPropagation()
            ev.preventDefault()
            return
        }
    } 
    
    const keyUp: KeyboardEventHandler<HTMLInputElement> = async ev => {     
        if (ev.currentTarget.value.length == 8) {
            console.log("AAAA");

        }
    }

    return <>
        <input placeholder="CEP" onKeyUp={keyUp} onKeyDown={keyDown }></input>
    </>
}