import { saveAs } from 'file-saver';
import { useContext, useState } from "react"
import ItemList from "./ItemList"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import { Description, FileDownload } from "@mui/icons-material";


const ItemListContainer = () => {
    const { handleFileChange, recieveFromPy, productos, selectedFile, numero } = useContext(FuncionesContext);

    const [toggle, setToggle] = useState(0)

    const descargar = () => {
        setToggle(toggle + 1)

    }



    const enviarPy = (prodx) => {
        const jsonPy = JSON.stringify(prodx)

        if (prodx) {
            fetch('http://127.0.0.1:5000/update_file', {
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
            <ItemList productos={productos} enviarPy={enviarPy} toggle={toggle} />
        </div>
    );
}

export default ItemListContainer;