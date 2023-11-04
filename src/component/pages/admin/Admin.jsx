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
    const [nuevosRoles, setNuevosRoles] = useState([]);

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

    function toggleUserRole(email) {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user => {
                if (user.email === email) {
                    // Cambia el rol del usuario
                    return { ...user, rol: user.rol === 'admin' ? 'user' : 'admin' };
                }
                return user;
            });

            setNuevosRoles(updatedUsers);
            return updatedUsers;
        });
    }



    const cambiarRol = () => {
        console.log(JSON.stringify(nuevosRoles))
        fetch('https://flask-price-calculator.onrender.com/give_admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevosRoles)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log("hola");
            })
            .catch(error => {
                console.error('Error:', error);

            });
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
            <button onClick={() => cambiarRol()}>guardar cambios</button>
            <div className="contenedorTarjeta">
                {
                    acces &&

                    users.map((user, index) => {
                        const esAdmin = user.rol === "admin"


                        return (
                            <section key={index}>
                                <section className={esAdmin ? "tieneAcceso" : "tarjetaIntegrantes"}>
                                    <div className="detallesMasFoto">

                                        <AccountCircle style={{ fontSize: '70px' }} className={esAdmin ? "fotoUsuario" : "fotoUsuarioNoAccess"} />
                                        <div className="detallesIntegrantes">
                                            <h3 className={esAdmin ? "selectedH3" : ""}>{user.email}</h3>
                                            <h4 className={esAdmin ? "selectedH3" : ""}>id</h4>
                                        </div>
                                    </div>

                                    <button className={esAdmin ? "accessBtnTrue" : "accessBtn"} onClick={() => (toggleUserRole(user.email))}></button>
                                </section>
                            </section>
                        )

                    })
                }
            </div>
        </>
    )
}

export default Admin
