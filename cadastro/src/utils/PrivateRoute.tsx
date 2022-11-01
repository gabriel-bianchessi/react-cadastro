import {Outlet, Navigate } from "react-router-dom"
import { PropsWithChildren } from "react"

interface PrivateRoutesProps {
  logged: boolean | (() => void),
  children: PropsWithChildren<any>
}

const PrivateRoutes = ({logged, children}: PrivateRoutesProps) => {

  if (!logged) return <Navigate to="/login" />

  return (
    children
  )
}

export default PrivateRoutes
