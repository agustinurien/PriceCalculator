
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { dataBase } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FuncionesContext } from "../../../context/FuncioinesContext";
import "../login/login.css"



const auth = getAuth();


const Login = () => {
    const { userLogeado } = useContext(FuncionesContext)

    const navigate = useNavigate()

    const [registrado, setRegistrado] = useState(false)
    const [yaExiste, setYaExiste] = useState(false)
    const [noEstaRegistrado, setNoEstaRegistrado] = useState(false)
    const [completa, setCompleta] = useState(false)

    async function registrarUsuario(email, password) {
        const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)
            .then((userFirebase) => {

                return userFirebase

            })
            .catch((error) => {
                setYaExiste(true)
                console.error(error);
            });
        const docuRef = doc(dataBase, `users/${infoUsuario.user.uid}`)
        setDoc(docuRef, { email: email, rol: "user" })
        setYaExiste(false)
        setRegistrado(true)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = e.target.elements.email.value
        const password = e.target.elements.password.value



        if (registrado === false) {
            registrarUsuario(email, password)
        } else if (registrado) {
            logear(email, password)
        }



    }

    const logear = async (email, password) => {

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            userLogeado(email)

        } catch (error) {
            console.error(error);
            setNoEstaRegistrado(true)

        }
    }

    return (
        <section className="contenedorAll">
            <div className="all">
                {
                    registrado ? <h2 className="tituloIoS">Iniciar sesión</h2> : <h2 className="tituloIoS">Registrate</h2>

                }
                {
                    yaExiste && <span>Ya hay una cuenta con este mail</span>

                }
                {
                    noEstaRegistrado && <span>Contraseña o email incorrecto</span>
                }
                <form className="campos" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        id="email" />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        id="password" />
                    {
                        registrado ? <button disabled={completa === true} type="submit">Log-in</button> :
                            <button disabled={completa === true} type="submit">Continuar</button>
                    }
                </form>

                {
                    registrado ? <button className="yaTengoCuenta" onClick={() => setRegistrado(false)}>Registrarme</button> : <button className="yaTengoCuenta" onClick={() => setRegistrado(true)}>Ya tengo una cuenta</button>
                }
            </div>

        </section>
    )
}

export default Login
