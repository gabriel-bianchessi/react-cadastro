import { Route, Routes, BrowserRouter } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import TabCadastro from "./pages/TabCadastro"
import PrivateRoutes from "./utils/PrivateRoute"
import { CookiesProvider } from "react-cookie"
import useAuth from "./hooks/useAuth"

export default function () {
  const [isAuthenticated, login, logout] = useAuth()

  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={
              <PrivateRoutes logged={isAuthenticated}>
                <HomePage />
              </PrivateRoutes>
            } />
            <Route path="/signup" element={<TabCadastro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  )
}
