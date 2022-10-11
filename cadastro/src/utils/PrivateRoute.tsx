import { Route, Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

const PrivateRoutes = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let auth = false

  if (cookies.token) {
    console.log(cookies.token)
  }

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
