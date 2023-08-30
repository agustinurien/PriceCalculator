
import { useContext, useState } from "react"
import ItemList from "./ItemList"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import { Description, FileDownload } from "@mui/icons-material";


const ItemListContainer = () => {
    const { handleFileChange, recieveFromPy, productos, selectedFile, numero } = useContext(FuncionesContext);

    const [toggle, setToggle] = useState(0)
    const [dataJsn, setDataJsn] = useState(0)

    const descargar = () => {
        setToggle(toggle + 1)
    }

    const enviarPy = (productos) => {
        const jsonPy = JSON.stringify(productos);
        setDataJsn(jsonPy);

        if (toggle === 1) {
            fetch('http://127.0.0.1:5000/update_file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indica que estás enviando JSON en el cuerpo
                },
                body: jsonPy, // Envía el JSON como cuerpo de la solicitud
                responseType: 'blob', // Indica que esperas un archivo binario como respuesta
            })
                .then(response => response.blob()) // Convierte la respuesta en un objeto Blob
                .then(blobData => {
                    // Crea un enlace (link) para descargar el archivo
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blobData);
                    downloadLink.download = 'excel_actualizado.xlsx'; // Nombre del archivo
                    downloadLink.click(); // Simula un clic en el enlace para descargar
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        }
        setToggle(0);
    }

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
                            <button className={!selectedFile ? "disabled" : "subirA"} onClick={recieveFromPy} disabled={!handleFileChange}>Subir</button>
                        </div>
                    </div>

                </div>
                <div className="secA">
                    <div className="conA">
                        <div>
                            <h2 className="subT">Descragar los Productos </h2>
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
            <ItemList productos={productos} enviarPy={enviarPy} />
        </div>
    );
}

export default ItemListContainer;