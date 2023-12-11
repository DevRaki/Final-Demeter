import React, { useState, useEffect } from 'react';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import '../css/style.css'
import '../css/landing.css'

import { useRole } from '../Context/Role.context.jsx';
import CreateRole from '../Components/CreateRole.jsx';

function RolePage() {
    const { role, getRoles, toggleRoleStatus } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getRoles();
    }, []);

    const navigateToCreateRole = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getRoles();
    };

    const barraClass = role.State ? "" : "desactivado";

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización de roles</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={navigateToCreateRole}
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Nombre</th>
                                                        <th className="text-center">Permisos</th>
                                                        <th className="text-center">Estado</th>
                                                        <th className="text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {role.map((rol) => (
                                                        <tr key={rol.ID_Role}>
                                                            <td>{rol.Name_Role}</td>
                                                            <td>Van los nombres de los modulos a los que el rol tiene acceso</td>
                                                            <td className={`${barraClass}`}>
                                                                {rol.State ? "Habilitado" : "Deshabilitado"}
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {rol.ID_Role !== 1 ? (
                                                                        <button
                                                                            type="button"
                                                                            className={`btn btn-icon btn-success ${barraClass}`}
                                                                            onClick={() => toggleRoleStatus(rol.ID_Role)}
                                                                        >
                                                                            {rol.State ? (
                                                                                <MdToggleOn className={`estado-icon active ${barraClass}`} />
                                                                            ) : (
                                                                                <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                                                                            )}
                                                                        </button>

                                                                    ) : (
                                                                        "No hay acciones"
                                                                    )}
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
                                                        <CreateRole onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
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

export default RolePage