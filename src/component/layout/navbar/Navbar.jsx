import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext, useEffect, useState } from "react"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import imagenC from "../../../assets/descarga.png"
import imagenI from "../../../assets/icbc.jpg"
import imagenP from "../../../assets/provincia.png"
import imagenV from "../../../assets/4068PME.jpg"
import imagenOtros from "../../../assets/4068PME.jpg"
import { Settings } from "@mui/icons-material"
import Sidebar from "../../common/sideBar/Sidebar"



const Navbar = () => {
    const { elegirComision, market, nuevosMarkets } = useContext(FuncionesContext)
    const [img, setImg] = useState(imagenC)

    const [sideBar, setSideBar] = useState(false)

    const toggleSidebar = () => {
        setSideBar(!sideBar)
    }
    useEffect(() => {
        if (market === "CIUDAD") {
            setImg(imagenC)
        } else if (market === "ICBC") {
            setImg(imagenI)
        } else if (market === "PROVINCIA") {
            setImg(imagenP)
        } else if (market === "VARIOS") {
            setImg(imagenV)
        } else if (market !== "CIUDAD ICBC PROVINCIA VARIOS") {
            setImg(imagenOtros)
        }
    }, [market])

    return (
        <div
            className={market === "CIUDAD" || market === "ICBC" || market === "PROVINCIA" || market === "VARIOS" ? market : "OTROS"}>
            <div className="contenedorImagen">
                <img src={img} alt="tienda" />
            </div>

            <div className="nav">
                <div className="categoria">
                    <Link to={"/"} className="link-reset">Price-Calculator</Link>
                </div>
                <div className="categoria">
                    <Link to={"/Calculator"} className="link-reset">Calculator</Link>
                </div>

                <select className="select" onChange={(e) => elegirComision(e.target.value)}>
                    {
                        nuevosMarkets.map((market, index) => {
                            return (
                                <option key={index} value={market.label}>{market.label}</option>
                            )
                        })
                    }
                    {
                        nuevosMarkets.length > 0 && <option value="TODOS">TODOS</option>
                    }

                </select>
                <button className="settingsButton" onClick={() => { setSideBar(!sideBar) }}><Settings className="settings" fontSize="larger" /></button>
            </div>
            <Sidebar sideBar={sideBar} toggleSidebar={toggleSidebar} />
        </div >
    )
}

export default Navbar
