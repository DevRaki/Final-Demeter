import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css'
import '../css/landing.css'
// import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
// import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ConstructionIcon from '@mui/icons-material/Construction';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUser } from '../Context/User.context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { isAuthenticated, logout } = useUser()
    const dropdownRef = useRef();
	const navigate = useNavigate();

	const toggleDropdown = () => {
		setShowDropdown(prevState => !prevState)

		setTimeout(() => setShowDropdown(false), 3000);
	};

	

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		if (showDropdown) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showDropdown]);

	return (
		<header className="pc-header">
			<div className="mr-auto pc-mob-drp">
				<ul className="list-unstyled">
					<li className="dropdown pc-h-item">
						<h3 title='Nombre del sistema.'>DEMETER</h3>
					</li>
				</ul>
			</div>
			<div className="ml-auto">
				<ul className="list-unstyled">
					<li className="dropdown pc-h-item">
						<button
							className="p-2 dropdown-toggle arrow-none mr-0"
							onClick={() => {
								navigate('/edit_profile');
							}}
							title='Dirigirse a la sesion para actualizar informacion del usuario logueado en el sistema.'
						>
							<i className="material-icons-two-tone">
								<ConstructionIcon />
							</i>
						</button>
						<button
							className="p-2 dropdown-toggle arrow-none mr-0"
							onClick={() => {
								navigate('/alert');
							}}
							title='Dirigirse a la sesion de notificaciones del sistema.'
						>
							<i className="material-icons-two-tone">
								<NotificationsIcon />
							</i>
						</button>
						<button
							className="pc-head-link dropdown-toggle arrow-none mr-0"
							role="button"
							aria-haspopup="false"
							aria-expanded="false"
							onClick={toggleDropdown}
							// ref={dropdownRef}
							title='Desplegar el submenu para cerrar sesion del sistema o ver los manuales de uso de cada modulo.'
						>
							<span>
								<span className="user-name">Samuel Rios A.</span>
								<span className="user-desc">Administrator</span>
							</span>
						</button>
						{showDropdown && (
							<ul className="dropdown-menu dropdown-menu-right pc-h-dropdown flex-column">
								{/* <li className="dropdown-item">
									<button
										onClick={() => {
											navigate('/');
										}}
									>
										<i className="material-icons-two-tone">
											<ChromeReaderModeIcon />
										</i>
										<span>Editar perfil</span>
									</button>
								</li>
								<li className="dropdown-item">
									<button
										onClick={() => {
											navigate('/');
										}}
									>
										<i className="material-icons-two-tone">
											<LockIcon />
										</i>
										<span>Cambio contraseña</span>
									</button>
								</li> */}
								<li className="dropdown-item">
									<button
										onClick={() => {
											navigate('/instructions');
										}}
										title='Manuales de ayuda para cada modulo disponible del sistema.'
									>
										<i className="material-icons-two-tone">
											<AutoStoriesIcon />
										</i>
										<span>Manuales</span>
									</button>
								</li>
								<li className="dropdown-item">
									<button
										onClick={() => {
											logout();
										}}
										title='Cerrar la sesion del usuario logueado en el sistema.'
									>
										<i className="material-icons-two-tone">
											<ExitToAppIcon />
										</i>
										<span>Cerrar sesion</span>
									</button>
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;