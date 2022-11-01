import { PropsWithChildren } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

interface IGenericFormProps extends PropsWithChildren {
  formTitle: string
  submitTo: string
  redirectTo: string
}

export const StyledGenericForm = styled.form`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`

export default function GenericForm({
  children,
  formTitle,
  submitTo,
  redirectTo,
}: IGenericFormProps) {
  const navigate = useNavigate()
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()

    const formData = new FormData(event.currentTarget)
    let data: { [key: string]: string } = {}
    formData.forEach((value, key) => (data[key] = value.toString()))

    const request = await fetch(`http://127.0.0.1:8080/api/${submitTo}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (request.status === 200) {
      navigate(redirectTo)
      return
    }

    const result = await request.json()

    console.log(result)
  }

  return (
    <>
      <StyledGenericForm onSubmit={handleSubmit}>
        <h1>{formTitle}</h1>
        {children}
      </StyledGenericForm>
    </>
  )
}
