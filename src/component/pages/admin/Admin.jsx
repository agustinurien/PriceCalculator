import "../admin/admin.css"
import lockImage from "../../../assets/lock.png"
import workers from "../../../assets/workers.png"
import { AccountCircle, ArrowLeft, Visibility } from "@mui/icons-material"
import { useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { dataBase } from "../../../firebaseConfig"
import HeaderAdmin from "../../common/headerAdmin/HeaderAdmin"


const Admin = () => {

    const [acces, setAcces] = useState(false)
    const [contraseña, setContraseña] = useState("")
    const [users, setUsers] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    console.log(selectedCards)
    const isAccesTrue = () => {
        if (contraseña === "12345") {

            let usuarios = collection(dataBase, "users")

            getDocs(usuarios).then((res) => {
                let users = res.docs.map(doc => {
                    return { ...doc.data() }
                })
                setUsers(users)
            })
            setAcces(true)
        }
    }

    const toggleSelection = (usuario) => {
        const usuarioEncontrado = selectedCards.find(user => user === usuario)
        if (!usuarioEncontrado) {
            setSelectedCards([...selectedCards, usuario]);
        } else {
            setSelectedCards(selectedCards.filter(users => users !== usuarioEncontrado));
        }
    }



    return (
        <>

            {!acces &&
                <section className="contenidoPag" >
                    <img className="imagenWorkers" src={workers} alt="" />
                    <div className="contenidoIngrese">
                        <div className="imagenTexto">

                            <h1>Ingresa la <br />contraseña <br />para poder <br />acceder</h1>
                            <img className="imagenLock" src={lockImage} alt="" />

                        </div>
                        <input onChange={(e) => setContraseña(e.target.value)} type="password" placeholder="Contraseña..." />
                        <Visibility />
                        <div className="botonesContraseña">
                            <button className="regresar"><ArrowLeft className="arrow" fontSize="inherit" />Regresar</button>
                            <button onClick={() => isAccesTrue()} className="continue">Continuar</button>
                        </div>
                    </div>
                </section >
            }
            <HeaderAdmin />
            <div className="contenedorTarjeta">
                {
                    acces &&

                    users.map((user, index) => {
                        const estaSeleccionado = selectedCards.find(persona => persona === user)
                        return (
                            <section key={index} className={estaSeleccionado ? "tieneAcceso" : "tarjetaIntegrantes"}>
                                <div className="detallesMasFoto">
                                    <AccountCircle fontSize="large" className={estaSeleccionado ? "fotoUsuario" : "fotoUsuarioNoAccess"} />
                                    <div className="detallesIntegrantes">
                                        <h3 className={estaSeleccionado ? "selectedH3" : ""}>{user.email}</h3>
                                        <h4 className={estaSeleccionado ? "selectedH3" : ""}>id</h4>
                                    </div>
                                </div>

                                <button className={estaSeleccionado ? "accessBtnTrue" : "accessBtn"} onClick={() => toggleSelection(user)}></button>
                            </section>
                        )

                    })
                }
            </div>
        </>
    )
}

export default Admin
