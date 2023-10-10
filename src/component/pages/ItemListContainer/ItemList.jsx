import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import "./itemList.css"
import { FuncionesContext } from "../../../context/FuncioinesContext";
import { TextField } from "@mui/material";




const ItemList = ({ productos, enviarPy, toggle, enviarPyTodos, enviarPyD, enviarPyTodosD, toggleDescuento, descargarDescuento }) => {
    const {
        findPrice,
        market,
        aplicarDecuento,
        findPriceTodos,
        findPriceTodosDescuento,
        porcentaje,
        findPriceDescuento } = useContext(FuncionesContext);

    const [contadores, setContadores] = useState({});
    const [productosSeleccionados, setProductosSeleccionados] = useState({});

    const [selectAll, setSelectAll] = useState(false);

    const [value, setValue] = useState(0);

    const handleValue = (event) => {
        aplicarDecuento(event.target.value)
        setValue(event.target.value)
    };

    const productosxlsx = {}
    const productosxlsxTodos = []

    const recibirPrice = (price, sku, iva, brand, title, costo, category) => {
        if (!productosxlsx[market]) {
            productosxlsx[market] = []
        }
        const data = {
            sku,
            price,
            iva,
            brand,
            title,
            costo,
            category

        };
        productosxlsx[market].push(data)
    }

    const recibirPriceTodos = (precioXmarket, sku, iva, brand, title, costo, category) => {
        if (!productosxlsxTodos[market]) {
            productosxlsxTodos[market] = []
        }
        const dataTodos = {
            sku,
            iva,
            brand,
            title,
            costo,
            category,
            precioXmarket

        };
        productosxlsxTodos.push(dataTodos)
    }

    const productosxlsxD = {}
    const productosxlsxTodosD = []

    const recibirPriceDescuento = (descuento, producto, marca, sku, precio, precioD) => {
        if (!productosxlsxD[market]) {
            productosxlsxD[market] = []
        }
        const dataD = {
            descuento,
            producto,
            marca,
            sku,
            precio,
            precioD
        };
        productosxlsxD[market].push(dataD)
    }
    const recibirPriceTodosDescuento = (descuento, producto, marca, sku, precios) => {
        if (!productosxlsxTodosD[market]) {
            productosxlsxTodosD[market] = []
        }
        const dataTodosD = {
            descuento,
            producto,
            marca,
            sku,
            precios
        };
        productosxlsxTodosD.push(dataTodosD)
    }



    const sumar = (sku) => {
        setContadores((prevContadores) => ({
            ...prevContadores,
            [sku]: (prevContadores[sku] || 0) + 1
        }));
    };

    const restar = (sku) => {
        setContadores((prevContadores) => ({
            ...prevContadores,
            [sku]: (prevContadores[sku] || 0) - 1
        }));
    };

    const toggleSeleccion = (sku) => {
        setProductosSeleccionados((prevProductosSeleccionados) => ({
            ...prevProductosSeleccionados,
            [sku]: !prevProductosSeleccionados[sku],
        }));
    };

    const aplicarAccionMasiva = (accion) => {
        // Filtra los productos seleccionados y aplica la acción deseada
        const productosSeleccionadosSkus = Object.keys(productosSeleccionados).filter(
            (sku) => productosSeleccionados[sku]
        );

        productosSeleccionadosSkus.forEach((sku) => {
            if (accion === "sumar") {
                sumar(sku);
            } else if (accion === "restar") {
                restar(sku);
            }
        });
    };



    useEffect(() => {
        if (toggleDescuento === 1 && market !== "TODOS") {
            productos.forEach((element) => {
                const productoContador = contadores[element.sku] || 0;
                const resultado = findPrice(productoContador, element.sku, element.iva);
                const resultadoDescuento = findPriceDescuento(productoContador, element.sku, element.iva);
                recibirPriceDescuento(
                    value,
                    element.title,
                    element.brand,
                    element.sku,
                    resultado,
                    resultadoDescuento
                );
            });

            enviarPyD(productosxlsxD);

        }

        if (toggleDescuento === 1 && market === "TODOS") {
            productos.forEach((element) => {
                const productoContador = contadores[element.sku] || 0;
                const resultadoTodosDescuento = findPriceTodosDescuento(productoContador, element.sku, element.iva);

                recibirPriceTodosDescuento(
                    value,
                    element.title,
                    element.brand,
                    element.sku,
                    resultadoTodosDescuento
                );
            });

            enviarPyTodosD(productosxlsxTodosD);

        }
    }, [toggleDescuento])


    useEffect(() => {
        if (toggle === 1 && market !== "TODOS") {
            productos.forEach((element) => {
                const productoContador = contadores[element.sku] || 0;
                const resultado = findPrice(productoContador, element.sku, element.iva);
                recibirPrice(
                    resultado,
                    element.sku,
                    element.iva,
                    element.brand,
                    element.title,
                    element.costo,
                    element.category
                );
            });

            enviarPy(productosxlsx);
        }

        if (toggle === 1 && market === "TODOS") {
            productos.forEach((element) => {
                const productoContador = contadores[element.sku] || 0;
                const resultado = findPriceTodos(productoContador, element.sku, element.iva);

                recibirPriceTodos(
                    resultado,
                    element.sku,
                    element.iva,
                    element.brand,
                    element.title,
                    element.costo,
                    element.category

                );
            });

            enviarPyTodos(productosxlsxTodos);
        }
    }, [toggle])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedProductosSeleccionados = {};

        // Si selectAll es verdadero, selecciona todos los productos; de lo contrario, deselecciónalos.
        productos.forEach((element) => {
            updatedProductosSeleccionados[element.sku] = !selectAll;
        });

        setProductosSeleccionados(updatedProductosSeleccionados);
    };

    return (
        <>

            <section className="todosProductos">
                {productos.length > 0 && (
                    <div className="botonesMasivos">
                        <div className="sectorDescuento">
                            <TextField className="inputDescuento" label="Promocion" variant="filled" onChange={handleValue} />
                            <div className="botonesDescuento">
                                <button onClick={() => descargarDescuento()}>Descargar Promocion</button>
                            </div>
                        </div>
                        <div className="contenedorBotones">
                            <button className={selectAll ? "seleccionar" : "deseleccionar"} onClick={() => toggleSelectAll()}>
                                {selectAll ? "Deseleccionar Todos" : "Seleccionar Todos"}
                            </button>
                            <div className="sumaryrestar">
                                <button onClick={() => aplicarAccionMasiva("sumar")}>Sumar Seleccionados</button>
                                <button onClick={() => aplicarAccionMasiva("restar")}>Restar Seleccionados</button>
                            </div>
                        </div>
                    </div>
                )}

                {
                    productos.map((element) => {
                        const productoContador = contadores[element.sku] || 0;
                        const resultado = findPrice(productoContador, element.sku, element.iva);
                        const resultadoDescuento = findPriceDescuento(productoContador, element.sku, element.iva);

                        const resultadoTodos = findPriceTodos(productoContador, element.sku, element.iva);
                        const resultadoTodosDescuento = findPriceTodosDescuento(productoContador, element.sku, element.iva);

                        return (
                            <div className="contenedorProducto" key={element.sku}>
                                <div className="contenedorCheck">
                                    <h2 className="titulo">{element.title}</h2>
                                    <input
                                        type="checkbox"
                                        checked={productosSeleccionados[element.sku] || false}
                                        onChange={() => toggleSeleccion(element.sku)}
                                        className="check"
                                    />
                                </div>

                                <div >
                                    <div className="price">
                                        <div className="precio">
                                            <div className="precioTD">
                                                {
                                                    porcentaje > 0 && market === "TODOS" && (
                                                        resultadoTodosDescuento.map((element, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <h4 className="preciosColorTD">${element.price}</h4>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                }
                                            </div>

                                            <div>
                                                {
                                                    porcentaje > 0 && market !== "TODOS" && (
                                                        <h4 className="preciosColorTD">${resultadoDescuento}</h4>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                {
                                                    market !== "TODOS" && (
                                                        <h3>${resultado}</h3>
                                                    )
                                                }
                                            </div>


                                            <div className="precioT">
                                                {
                                                    market === "TODOS" && (
                                                        resultadoTodos.map((element, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <h3>${element.price}</h3>
                                                                    <h5>{element.name}</h5>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className="details">
                                            <h2>{element.sku}</h2>
                                            <h2>{element.brand}</h2>
                                            <h2>{element.category}</h2>
                                            <h2>{element.costo}</h2>

                                        </div>

                                        <div className="sumar">
                                            <h2>% {productoContador}</h2>
                                            <div>
                                                <button onClick={() => sumar(element.sku)}> <ArrowDropUp /> </button>
                                                <button onClick={() => restar(element.sku)}> <ArrowDropDown /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

            </section >
        </>
    )
}

export default ItemList
