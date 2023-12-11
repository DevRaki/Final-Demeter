import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import "../css/style.css";
import "../css/landing.css";

import { useRole } from "../Context/Role.context";
import { useUser } from "../Context/User.context.jsx";
import CreateUser from "../Components/CreateUser";
import EditUser from '../Components/EditUser';
import DeleteUser from "../Components/DeleteUser";

function UserPage() {
    const { user, getUsers, toggleUserStatus, deleteUser } = useUser()
    const { role } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    const navigateToCreateUser = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getUsers();
    };

    const handleEdit = (user) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete.ID_User);
            setUserToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const cancelDelete = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = user.filter((user) => {
        const { Type_Document, Document, Name_User, LastName_User, Email, State } = user;
        const searchString = `${Type_Document} ${Document} ${Name_User} ${LastName_User} ${Email} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const roles = role.find(
        (rol) => rol.ID_Role === user.Role_ID
    );

    const barraClass = user.State ? "" : "desactivado";

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización de empleados</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={navigateToCreateUser}
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
                                                        <th className="text-center">Email</th>
                                                        <th className="text-center">Rol</th>
                                                        <th className="text-center">Estado</th>
                                                        <th className="text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUsers.map((user) => (
                                                        <tr key={user.ID_User}>
                                                            <td>{user.Type_Document}</td>
                                                            <td>{user.Document}</td>
                                                            <td>{user.Name_User}</td>
                                                            <td>{user.LastName_User}</td>
                                                            <td>{user.Email}</td>
                                                            <td>
                                                                {user.SuppliesCategory_ID
                                                                    ? role.find(
                                                                        (category) =>
                                                                            category.ID_SuppliesCategory ===
                                                                            user.SuppliesCategory_ID
                                                                    )?.Name_SuppliesCategory || ''
                                                                    : ''}
                                                                {roles && roles.Name_Role}
                                                            </td>
                                                            <td className={`${barraClass}`}>
                                                                {user.State ? "Habilitado" : "Deshabilitado"}
                                                            </td>
                                                            <td>
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <button
                                                                        onClick={() => handleEdit(user)}
                                                                        className={`btn btn-icon btn-primary ${!user.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                                                        disabled={!user.State}
                                                                    >
                                                                        <BiEdit />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(user)}
                                                                        className={`btn btn-icon btn-danger ${!user.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                                                        disabled={!user.State}
                                                                    >
                                                                        <AiFillDelete />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className={`btn btn-icon btn-success ${barraClass}`}
                                                                        onClick={() => toggleUserStatus(user.ID_User)}
                                                                    >
                                                                        {user.State ? (
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

                                            {isDeleteModalOpen && (
                                                <DeleteUser
                                                    onClose={cancelDelete}
                                                    onDelete={confirmDelete}
                                                />
                                            )}

                                            {isModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                                                    <div className="modal-container">
                                                        <CreateUser onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
                                                    </div>
                                                </div>
                                            )}

                                            {isEditModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
                                                    <div className="modal-container">
                                                        <EditUser onClose={() => setIsEditModalOpen(false)} userToEdit={userToEdit} />
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
        </section >
    )
}

export default UserPage
