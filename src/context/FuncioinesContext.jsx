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

    const [porcentaje, setPorcentaje] = useState();

    const aplicarDecuento = (porcentaje) => {
        const porcentajeDecimal = (porcentaje / 100)
        setPorcentaje(porcentajeDecimal)
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const recieveFromPy = async () => {
        if (!selectedFile) {

            return;
        }

        setNumero(1)
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('https://flask-price-calculator.onrender.com/upload', {
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
        if (mkp !== "TODOS") {
            const comisionMkp = valoresComisiones.find((market) => market.label === mkp)
            setComision(comisionMkp.value)
        }
    }



    const findPriceTodos = (margen, itemSku, iva) => {
        const PreciosT = []
        const PreciosTDescuento = []

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            valoresComisiones.forEach(market => {
                const resultado = (productoEncontrado.costo) / (1 - market.value - 0.05 - ((margen / 100) / 0.65)) * iva;
                const precioT = (Math.floor(resultado / 100) * 100) - 1;


                PreciosT.push({ precio: precioT, label: market.label })

                if (porcentaje > 0) {
                    const precioPromocionT = precioT * (1 + porcentaje)
                    const precioTRedondeado = (Math.floor(precioPromocionT / 100) * 100)
                    PreciosTDescuento.push({ precio: precioTRedondeado, label: market.label })
                }
            });

        }
        if (porcentaje > 0) {
            return PreciosTDescuento
        }
        return PreciosT
    }


    const findPrice = (margen, itemSku, iva) => {

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            const resultado = (productoEncontrado.costo) / (1 - comision - 0.05 - ((margen / 100) / 0.65)) * iva;
            const roundedPrice = (Math.floor(resultado / 100) * 100) - 1;
            const precioPromocion = roundedPrice * (1 + porcentaje)
            if (porcentaje > 0) {
                return (Math.floor(precioPromocion / 100) * 100)
            }
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
        aplicarDecuento,
        findPriceTodos

    };

    return <FuncionesContext.Provider value={data}> {children} </FuncionesContext.Provider>
}

export default FuncionesContextProvider
