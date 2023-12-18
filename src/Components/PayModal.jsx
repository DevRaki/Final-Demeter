import React, { useState } from 'react';
import ReactModal from 'react-modal'; 
import './PayModal.css'; 
import { useSaleContext } from '../Context/SaleContext';
import axios from 'axios';

ReactModal.setAppElement('#root'); 

function PaymentMethodModal({ isOpen, onRequestClose, onSelectPaymentMethod, id }) {
  const { paySale, fetchSales } = useSaleContext();
  const [closing, setClosing] = useState(false);

  const handlePayment = async (paymentMethod) => {
    
    paySale(id, paymentMethod).then(fetchSales());

    
    setClosing(true);

    // Esperar 1 segundo antes de cerrar el modal
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Cerrar el modal
    onRequestClose();
  };

  return (
    <ReactModal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="payment-modal"
      overlayClassName="payment-modal-overlay"
    >
      <h2>Selecciona el método de pago</h2> 
      <div className="payment-options">
        <button onClick={() => handlePayment("QR")}>QR</button>
        <button onClick={() => handlePayment("Tarjeta")}>Tarjeta</button>
        <button onClick={() => handlePayment("Efectivo")}>Efectivo</button>
      </div>
      
      {closing && (
        <div className="closing-message">
          Realizando operaciones, por favor espere...
        </div>
      )}
    </ReactModal>
  );
}

export default PaymentMethodModal;
