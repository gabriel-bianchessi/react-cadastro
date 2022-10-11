import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface IGenericButtonProps {
  title: string
  to: string
  clicked: MouseEventHandler<HTMLButtonElement>
}

export const Button = styled.button`
  width: 90%;
  height: 3em;
  background-color: #0D4982;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 16px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`

export default function StyledButton(props: IGenericButtonProps) {
  return (<> 
    <Button>
      <StyledLink to={props.to}>{props.title}</StyledLink>
    </Button>
  </>)
}