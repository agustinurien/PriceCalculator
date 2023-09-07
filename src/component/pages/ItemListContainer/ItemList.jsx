import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import "./itemList.css"
import { FuncionesContext } from "../../../context/FuncioinesContext";




const ItemList = ({ productos, enviarPy, toggle }) => {
    const { findPrice, market } = useContext(FuncionesContext);

    const [contadores, setContadores] = useState({});
    const [productosSeleccionados, setProductosSeleccionados] = useState({});

    const [selectAll, setSelectAll] = useState(false);

    const productosxlsx = {}

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
        if (toggle === 1) {
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

                        return (

                            <div className="contenedorProducto" key={element.sku}>
                                <div className="contenedorCheck">
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
                                            <h3>${resultado}</h3>
                                        </div>

                                        <div className="details">
                                            <h2 className="titulo">{element.title}</h2>
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

            </section>
        </>
    )
}

export default ItemList
