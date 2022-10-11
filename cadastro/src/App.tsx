import { Route, Routes, BrowserRouter } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import TabCadastro from "./pages/TabCadastro"
import PrivateRoutes from "./utils/PrivateRoute"
import { CookiesProvider } from "react-cookie"

export default function () {
  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/signup" element={<TabCadastro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  )
}
