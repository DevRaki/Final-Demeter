import React, { useState, useEffect } from 'react';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import '../css/style.css'
import '../css/landing.css'

import { useUser } from '../Context/User.context.jsx';
import CreateWaiter from '../Components/CreateWaiter.jsx';

function WaiterPage() {
    const { user, getWaiters, toggleUserStatus } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getWaiters();
    }, []);

    const navigateToCreateWaiter = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getWaiters();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredWaiters = user.filter((waiter) => {
        const { Type_Document, Document, Name_User, LastName_User, Restaurant, State } = waiter;
        const searchString = `${Type_Document} ${Document} ${Name_User} ${LastName_User} ${Restaurant} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });
    
    const barraClass = user.State ? "" : "desactivado";

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización de meseros</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={navigateToCreateWaiter}
                                            >
                                                Registrar
                                            </button>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="search" className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Buscador"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}

                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Tipo de documento</th>
                                                        <th className="text-center">N° documento</th>
                                                        <th className="text-center">Nombre</th>
                                                        <th className="text-center">Apellido</th>
                                                        <th className="text-center">Restaurante</th>
                                                        <th className="text-center">Estado</th>
                                                        <th className="text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredWaiters.map((waiter) => (
                                                        <tr key={waiter.ID_User}>
                                                            <td>{waiter.Type_Document}</td>
                                                            <td>{waiter.Document}</td>
                                                            <td>{waiter.Name_User}</td>
                                                            <td>{waiter.LastName_User}</td>
                                                            <td>{waiter.Restaurant}</td>
                                                            <td className={`${barraClass}`}>
                                                                {waiter.State ? "Habilitado" : "Deshabilitado"}
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className={`btn btn-icon btn-success ${barraClass}`}
                                                                        onClick={() => toggleUserStatus(waiter.ID_User)}
                                                                    >
                                                                        {waiter.State ? (
                                                                            <MdToggleOn className={`estado-icon active ${barraClass}`} />
                                                                        ) : (
                                                                            <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {isModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                                                    <div className="modal-container">
                                                        <CreateWaiter onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WaiterPage