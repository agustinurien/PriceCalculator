import { createContext, useState } from "react"


export const FuncionesContext = createContext();

const FuncionesContextProvider = ({ children }) => {

    const valoresComisiones = [
        { label: "CIUDAD", value: 0.20 },
        { label: "ICBC", value: 0.1509 },
        { label: "PROVINCIA", value: 0.10 },
        { label: "VARIOS", value: 0.127 }
    ];

    const [productos, setProductos] = useState([])

    const [numero, setNumero] = useState(0)

    const [comision, setComision] = useState(0.20)

    const [market, setMarket] = useState("CIUDAD")

    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const recieveFromPy = async () => {
        if (!selectedFile) {
            console.log("No se ha seleccionado ningún archivo.");
            return;
        }

        setNumero(1)
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setProductos(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const elegirComision = (mkp) => {
        setMarket(mkp)
        const comisionMkp = valoresComisiones.find((market) => market.label === mkp)
        setComision(comisionMkp.value)
    }

    const findPrice = (margen, itemSku, iva) => {

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            const resultado = (productoEncontrado.costo) / (1 - comision - 0.05 - ((margen / 100) / 0.65)) * iva;
            const roundedPrice = (Math.floor(resultado / 100) * 100) - 1;
            return roundedPrice
        }
    }

    let data = {
        findPrice,
        elegirComision,
        market,
        handleFileChange,
        recieveFromPy,
        productos,
        selectedFile,
        numero,

    };

    return <FuncionesContext.Provider value={data}> {children} </FuncionesContext.Provider>
}

export default FuncionesContextProvider
