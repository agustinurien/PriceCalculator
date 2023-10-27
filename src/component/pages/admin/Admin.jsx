import "../admin/admin.css"
import lockImage from "../../../assets/lock.png"
import workers from "../../../assets/workers.png"
import { ArrowLeft, Visibility } from "@mui/icons-material"

const Admin = () => {
    return (
        <section className="contenidoPag">
            <img className="imagenWorkers" src={workers} alt="" />
            <div className="contenidoIngrese">
                <div className="imagenTexto">

                    <h1>Ingresa la <br />contraseña <br />para poder <br />acceder</h1>
                    <img className="imagenLock" src={lockImage} alt="" />

                </div>
                <input type="password" placeholder="Contraseña..." />
                <Visibility />
                <div className="botonesContraseña">
                    <button className="regresar"><ArrowLeft className="arrow" fontSize="inherit" />Regresar</button>
                    <button className="continue">Continuar</button>
                </div>
            </div>


        </section>
    )
}

export default Admin
