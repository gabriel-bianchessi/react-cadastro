import './App.css'
import TabDadosDeEndereco from './pages/TabDadosDeEndereco'

function TesteReqComponent() {
  async function testeReq() {
    const req = await fetch('/api')
    const res = await req.json()
    console.log(res)
  }

  return <>
    <button onClick={testeReq}>Teste</button>
  </>
}

export default function () {

  return <>
    <TesteReqComponent/>
    <TabDadosDeEndereco />
  </>
}