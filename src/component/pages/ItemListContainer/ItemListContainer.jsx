import { saveAs } from 'file-saver';
import { useContext, useState } from "react"
import ItemList from "./ItemList"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import { Description, FileDownload } from "@mui/icons-material";


const ItemListContainer = () => {
    const { handleFileChange, recieveFromPy, productos, selectedFile, numero } = useContext(FuncionesContext);

    const [toggleDescuento, setToggleDescuento] = useState(0);

    const [toggle, setToggle] = useState(0)

    const descargar = () => {
        setToggle(toggle + 1)

    }
    const descargarDescuento = () => {
        setToggleDescuento(toggleDescuento + 1)

    }

    const enviarPy = (prodx) => {
        const jsonPy = JSON.stringify(prodx)

        if (prodx) {
            fetch('https://flask-price-calculator.onrender.com/update_file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
                body: jsonPy,
            })
                .then(response => response.blob())
                .then(blobData => {

                    saveAs(blobData, 'excel_actualizado.xlsx');
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        }
        setToggle(0)
    };

    const enviarPyTodos = (prodx) => {
        const jsonPy = JSON.stringify(prodx)
        if (prodx) {
            fetch('https://flask-price-calculator.onrender.com/update_file_all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
                body: jsonPy,
            })
                .then(response => response.blob())
                .then(blobData => {

                    saveAs(blobData, 'excel_actualizado.xlsx');
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        }
        setToggle(0)
    };

    const enviarPyD = (prodx) => {
        const jsonPy = JSON.stringify(prodx)

        if (prodx) {
            fetch('https://flask-price-calculator.onrender.com/update_file_discount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
                body: jsonPy,
            })
                .then(response => response.blob())
                .then(blobData => {

                    saveAs(blobData, 'excel_actualizado.xlsx');
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        }
        setToggleDescuento(0)
    };

    const enviarPyTodosD = (prodx) => {
        const jsonPy = JSON.stringify(prodx)

        if (prodx) {
            fetch('https://flask-price-calculator.onrender.com/update_file_all_discount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
                body: jsonPy,
            })
                .then(response => response.blob())
                .then(blobData => {

                    saveAs(blobData, 'excel_actualizado.xlsx');
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        }
        setToggleDescuento(0)
    };

    return (
        <div >
            <div className="contenedorSecciones">
                <div className="secA">
                    <div className="conA">
                        <div>
                            <h2 className="subT">Selecciona un Archivo</h2>
                        </div>
                        <Description className="iconoMui custom-icon-size" fontSize="larger" />
                        <div className="conBotones">
                            <input type="file" onChange={handleFileChange} />
                            <button
                                className={!selectedFile ? "disabled" : "subirA"}
                                onClick={recieveFromPy}
                                disabled={!handleFileChange}>Subir</button>
                        </div>
                    </div>

                </div>
                <div className="secA">
                    <div className="conA">
                        <div>
                            <h2 className="subT">Descargar los Productos </h2>
                        </div>
                        <FileDownload className="custom-icon-size download" fontSize="larger" />
                        <div className="botonDescarga">
                            <button
                                className={numero == 0 ? "disabled" : "subirA"}
                                disabled={!selectedFile}
                                onClick={descargar}>Descargar
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <ItemList
                productos={productos}
                enviarPy={enviarPy}
                toggle={toggle}
                enviarPyTodos={enviarPyTodos}
                enviarPyTodosD={enviarPyTodosD}
                enviarPyD={enviarPyD}
                toggleDescuento={toggleDescuento}
                descargarDescuento={descargarDescuento} />
        </div>
    );
}

export default ItemListContainer;