import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext, useEffect, useState } from "react"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import imagenC from "../../../assets/descarga.png"
import imagenI from "../../../assets/icbc.jpg"
import imagenP from "../../../assets/provincia.png"
import imagenV from "../../../assets/4068PME.jpg"


const Navbar = () => {
    const { elegirComision, market } = useContext(FuncionesContext)
    const [img, setImg] = useState(imagenC)

    useEffect(() => {
        if (market === "CIUDAD") {
            setImg(imagenC)
        } else if (market === "ICBC") {
            setImg(imagenI)
        } else if (market === "PROVINCIA") {
            setImg(imagenP)
        } else if (market === "VARIOS") {
            setImg(imagenV)
        }
    }, [market])

    return (
        <div className={market}>
            <div className="contenedorImagen">
                <img src={img} alt="tienda" />
            </div>

            <div className="nav">
                <div className="categoria">
                    <Link to={"/"} className="link-reset">Home</Link>
                </div>
                <div className="categoria">
                    <Link to={"/DatosMarkets"} className="link-reset">Markets</Link>
                </div>

                <select className="select" onChange={(e) => elegirComision(e.target.value)}>
                    <option value="CIUDAD">Tienda Ciudad</option>
                    <option value="ICBC">ICBC</option>
                    <option value="PROVINCIA">Provincia</option>
                    <option value="VARIOS">Varios</option>
                </select>
            </div>
        </div>
    )
}

export default Navbar
