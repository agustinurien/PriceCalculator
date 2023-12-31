import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { dataBase } from "../firebaseConfig";


export const FuncionesContext = createContext();


const FuncionesContextProvider = ({ children }) => {

    const [productos, setProductos] = useState([])
    const [numero, setNumero] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null);
    const [porcentaje, setPorcentaje] = useState();
    const [nuevosMarkets, setNuevosMarkets] = useState([]);
    const [comision, setComision] = useState(0)
    const [market, setMarket] = useState("")

    const [userName, setUserName] = useState("")
    const [users, setUsers] = useState([]);

    const userLogeado = (email) => {
        let usuarios = collection(dataBase, "users")

        getDocs(usuarios).then((res) => {
            let users = res.docs.map(doc => {
                return { ...doc.data() }
            })
            setUsers(users)
        })

        setUserName(email)
    }

    useEffect(() => {
        let marketsFB = collection(dataBase, "markets")

        getDocs(marketsFB).then((res) => {
            let productos = res.docs.map(doc => {
                return { ...doc.data() }
            })
            setNuevosMarkets(productos)
            setComision(productos[0].value);
            setMarket(productos[0].label)

        })

    }, []);


    const renderizarDeveulta = () => {
        let marketsFB = collection(dataBase, "markets")

        getDocs(marketsFB).then((res) => {
            let productos = res.docs.map(doc => {
                return { ...doc.data() }
            })
            setNuevosMarkets(productos)

            if (market !== "TODOS") {
                setMarket(productos[0].label)
                setComision(productos[0].value)
            }
        })
    }

    const eliminar = async (markets) => {

        if (markets.length > 0) {

            try {
                await fetch('https://flask-price-calculator.onrender.com/remove_market', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(markets)
                });

                await renderizarDeveulta();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const editarValores = async (comisiones) => {

        if (comisiones) {

            try {
                await fetch('https://flask-price-calculator.onrender.com/update_comision', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comisiones)
                });

                await renderizarDeveulta();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }


    const agregarMarkets = (marketNuevo) => {

        fetch('https://flask-price-calculator.onrender.com/add_market', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marketNuevo)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                renderizarDeveulta()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

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
            const comisionMkp = nuevosMarkets.find((market) => market.label === mkp)
            setComision(comisionMkp.value)
        }
    }


    const findPriceTodosDescuento = (margen, itemSku, iva) => {
        const PreciosTDescuentos = []

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            nuevosMarkets.forEach(market => {
                const resultado = (productoEncontrado.costo) / (1 - market.value - 0.05 - ((margen / 100) / 0.65)) * iva;
                const precioT = (Math.floor(resultado / 100) * 100) - 1;

                const precioPromocionT = precioT / (1 - porcentaje)
                const precioTRedondeado = (Math.floor(precioPromocionT / 100) * 100)
                PreciosTDescuentos.push({ price: precioTRedondeado, name: market.label, priceD: precioT })
            });
        }
        if (porcentaje > 0) {
            return PreciosTDescuentos
        }
    }

    const findPriceTodos = (margen, itemSku, iva) => {
        const PreciosT = []

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            nuevosMarkets.forEach(market => {
                const resultado = (productoEncontrado.costo) / (1 - market.value - 0.05 - ((margen / 100) / 0.65)) * iva;
                const precioT = (Math.floor(resultado / 100) * 100) - 1;

                PreciosT.push({ name: market.label, price: precioT })

            });
        }
        return PreciosT
    }


    const findPrice = (margen, itemSku, iva) => {

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            const resultado = (productoEncontrado.costo) / (1 - comision - 0.05 - ((margen / 100) / 0.65)) * iva;
            const roundedPrice = (Math.floor(resultado / 100) * 100) - 1;
            return roundedPrice
        }
    }
    const findPriceDescuento = (margen, itemSku, iva) => {

        const productoEncontrado = productos.find((producto) => producto.sku === itemSku)
        if (productoEncontrado) {
            const resultado = (productoEncontrado.costo) / (1 - comision - 0.05 - ((margen / 100) / 0.65)) * iva;
            const roundedPrice = (Math.floor(resultado / 100) * 100) - 1;
            const precioPromocion = roundedPrice / (1 - porcentaje)
            if (porcentaje > 0) {
                return (Math.floor(precioPromocion / 100) * 100)
            }
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
        findPriceTodos,
        findPriceTodosDescuento,
        porcentaje,
        findPriceDescuento,
        agregarMarkets,
        nuevosMarkets,
        editarValores,
        eliminar,
        userLogeado,
        userName,
        users


    };

    return <FuncionesContext.Provider value={data}> {children} </FuncionesContext.Provider>
}

export default FuncionesContextProvider
