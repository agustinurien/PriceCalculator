import "../admin/admin.css"
import lockImage from "../../../assets/lock.png"
import workers from "../../../assets/workers.png"
import { AccountCircle, ArrowLeft } from "@mui/icons-material"
import { useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { dataBase } from "../../../firebaseConfig"
import HeaderAdmin from "../../common/headerAdmin/HeaderAdmin"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect } from "react"
import { CircularProgress } from "@mui/material"

const auth = getAuth();
const Admin = () => {

    const [acces, setAcces] = useState(false)
    const [users, setUsers] = useState([]);
    const [nuevosRoles, setNuevosRoles] = useState([]);
    const [usuarioLogeado, setUsuarioLogeado] = useState([]);

    useEffect(() => {
        if (usuarioLogeado.email === "agus.urien2@gmail.com") {

            let usuarios = collection(dataBase, "users")

            getDocs(usuarios).then((res) => {
                let users = res.docs.map(doc => {
                    return { ...doc.data() }
                })
                setUsers(users)
            })
            setAcces(true)
        } else {
            console.log("no Acces")
        }
    }, [usuarioLogeado])


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

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
        logear(email, password)
    }


    const logear = async (email, password) => {

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUsuarioLogeado({ email: email, password: password })



        } catch (error) {
            console.error(error);


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
                        <form className="campos2" onSubmit={handleSubmit} >
                            <input
                                className="ingreseCorreo"
                                type="email"
                                placeholder="Correo electrónico"
                                id="email" />

                            <input
                                type="password"
                                placeholder="Contraseña"
                                id="password" />


                            <div className="botonesContraseña">
                                <button className="regresar"><ArrowLeft className="arrow" fontSize="inherit" />Regresar</button>
                                <button type="submit" className="continue">Continuar</button>
                            </div>
                        </form>
                    </div>
                </section >
            }
            {
                acces &&
                <>
                    <HeaderAdmin cambiarRol={cambiarRol} />
                    {
                        users.length === 0 &&
                        <div className="circularContainer">
                            <CircularProgress className="circular" />

                        </div>
                    }
                </>
            }
            {
                acces &&
                <div className="contenedorTarjeta">
                    {

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
            }

        </>
    )
}

export default Admin
