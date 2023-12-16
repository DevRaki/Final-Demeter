import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSaleContext } from '../Context/SaleContext';
import { useProduct } from '../Context/ProductContext.jsx';
import ReactPaginate from 'react-paginate';
import { AiOutlineEye, AiFillDelete } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import users from '../img/users.png';
import PaymentMethodModal from '../Components/PayModal.jsx';
import ReadSale from './ReadSale';
import { useUser } from '../Context/User.context.jsx';

function ViewSales() {
  const {
    fetchSales,
    Sales,
    paySale,
    getOne,
    Sale,
    selectAction,
    CancelDet,
    newDetails,
    clearDet,
  } = useSaleContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [idSale, setID] = useState();
  const [filterByState, setFilterByState] = useState(false);
  const salesPerPage = 6;
  const pagesVisited = pageNumber * salesPerPage;
  const { getDetailProduct2, getwholeProducts, AllProducts } = useProduct();
  const { user, getWaiters, toggleUserStatus } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const [productIdsList, setProductIdsList] = useState([]);
  const pageCount = Math.ceil(Sales.length / salesPerPage);
  let isCleared = false;

  useEffect(() => {
    fetchSales();
    getWaiters();
    getwholeProducts().then(console.log(AllProducts));

    newDetails.forEach((detail, index) => {
      getDetailProduct2(detail.Product_ID);

      // Verificar si ya se ejecutó clearDet
      if (!isCleared) {
        clearDet();
        isCleared = true;
      }
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [helloModalOpen, setHelloModalOpen] = useState(false);

  const openHelloModal = () => {
    setHelloModalOpen(true);
  };

  const closeHelloModal = () => {
    setHelloModalOpen(false);
  };

  const getUserById = (userId) => {
    const foundUser = Object.values(user).find((u) => u.ID_User === userId);
    return foundUser || {};
  };

  const handleCheckboxChange = () => {
    setFilterByState(!filterByState);
  };

  const displaySales = Sales.slice(pagesVisited, pagesVisited + salesPerPage).filter((sale) => {
    const userMatch = (sale.User_ID ?? '').toString().includes(searchTerm);
    const stateMatch = !filterByState || (filterByState && sale.StatePay);

    return userMatch && stateMatch;
  });

  const isSaleEditable = (sale) => sale.StatePay;

  return (
    <div>
      <section className="pc-container">
        <div className="pcoded-content">
          <div className="row">
            <div className="col-md-12 w-[150vh]">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de Ventas</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <Link to="/sales">
                        <button
                          type="button"
                          className="btn bg-red-500"
                          onClick={() => {
                            selectAction(1);
                          }}
                        >
                          Registrar Ventas
                        </button>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="search"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Buscador"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="filterByState"
                          checked={filterByState}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="filterByState"
                        >
                          Mostrar solo ventas Pendientes
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* ... (código anterior) ... */}
                  <div className="card-body table-border-style">
                    <div className="table-responsive">
                      <table className="table table-hover ">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>SubTotal</th>
                            <th>Mesero</th>
                            <th className="flex flex-row justify-center">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {displaySales.reverse().map((sale, index) => (
  <tr key={index}>
    <td>{sale.ID_Sale}</td>
    <td>{sale.StatePay ? 'Pendiente' : 'Pagado'}</td>
    <td>{sale.Total}</td>
    <td>{sale.Total}</td>
    <td>
      {sale.User_ID
        ? getUserById(sale.User_ID)?.Name_User || 'Venta Rapida'
        : 'Venta Rapida'}
    </td>
    <td className="flex flex-row justify-center space-x-[2vh]">
      {isSaleEditable(sale) ? (
        <Link to="/sales">
          <button
            type="button"
            className="btn btn-icon btn-primary"
            onClick={() => {
              getOne(sale.ID_Sale);
              selectAction(2);
            }}
          >
            <i>
              <BiEdit></BiEdit>
            </i>
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-icon btn-primary"
          disabled
        >
          <i>
            <BiEdit></BiEdit>
          </i>
        </button>
      )}
      <button
        type="button"
        className="btn btn-icon btn-secondary"
        onClick={() => {
          getOne(sale.ID_Sale).then(openHelloModal());
        }}
      >
        <i>
          <AiOutlineEye></AiOutlineEye>
        </i>
      </button>
      {/* Deshabilitar el botón si la venta está pagada */}
      <button
        type="button"
        className="btn btn-icon btn-success"
        onClick={() => {
          if (!sale.StatePay) {
            openModal();
            setID(sale.ID_Sale);
          }
        }}
        disabled={!sale.StatePay}
      >
        <i>
          <FaRegMoneyBillAlt></FaRegMoneyBillAlt>
        </i>
      </button>
    </td>
  </tr>
))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* ... (código posterior) ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {helloModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-96 rounded-lg shadow-lg">
            <ReadSale></ReadSale>
            <div className="modal-actions flex justify-center pb-4">
              <button
                type="button"
                className="btn bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={closeHelloModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      <PaymentMethodModal
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        id={idSale}
      />
    </div>
  );
}

export default ViewSales;
