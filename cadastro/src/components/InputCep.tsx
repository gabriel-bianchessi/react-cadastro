import { KeyboardEventHandler, SetStateAction, Dispatch } from "react"

type props = {
    setCep: Dispatch<SetStateAction<string>>
}

export default function({setCep}: props) {
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

        if(ev.key == "-") {
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
    
    const keyUp: KeyboardEventHandler<HTMLInputElement> = async ev => {     
        if (ev.currentTarget.value.length == 8) {
            setCep(ev.currentTarget.value)            
        }
    }

    return <>
        <input placeholder="CEP" onKeyUp={keyUp} onKeyDown={keyDown }></input>
    </>
}