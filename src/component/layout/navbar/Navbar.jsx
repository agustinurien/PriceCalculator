import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext, useEffect, useState } from "react"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import imagenC from "../../../assets/descarga.png"
import imagenI from "../../../assets/icbc.jpg"
import imagenP from "../../../assets/provincia.png"
import imagenV from "../../../assets/4068PME.jpg"
import imagenOtros from "../../../assets/otro.png"
import { Lock, Settings } from "@mui/icons-material"
import Sidebar from "../../common/sideBar/Sidebar"



const Navbar = () => {
    const { elegirComision, market, nuevosMarkets, userName, users } = useContext(FuncionesContext)
    const [img, setImg] = useState(imagenC)

    const navigate = useNavigate()

    const [sideBar, setSideBar] = useState(false)
    const [rol, setRol] = useState("")
    const [email, setEmail] = useState("")


    useEffect(() => {
        const storedRol = localStorage.getItem("userRol");
        const storedEmail = localStorage.getItem("userEmail");

        if (storedRol && storedEmail) {
            setRol(storedRol);
            setEmail(storedEmail)
        } else {
            const usuario = users.find((user) => user.email === userName);
            if (usuario) {
                setRol(usuario.rol);
                setEmail(usuario.email);
                localStorage.setItem("userRol", usuario.rol);
                localStorage.setItem("userEmail", usuario.email);
            }
        }
    }, [userName, users]);

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

    const handleClearStorage = () => {
        localStorage.clear();
        navigate("/");
        setRol("")
        setEmail("")
    };

    return (
        <>


            <div
                className={market === "CIUDAD" || market === "ICBC" || market === "PROVINCIA" || market === "VARIOS" ? market : "OTROS"}>
                <div className="categoria log">


                    <div className="userDetails">
                        <div className="fotoBlack">
                        </div>
                        {
                            email ?
                                <div>

                                    <span className="usuario">{email}</span>
                                    <div className="logOut">

                                        <button className="botonLog" onClick={() => { handleClearStorage() }}>Log-out</button>
                                    </div>
                                </div>
                                :
                                <Link to={"/Login"} className="reset">Log-in</Link>

                        }
                    </div>
                </div>

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

                    <button
                        disabled={rol === "user" || rol === ""}
                        className="settingsButton"
                        onClick={() => { setSideBar(!sideBar) }}>
                        {
                            rol === "admin" ?
                                <Settings
                                    className="settings"
                                    fontSize="larger" />
                                :
                                <Lock
                                    className="Lock"
                                    fontSize="smaller" />

                        }


                    </button>

                    <Sidebar sideBar={sideBar} toggleSidebar={toggleSidebar} />

                </div>


            </div >
        </>
    )
}

export default Navbar
