import { useContext } from "react";
import { FuncionesContext } from "../../../context/FuncioinesContext";
import { useState } from "react";
import { Add, CheckCircle, CheckCircleOutline, Close, Create, Done, KeyboardArrowRight, RemoveCircleOutline } from "@mui/icons-material"
import { motion } from "framer-motion"
import "./sidebar.css"

const Sidebar = ({ sideBar, toggleSidebar }) => {

    const { valoresComisiones } = useContext(FuncionesContext)

    const costosEnvio = [

    ];

    const [editar, setEditar] = useState(false)


    const [desplegar, setDesplegar] = useState({
        markets: false,
        costoEnvio: false,
    })


    const toggleDesplegar = (topic) => {
        setDesplegar((prevDesplegar) => ({
            ...prevDesplegar,
            [topic]: !prevDesplegar[topic],
        }))
    }
    return (
        <>
            {
                sideBar === true && (<section className="fondoNegro"></section>)
            }

            <motion.section
                initial={{ opacity: 0, width: 200 }}
                animate={sideBar ? { opacity: 1, width: 400 } : {}}
                transition={{ duration: 0.3, delay: 0 }}
                className={sideBar ? "sideBar" : "noSideBar"}>

                <div className="contenedorConfiguracion">
                    <h2>Configuracion</h2>
                    <button className="settingsButton buttonCross" onClick={() => toggleSidebar()}>
                        <Close className="settings cross" fontSize="inherit" />
                    </button>
                </div>

                <div className="itemsConfig">
                    <section className="acordion">
                        <button onClick={() => { toggleDesplegar("markets"), setEditar(false) }} className="topic">
                            <h3>Markets</h3>
                            <KeyboardArrowRight className={desplegar.markets && "rotate"} />
                        </button>
                        {
                            desplegar.markets && (
                                <>
                                    {
                                        valoresComisiones.map((element, index) => {
                                            const delay = 0.1 * index;
                                            return (

                                                <motion.div

                                                    key={element.label}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "auto" }}
                                                    exit={{ height: 0, }}
                                                    transition={{ duration: 0.2 }}
                                                    className="detalles">
                                                    <div className="comisiones gay">
                                                        <div className="mkpEdit">
                                                            {
                                                                editar && (
                                                                    <motion.button
                                                                        className="botonEliminar"><RemoveCircleOutline fontSize="inherit" /></motion.button>
                                                                )
                                                            }
                                                            <motion.h4
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ duration: 0.3, delay: delay + 0.1 }}
                                                            >{element.label}</motion.h4>
                                                        </div>
                                                        {
                                                            editar === false ? (
                                                                <motion.h4
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ duration: 0.3, delay: delay + 0.2 }}
                                                                >${element.value}</motion.h4>
                                                            ) : (
                                                                <input type="text" className="inputComision" value={element.value} />

                                                            )
                                                        }

                                                    </div>
                                                </motion.div>

                                            )
                                        })
                                    }


                                    <section
                                        className="seccionAgregar">
                                        {
                                            editar === true && (
                                                <>
                                                    <button
                                                        className="botonCancelar"
                                                        onClick={() => setEditar(!editar)}>CANCELAR</button>
                                                    <button
                                                        className="botonDone"
                                                        onClick={() => setEditar(!editar)}><CheckCircleOutline className="check" fontSize="inherit" /></button>
                                                </>
                                            )
                                        }
                                        {
                                            editar === false && (
                                                <>
                                                    <motion.button
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.5 }}
                                                        className="agregar"> <Add className="add" fontSize="inherit" />AGREGAR</motion.button>
                                                    <motion.button
                                                        onClick={() => setEditar(!editar)}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.5 }}
                                                        className="editar"><Create className="edit" fontSize="inherit" /></motion.button>
                                                </>
                                            )
                                        }
                                    </section>




                                </>
                            )
                        }
                    </section>

                    <section
                        className="acordion">
                        <button onClick={() => toggleDesplegar("costoEnvio")} className="topic">
                            <h3>Costos de envio</h3>
                            <KeyboardArrowRight className={desplegar.costoEnvio && "rotate"} />
                        </button>
                        {
                            desplegar.costoEnvio && (
                                <>
                                    {
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            exit={{ height: 0, }}
                                            transition={{ duration: 0.2 }}
                                            className="detalles">
                                            {
                                                costosEnvio.length === 0 && (
                                                    <motion.h4
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                    >NO HAY DATOS</motion.h4>
                                                )
                                            }
                                        </motion.div>
                                    }
                                    <section
                                        className="seccionAgregar">
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.3 }}
                                            className="agregar"> <Add className="add" fontSize="inherit" />AGREGAR</motion.button>
                                        <motion.button
                                            onClick={() => setEditar()}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.3 }}
                                            className="editar"><Create className="edit" fontSize="inherit" /></motion.button>
                                    </section>
                                </>
                            )
                        }
                    </section>
                </div>
            </motion.section >
        </>
    )
}

export default Sidebar
