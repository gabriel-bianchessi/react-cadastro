import { Dispatch, FormEventHandler, MouseEvent, useState } from "react"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import GenericForm from "../StyledComponnents/GenericForm"
import StyledButton from "../StyledComponnents/StyledButton"

export default function () {
  const [cookies, setCookies, removeCookies] = useCookies(['sesid'])
  let [email, setEmail] = useState('') 
  let [password, setPassword] = useState('')
  
  function handleChange(set: Dispatch<React.SetStateAction<string>>) {
    return (event: any) => set(event.currentTarget.value)
  }

  return (
    <>
      <GenericForm formTitle="Login" submitTo="login" redirectTo="">
        <p>Ainda não tem uma conta? Clique <Link to={'/signup'}>aqui</Link></p> 
        <input name="email" placeholder="email" onChange={handleChange(setEmail)}/>
        <input name="password" placeholder="password" onChange={handleChange(setPassword)}/>
        <StyledButton title="Login"/> 
      </GenericForm>
    </>
  )
}
