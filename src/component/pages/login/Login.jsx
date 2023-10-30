
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { dataBase } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FuncionesContext } from "../../../context/FuncioinesContext";



const auth = getAuth();


const Login = () => {
    const { userLogeado } = useContext(FuncionesContext)

    const navigate = useNavigate()

    const [registrado, setRegistrado] = useState(false)
    const [yaExiste, setYaExiste] = useState(false)
    const [noEstaRegistrado, setNoEstaRegistrado] = useState(false)

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
        <>
            <div>
                <h2>Iniciar sesión</h2>
                {
                    yaExiste && <span>ya hay una cuenta con este mail</span>

                }
                {
                    noEstaRegistrado && <span>Este email no esta registrado</span>
                }
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        id="email" />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        id="password" />
                    {
                        registrado ? <button type="submit">Log-in</button> :
                            <button type="submit">Register</button>
                    }
                </form>

                {
                    registrado ? <button onClick={() => setRegistrado(false)}>Registrarme</button> : <button onClick={() => setRegistrado(true)}>Ya tengo una cuenta</button>
                }
            </div>

        </>
    )
}

export default Login
