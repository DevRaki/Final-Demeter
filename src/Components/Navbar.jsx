import React, { useState, useEffect, useRef } from 'react';
import logo from '../img/logo.png'
import '../css/style.css'
import '../css/landing.css'
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar = () => {

    const [submenuComprasVisible, setSubmenuComprasVisible] = useState(false);
    const [submenuVentasVisible, setSubmenuVentasVisible] = useState(false);

    const navigate = useNavigate();

    const toggleSubmenuCompras = () => {
        setSubmenuComprasVisible(prevStateC => !prevStateC);

        setTimeout(() => setSubmenuComprasVisible(false), 5000);
    };

    const toggleSubmenuVentas = () => {
        setSubmenuVentasVisible(prevStateV => !prevStateV);

        setTimeout(() => setSubmenuVentasVisible(false), 5000);
    }

    return (
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <button
                        onClick={() => {
                            navigate('/');
                        }}
                        className="b-brand"
                    >
                        <img src={logo} alt="Demeter SOFT" className="logo logo-lg" width="130" height="60" />
                    </button>
                </div>
                <div className="navbar-content">
                    <ul className="pc-navbar">
                        <li className="pc-item pc-caption">
                            <label>MENÚ</label>
                        </li>
                        <li className="pc-item">
                            <button
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        <DashboardIcon />
                                    </i>
                                </span>
                                <span className="pc-mtext">
                                    Dashboard
                                </span>
                            </button>
                        </li>
                        <li className="pc-item pc-caption">
                            <span>Gestión de configuración</span>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <button
                                onClick={() => {
                                    navigate('/setting');
                                }}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        <SecurityIcon />
                                    </i>
                                </span>
                                <span className="pc-mtext">
                                    Configuración
                                </span>
                            </button>
                        </li>
                        <li className="pc-item pc-caption">
                            <span>Gestión de usuarios</span>
                        </li>
                        <li className="pc-item">
                            <button
                                onClick={() => {
                                    navigate('/user');
                                }}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        <PeopleIcon />
                                    </i>
                                </span>
                                <span className="pc-mtext">
                                    Empleados
                                </span>
                            </button>
                        </li>
                        <li className="pc-item pc-caption">
                            <span>Gestión de compras</span>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <button
                                onClick={toggleSubmenuCompras}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        <StoreIcon />
                                    </i>
                                </span>
                                <span className="pc-mtext">
                                    Gestión de compras
                                </span>
                                <span className="pc-arrow"> <ExpandMoreIcon /></span>
                            </button>
                            {submenuComprasVisible && (
                                <ul className="pc-submenu">
                                    <li
                                        className="pc-item"
                                    >
                                        <button
                                            onClick={() => {
                                                navigate('/category_supplies')
                                            }}
                                            className="pc-link"
                                        >
                                            Categria insumos
                                        </button>
                                    </li>
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/supplies')
                                            }}
                                            className="pc-link"
                                        >
                                            Insumos
                                        </button>
                                    </li>
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/supplier')
                                            }}
                                            className="pc-link"
                                        >
                                            Proveedores
                                        </button>
                                    </li>
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/shopping')
                                            }}
                                            className="pc-link"
                                        >
                                            Compras
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="pc-item pc-caption">
                            <span>Gestión de ventas</span>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <button
                                onClick={toggleSubmenuVentas}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        <ShoppingCartIcon />
                                    </i>
                                </span>
                                <span className="pc-mtext">
                                    Gestión de ventas
                                </span>
                                <span className="pc-arrow"> <ExpandMoreIcon /></span>
                            </button>
                            {submenuVentasVisible && (
                                <ul className="pc-submenu">
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/category_product')
                                            }}
                                            className="pc-link"
                                        >
                                            Categoria producto
                                        </button>
                                    </li>
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/product')
                                            }}
                                            className="pc-link"
                                        >
                                            Producto
                                        </button>
                                    </li>
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/waiter')
                                            }}
                                            className="pc-link"
                                        >
                                            Meseros
                                        </button>
                                    </li>
                                    <li
                                        className="pc-item">
                                        <button
                                            onClick={() => {
                                                navigate('/sale')
                                            }}
                                            className="pc-link"
                                        >
                                            Venta
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar