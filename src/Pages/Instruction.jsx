import React from 'react'
import { useNavigate } from 'react-router-dom';

function Instruction() {

    const navigate = useNavigate();
    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Manuales</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 px-5">
                                            <h4>Configuracion</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Empleados</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Categoria insumos</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Insumos</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Proveedores</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Compras</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Categoria productos</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Productos</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Meseros</h4>
                                            <button
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-5">
                                            <h4>Ventas</h4>
                                            <button
                                                onClick={() => {
                                                    window.location.href = 'https://app.tango.us/app/workflow/Demeter-SOFT--A-Step-by-Step-for-Sales-Management-c33a84b25ed14d45899ec7c34150351a';
                                                }}
                                                className="pc-link btn btn-outline-dark"
                                            >
                                                Manual
                                            </button>
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

export default Instruction;