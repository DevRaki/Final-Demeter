import React, { useState, useEffect } from 'react';
import { useSaleContext } from '../Context/SaleContext';
import { useProduct } from '../Context/ProductContext';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';
import { useUser } from "../Context/User.context.jsx";
import ReactPaginate from 'react-paginate';

function ReadSale() {
    const { Create, Sale, getDetailsSale, details, Count, fetchGain, total } = useSaleContext();
    const { getwholeProducts, AllProducts } = useProduct();
    const { user, toggleUserStatus } = useUser();
    const [pageNumber, setPageNumber] = useState(0);
    const salesPerPage = 6;

    useEffect(() => {
        getwholeProducts().then(console.log(AllProducts));
    }, []);

    useEffect(() => {
        getDetailsSale(Sale.ID_Sale);
    }, [Sale]);

    useEffect(() => {
        const subtotal = details.reduce((acc, item) => {
            const product = AllProducts.find(product => product.ID_Product === item.Product_ID);
            return acc + (product.Price_Product * item.Lot);

        }, 0);
        fetchGain(subtotal)
    }, [details, AllProducts]);

    const getUserById = (userId) => {
        return user.find(user => user.ID_User === userId);
    };

    const pageCount = Math.ceil(details.length / salesPerPage);
    const pagesVisited = pageNumber * salesPerPage;

    const displayDetails = details.slice(pagesVisited, pagesVisited + salesPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="relative text-center h-full w-full flex flex-col justify-center items-center">

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
                <div className="mb-4">
                    <p>Mesero : {Sale.User_ID ? getUserById(Sale.User_ID)?.Name_User : 'Venta Rapida'}</p>
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
                            {displayDetails.map((item, index) => (
                                <tr key={index}>
                                    <td className="p-1">
                                        {AllProducts.find(product => product.ID_Product === item.Product_ID).Name_Products}
                                    </td>
                                    <td className="flex flex-row items-center justify-center p-1 ml-[1vh]">
                                        <div>
                                            {item.Lot}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-4">
                    <p>SubTotal: {total} Total: {total}</p>
                </div>
            </form>

            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination space-x-2 mt-4'}
                previousLinkClassName={'text-gray-600 rounded-full p-2'}
                nextLinkClassName={'text-gray-600 rounded-full p-2'}
                disabledClassName={'text-gray-300 cursor-not-allowed'}
                activeClassName={'bg-red-500 text-white rounded-full pl-2 pr-2'}
            />

        </div>
    );
}

export default ReadSale;
