import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSaleContext } from '../Context/SaleContext';
import { useProduct } from '../Context/ProductContext';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useUser } from '../Context/User.context.jsx';

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Bill() {
  const {
    Create,
    fetchGain,
    total,
    newDetails,
    Sales,
    setnewDetails,
    createManyDetails,
  } = useSaleContext();
  const { getwholeProducts, AllProducts } = useProduct();
  const { user, getWaiters } = useUser();
  const [newSaleID, setNewSaleID] = useState();
  const [salemss, Setsalemss] = useState();
  const [waiters, setWaiters] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getwholeProducts();
    getWaiters();
  }, []);

  useEffect(() => {
    const waiterOptions = user.map((userData) => (
      <option key={userData.ID_User} value={userData.ID_User}>
        {userData.Name_User} {userData.LastName_User}
      </option>
    ));
    waiterOptions.unshift(
      <option key="quickSale" value={null}>
        Venta rápida
      </option>
    );

    setWaiters(waiterOptions);
  }, [user]);

  useEffect(() => {
    if (Sales.length > 0) {
      setNewSaleID(Sales[Sales.length - 1].ID_Sale + 1);
    } else {
      setNewSaleID(1);
    }
    const subtotal = newDetails.reduce((acc, item) => {
      const product = AllProducts.find((product) => product.ID_Product === item.Product_ID);
      return acc + product.Price_Product * item.Lot;
    }, 0);
    fetchGain(subtotal);
  }, [newDetails, AllProducts, Sales]);

  const CreateSale = async () => {
    if (newDetails.length > 0) {
      try {
        setLoading(true); // Activar indicador de carga

        await Create(selectedWaiter);
        await createManyDetails(newDetails);

        Setsalemss("Generado correctamente");
        createManyDetails([]); // Limpiar la lista de detalles después de generar la orden
        // Redirigir a /sale usando navigate sin recarga de página
        navigate("/sale");
      } catch (error) {
        console.error("Error al generar la orden:", error);
        Setsalemss("Error al generar la orden");
      } finally {
        setLoading(false); // Desactivar indicador de carga, independientemente de si fue exitoso o no
      }
    } else {
      Setsalemss("No puedes Generar una venta vacía");
    }
  };

  const removeDetail = (index) => {
    const updatedDetails = [...newDetails];
    updatedDetails.splice(index, 1);
    setnewDetails(updatedDetails);
  };

  const decreaseLot = (index) => {
    if (newDetails[index].Lot > 1) {
      newDetails[index].Lot -= 1;
      forceUpdate();
      updateTotal();
    }
  };

  const increaseLot = (index) => {
    newDetails[index].Lot += 1;
    forceUpdate();
    updateTotal();
  };

  const updateTotal = () => {
    const newTotal = newDetails.reduce((acc, item) => {
      const product = AllProducts.find((product) => product.ID_Product === item.Product_ID);
      return acc + product.Price_Product * item.Lot;
    }, 0);
    fetchGain(newTotal);
  };

  const handleWaiterChange = (event) => {
    const selectedWaiterValue = event.target.value;
    setSelectedWaiter(selectedWaiterValue);
  };

  const forceUpdate = useForceUpdate();

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="relative text-center h-full w-full flex flex-col mt-[3vh] items-center">
      <form className="mt-4">
        <h2 className="text-xl font-bold mb-2">Orden {newSaleID}</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-600">
            Fecha:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full p-2 border rounded-xl"
            defaultValue={new Date().toISOString().substr(0, 10)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="waiter" className="block text-gray-600">
            Mesero:
          </label>
          <select
            id="waiter"
            name="waiter"
            className="w-full p-2 border rounded-xl"
            value={selectedWaiter}
            onChange={handleWaiterChange}
          >
            {waiters}
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr>
                <th className="">Producto</th>
                <th className="p-1">Cantidad</th>
                <th className="p-1">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {newDetails.slice(startIndex, endIndex).map((item, index) => (
                <tr key={index}>
                  <td className="p-1">
                    + {AllProducts.find((product) => product.ID_Product === item.Product_ID).Name_Products}
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
                  <td className="p-1 cursor-pointer" onClick={() => removeDetail(index)}>
                    X
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <p>
            SubTotal: {formatNumberWithCommas(total)} Total: {formatNumberWithCommas(total)}
          </p>
        </div>
      </form>

      {/* Paginación */}
      <div className="pagination mt-4">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={Math.ceil(newDetails.length / ITEMS_PER_PAGE)}
          onPageChange={handlePageClick}
          containerClassName={'pagination space-x-2 mt-4'}
          previousLinkClassName={'text-gray-600 rounded-full p-2'}
          nextLinkClassName={'text-gray-600 rounded-full p-2'}
          disabledClassName={'text-gray-300 cursor-not-allowed'}
          activeClassName={'bg-blue-500 text-white rounded-full pl-2 pr-2'}
        />
      </div>

      {/* Botones */}
      <div className="buttons flex-row space-x-[3vh]">
        <button
          className={`py-2 px-4 rounded ${
            newDetails.length === 0 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-orange-500 text-white'
          }`}
          onClick={CreateSale}
          disabled={newDetails.length === 0 || loading} // Desactiva el botón si newDetails está vacío o si está cargando
        >
          {loading ? 'Generando...' : 'Generar orden'}
        </button>

        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => navigate("/sale")}
        >
          Cancelar Venta
        </button>
      </div>
      <div>{salemss}</div>
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

export default Bill;
