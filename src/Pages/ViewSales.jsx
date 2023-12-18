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

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

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
  const { getDetailProduct2, getwholeProducts, AllProducts } = useProduct();
  const { user, getWaiters2, toggleUserStatus } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helloModalOpen, setHelloModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  function formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openHelloModal = () => {
    setHelloModalOpen(true);
  };

  const closeHelloModal = () => {
    setHelloModalOpen(false);
  };

  const openPaymentModal = (saleId) => {
    setIsPaymentModalOpen(true);
    setID(saleId);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    fetchSales();
  };

  useEffect(() => {
    fetchSales();
    getWaiters2();
    getwholeProducts();

    // Verificar si ya se ejecutó clearDet
    clearDet();
  }, [filterByState]);

  const pageCount = Math.ceil(Sales.length / salesPerPage);

  const getUserById = (userId) => {
    const foundUser = Object.values(user).find((u) => u.ID_User === userId);
    return foundUser || {};
  };

  const handleCheckboxChange = () => {
    setFilterByState(!filterByState);
    setPageNumber(0); // Reiniciar a la primera página al cambiar el filtro
    fetchSales(); // Obtener la lista de ventas actualizada
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(0); // Reiniciar a la primera página al realizar la búsqueda
  };

  const displaySales = Sales
  .slice(0)
  .reverse()
  .filter((sale) => {
    const saleDetails = `${sale.ID_Sale} ${formatDate(sale.createdAt)} ${formatNumberWithCommas(sale.Total)} ${formatNumberWithCommas(sale.SubTotal)} ${getUserById(sale.User_ID)?.Name_User || 'Venta Rapida'} ${sale.StatePay ? 'Pendiente' : 'Pagado'}`.toLowerCase();
    return (
      saleDetails.includes(searchTerm.toLowerCase()) &&
      (!filterByState || (filterByState && sale.StatePay))
    );
  })
  .slice(pageNumber * salesPerPage, (pageNumber + 1) * salesPerPage);

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
                      <form onSubmit={handleSearch}>
                        <div className="form-group">
                          <input
                            type="search"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Buscador"
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setPageNumber(0); // Reiniciar a la primera página al cambiar el término de búsqueda
                            }}
                          />
                        </div>
                      </form>
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
                  <div className="card-body table-border-style">
                    <div className="table-responsive">
                      <table className="table table-hover ">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>SubTotal</th>
                            <th>Mesero</th>
                            <th>Estado</th>
                            <th className="flex flex-row justify-center">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {displaySales.map((sale, index) => (
                            <tr key={index}>
                              <td>{formatNumberWithCommas(sale.ID_Sale)}</td>
                              <td>{formatDate(sale.createdAt)}</td>
                              <td>{formatNumberWithCommas(sale.Total)}</td>
                              <td>{formatNumberWithCommas(sale.SubTotal)}</td>
                              <td>
                                {sale.User_ID
                                  ? getUserById(sale.User_ID)?.Name_User ||
                                    'Venta Rapida'
                                  : 'Venta Rapida'}
                              </td>
                              <td>{sale.StatePay ? 'Pendiente' : 'Pagado'}</td>
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
                                <button
                                  type="button"
                                  className="btn btn-icon btn-success"
                                  onClick={() => openPaymentModal(sale.ID_Sale)}
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
                  <div className="ml-[50vh]">
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination space-x-2 mt-4'}
                      previousLinkClassName={'text-gray-600 rounded-full p-2'}
                      nextLinkClassName={'text-gray-600 rounded-full p-2'}
                      disabledClassName={'text-gray-300 cursor-not-allowed'}
                      activeClassName={
                        'bg-red-500 text-white rounded-full pl-2 pr-2'
                      }
                    />
                  </div>
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
        isOpen={isPaymentModalOpen}
        onRequestClose={() => closePaymentModal()}
        id={idSale}
      />
    </div>
  );
}

export default ViewSales;
