
import { Link } from "react-router-dom"
import "../headerAdmin/headerAdmin.css"
import { ArrowRight } from "@mui/icons-material"

const HeaderAdmin = () => {
    return (
        <div className="navbarAdmin">
            <h1 className="tituloAdmin">
                Administracion de acceso
            </h1>
            <Link to={"/"} className="home">HOME<ArrowRight /></Link>
        </div>
    )
}

export default HeaderAdmin
