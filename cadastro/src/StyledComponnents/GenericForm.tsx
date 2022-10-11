import { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface IGenericFormProps extends PropsWithChildren {
  formTitle: string
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

export default function GenericForm({children, formTitle} : IGenericFormProps ) {
  return (
    <>
      <StyledGenericForm>
        <h1>{formTitle}</h1>
        {children}
      </StyledGenericForm>
    </>
  )
}