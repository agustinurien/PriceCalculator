import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import Layout from "./component/layout/layout";
import ItemListContainer from "./component/pages/ItemListContainer/ItemListContainer";
import DatosMarkets from "./component/pages/datosMarkets/DatosMarkets";
import FuncionesContextProvider from "./context/FuncioinesContext";




function App() {


  return (
    <>
      <BrowserRouter>

        <FuncionesContextProvider>

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ItemListContainer />}></Route>
              <Route path="/DatosMarkets" element={<DatosMarkets />}></Route>


            </Route>
          </Routes>

        </FuncionesContextProvider>

      </BrowserRouter>
    </>
  )
}

export default App
