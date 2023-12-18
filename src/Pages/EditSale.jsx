import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSaleContext } from '../Context/SaleContext';
import { useProduct } from '../Context/ProductContext';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';

function Edit_Bill() {
    const ITEMS_PER_PAGE = 5;

    const { Create, Sale, getDetailsSale, details, Count, fetchGain, total, newDetails, Sales, createManyDetails, setNewCost } = useSaleContext();
    const { getwholeProducts, AllProducts } = useProduct();
    const [newSaleID, setNewSaleID] = useState();
    const [salemss, Setsalemss] = useState();
    const forceUpdate = useForceUpdate();
    const [currentPage, setCurrentPage] = useState(1);

    const CreateSale = () => {
        if (newDetails.length > 0) {
            createManyDetails(newDetails);
            Count({
                ID_Sale: Sale.ID_Sale,
                Total: total,
                SubTotal: total
            });
            fetchGain(0);
            Setsalemss("Generado correctamente");

            // Agregar un retraso de 2 segundos antes de actualizar la orden
            setTimeout(() => {
                // Actualizar la orden después del retraso
                // Puedes poner aquí cualquier lógica adicional que desees ejecutar después del retraso
            }, 2000);
        } else {
            Setsalemss("No puedes Generar");
        }
    };

    useEffect(() => {
        getDetailsSale(Sale.ID_Sale);
    }, [Sale, newDetails]);

    useEffect(() => {
        getwholeProducts();
    }, []);

    useEffect(() => {
        if (Sales.length > 0) {
            setNewSaleID(Sale.ID_Sale);
        } else {
            setNewSaleID(1);
        }
        const subtotal = newDetails.reduce((acc, item) => {
            const product = AllProducts.find(product => product.ID_Product === item.Product_ID);
            return acc + (product.Price_Product * item.Lot);
        }, 0);
        const subtotal2 = details.reduce((acc, item) => {
            const product = AllProducts.find(product => product.ID_Product === item.Product_ID);
            return acc + (product.Price_Product * item.Lot);
        }, 0);
        fetchGain(subtotal + subtotal2);
    }, [newDetails, details]);

    const decreaseLot = (index) => {
        if (newDetails[index].Lot > 0) {
            newDetails[index].Lot -= 1;
            forceUpdate();
            updateTotal();
        }
    }

    const increaseLot = (index) => {
        newDetails[index].Lot += 1;
        forceUpdate();
        updateTotal();
    }

    const updateTotal = () => {
        const newTotal = newDetails.reduce((acc, item) => {
            const product = AllProducts.find(product => product.ID_Product === item.Product_ID);
            return acc + (product.Price_Product * item.Lot);
        }, 0);
        fetchGain(newTotal);
    }

    const startDetailIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endDetailIndex = startDetailIndex + ITEMS_PER_PAGE;
    const startNewDetailIndex = (currentPage - 1) * ITEMS_PER_PAGE - details.length;
    const endNewDetailIndex = startNewDetailIndex + ITEMS_PER_PAGE;

    return (
        <div className="relative text-center h-full w-full flex flex-col mt-[3vh] items-center">
            <form className="mt-4">
                <h2 className="text-xl font-bold mb-2">Orden {Sale.ID_Sale}</h2>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-600">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full p-2 border rounded-xl"
                        defaultValue={new Date().toISOString().substr(0, 10)}
                    />
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-xl">
                        <thead>
                            <tr>
                                <th className="">Producto</th>
                                <th className="p-1">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.slice(startDetailIndex, endDetailIndex).map((item, index) => (
                                <tr key={index}>
                                    <td className="p-1">
                                        {AllProducts.find(product => product.ID_Product === item.Product_ID).Name_Products}
                                    </td>
                                    <td className="flex flex-row items-center p-1 ml-[1vh]">
                                        <div className="lot-button cursor-pointer" onClick={() => decreaseLot(index)}>
                                            <AiOutlineMinus />
                                        </div>
                                        {item.Lot}
                                        <div className="lot-button cursor-pointer" onClick={() => increaseLot(index)}>
                                            <IoIosAdd />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {newDetails.slice(startNewDetailIndex, endNewDetailIndex).map((item, index) => (
                                <tr key={index}>
                                    <td className="p-1">
                                        {AllProducts.find(product => product.ID_Product === item.Product_ID).Name_Products}
                                    </td>
                                    <td className="flex flex-row items-center p-1 ml-[1vh]">
                                        <div className="lot-button cursor-pointer" onClick={() => decreaseLot(index)}>
                                            <AiOutlineMinus />
                                        </div>
                                        {item.Lot}
                                        <div className="lot-button cursor-pointer" onClick={() => increaseLot(index)}>
                                            <IoIosAdd />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4">
                    <p>SubTotal: {(total)} Total: {total}</p>
                </div>
            </form>
            <Link to='/sale'>
                <button
                    className="bg-orange-500 text-white py-2 px-4 rounded"
                    onClick={CreateSale}
                >
                    Actualizar orden
                </button>
            </Link>
            <div>{salemss}</div>

            {/* Pagination controls */}
            <div className="pagination mt-4">
                {Array.from({ length: Math.ceil((details.length + newDetails.length) / ITEMS_PER_PAGE) }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = () => {
        setTick((tick) => tick + 1);
    };
    return update;
}

export default Edit_Bill;
