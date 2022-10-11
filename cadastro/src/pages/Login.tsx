import { Dispatch, FormEventHandler, MouseEvent, useState } from "react"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import GenericForm from "../StyledComponnents/GenericForm"
import StyledButton from "../StyledComponnents/StyledButton"

export default function () {
  // const [cookies, setCookies, removeCookies] = useCookies(['sesid'])
  let [email, setEmail] = useState('') 
  let [password, setPassword] = useState('')
  
  function handleChange(set: Dispatch<React.SetStateAction<string>>) {
    return (event: any) => set(event.currentTarget.value)
  }	

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const data = {
      email,
      password,
    }

    let options: RequestInit = {  
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(data),
    }
    
    const request = await fetch('http://127.0.0.1:8080/api/teste', options) 
    const result = await request.json()
    console.log(result)  
    // console.log("Cookie:" ,cookies.sesid)
  }

  return (
    <>
      <GenericForm formTitle="Login">
        <p>Ainda não tem uma conta? Clique <Link to={'/signup'}>aqui</Link></p> 
        <input name="email" placeholder="email" onChange={handleChange(setEmail)}/>
        <input name="password" placeholder="password" onChange={handleChange(setPassword)}/>
        <StyledButton title="Login" to="/" clicked={handleSubmit}/> 
      </GenericForm>
    </>
  )
}
