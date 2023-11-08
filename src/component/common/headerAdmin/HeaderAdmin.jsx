
import { Link } from "react-router-dom"
import "../headerAdmin/headerAdmin.css"
import { ArrowRight } from "@mui/icons-material"

const HeaderAdmin = ({ cambiarRol }) => {
    return (
        <div className="navbarAdmin">
            <h1 className="tituloAdmin">
                Administracion de acceso
            </h1>
            <div className="linkSave">
                <button onClick={() => cambiarRol()}>GUARDAR CAMBIOS</button>
                <Link to={"/"} className="home">HOME<ArrowRight /></Link>
            </div>
        </div>
    )
}

export default HeaderAdmin
