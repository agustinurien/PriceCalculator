import { useEffect, useState } from "react"


const DatosMarkets = () => {

    const [markets, setMarkets] = useState([])
    useEffect(() => {
        fetch('http://localhost:5001/marketPlaces')
            .then(res =>
                res.json())
            .then(data => {
                setMarkets(data)
            })
    }, [])
    return (
        <>
            {
                markets.map((marketObject, index) => {
                    const marketName = Object.keys(marketObject)[0];
                    const marketItems = marketObject[marketName];
                    return (
                        <div key={index}>
                            <h1>{marketName}</h1>
                            {marketItems.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    <h2>{item.title}</h2>
                                    <p>SKU: {item.sku}</p>
                                    <p>Precios: {Math.min(...item.precios)}</p>
                                </div>
                            ))}
                        </div>
                    );
                })
            }
        </>
    )
}

export default DatosMarkets
