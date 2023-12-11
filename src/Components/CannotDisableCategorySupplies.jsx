import React from 'react';
import '../css/style.css';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '300px',
  width: '400px',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  textAlign: 'center',
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyles = {
  marginTop: '80px',
  marginLeft: '38%',
};

function CannotDisableCategorySupplies({ onClose }) {
  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles}>
        <h1 className="text-3xl font-semibold">No se puede deshabilitar la categoría</h1>
        <p className="deleteText">Esta categoría no se puede deshabilitar porque tiene insumos asociados.</p>
        <div className="flex justify-between ">
          <button onClick={onClose} style={buttonStyles} className="btn btn-icon btn-primary"
            title="Este botón sirve para cerrar la ventana modal."
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CannotDisableCategorySupplies;