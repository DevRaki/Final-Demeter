import React from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import '../css/style.css'
import '../css/landing.css'

function Login() {
  return (
    <div className="">
         <div className="auth-wrapper">
	<div className="auth-content">
		<div className="card">
			<div className="row align-items-center text-center">
				<div className="col-md-12">
					<div className="card-body">
						<img src={logo} alt="" className="img-fluid mb-4"/>
						<div className="input-group mb-3">
							<span className="input-group-text"><i data-feather="mail"><AiOutlineMail/></i></span>
							<input type="email" className="form-control" placeholder="Correo electrónico *"/>
						</div>
						<div className="input-group mb-4">
							<span className="input-group-text"><i data-feather="lock"><AiOutlineLock/></i></span>
							<input type="password" className="form-control" placeholder="Contraseña *"/>
						</div>
						<button className="btn btn-block btn-primary mb-4" onclick="location.href='index.html'">Iniciar sesión</button>
						<p className="mb-0 text-muted">¿Desea restablecer la contrase&ntilde;a? <a href="#" className="f-w-400">Recuperar</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


    </div>
   
  )
}

export default Login