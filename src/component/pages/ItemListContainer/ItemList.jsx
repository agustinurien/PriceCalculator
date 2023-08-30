import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import { useContext, useState } from "react"
import "./itemList.css"
import { FuncionesContext } from "../../../context/FuncioinesContext";




const ItemList = ({ productos, enviarPy }) => {
    const { findPrice } = useContext(FuncionesContext);

    const [contadores, setContadores] = useState({});

    const productosXl = []

    const recibirPrice = (price, sku, iva, brand, title, costo, category) => {
        const data = {
            price,
            sku,
            iva,
            brand,
            title,
            costo,
            category
        };
        productosXl.push(data)
        if (productosXl.length === productos.length) {
            enviarPy(productosXl)
        }
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

    return (
        <section className="todosProductos">
            {
                productos.map((element) => {
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
                    )

                    return (
                        <div className="contenedorProducto" key={element.sku}>
                            <div>
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
    )
}

export default ItemList
