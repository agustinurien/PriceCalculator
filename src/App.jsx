import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import ItemListContainer from "./component/pages/ItemListContainer/ItemListContainer";
import FuncionesContextProvider from "./context/FuncioinesContext";
import Layout from "./component/layout/Layout";
import Calculator from "./component/pages/Calculator/Calculator";
import Admin from "./component/pages/admin/Admin";
import Login from "./component/pages/login/Login";




function App() {


  return (
    <>
      <BrowserRouter>

        <FuncionesContextProvider>

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ItemListContainer />}></Route>
              <Route path="/Calculator" element={<Calculator />}></Route>
            </Route>
            <Route path="/Admin" element={<Admin />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          </Routes>

        </FuncionesContextProvider>

      </BrowserRouter>
    </>
  )
}

export default App
