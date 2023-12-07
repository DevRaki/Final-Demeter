import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import '../css/style.css'
import ConfirmShop from './confirmShop';
import CancelShop from './CancelShop';
import { useSupplier } from '../Context/Supplier.context';
import { useUser } from '../Context/User.context';
import Select from 'react-select';


function ShoppingBill({ total = 0, ...confirmValues }) {
  const { register, handleSubmit } = useForm();
  // const {isAuthenticated, getUser} = useUser()
  // const [currentUser, setCurrentUser] = useState({ Name_User: '' });
  

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       if (isAuthenticated) {
  //         const user = await getUser();
  //         console.log('Usuario obtenido:', user);
  //         setCurrentUser(user);
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener el usuario:', error);
  //     }
  //   }
  //   fetchUser();
  // }, [isAuthenticated, getUser]);



  const { getSupplier } = useSupplier()




  const [supplierState, setSupplierState] = useState([{
    Name_Supplier: "",
    ID_Supplier: "",
    Name_Business: "",
  }])
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  
    useEffect(() => {
      return async () => {
        const newSupplier = await Promise.resolve(getSupplier())
        setSupplierState(newSupplier)
      }
      // console.log(getSupplies())
    }, [])

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '177px',
      minHeight: '30px',
      fontSize: '14px',
      borderColor: state.isFocused ? '#FFA500' : 'black',
      boxShadow: state.isFocused ? '0 0 0 1px #FFA500' : 'none',
     "&:focus-within": {
      borderColor: '#FFA500',
      }
    }),
  };

  //para enviar los datos con useform
  const onSubmit = handleSubmit(data => {
    console.log(data)
  })
  //se utilizará para actualizar la fecha cada segundo o en intervalos regulares, llamando ka función tick  
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  //La fecha se muestra dinámicamente en el componente usando currenteDate
  const tick = () => {
    setCurrentDate(new Date());
  };

  const handleChange = (value, name) => {
    setSelectedSupplier(value);
  };

  const options = supplierState.map(({ ID_Supplier, Name_Supplier, Name_Business }) => ({
    value: ID_Supplier,
    label: Name_Supplier,
  }));





  return (

    <div className="facture flex justify-between gap-20 w-full h-full ">
      <form className="w-full max-w-xs p-6" onSubmit={onSubmit}>
        <div className="text-center">
        <h2>Factura</h2>
          <h5 className='mt-3'>{currentDate.toLocaleDateString()}</h5>
          <h5>Usuario: </h5>
          <hr className="ml-2" />
        </div>
        <div className="flex mb-2 mr-2">
        <h5 className=' mt-2'>N. factura:</h5>
        <input className=" custom-input-facture   " type="number" {...register("Price_Supplier")} />

        </div>
        <div className="flex mt-3 mr-2">
          <h5 className=' mt-2'>Proveedor: </h5>
          <Select
            required
            className='ml-3'
            options={options}
            value={selectedSupplier}
            onChange={handleChange}
            placeholder=""
            styles={customStyles}
          />

        </div>
        <hr className='ml-2 mt-4' />
        <div>
          <h1 className='text-center mt-5'>$ {total}</h1>
          <p className='text-center mt-1'>Total</p>
        </div>

        <div className="mt-auto ">
          <hr className="ml-2 mt-4 " />
          <div className="flex justify-between pt-3">
            <ConfirmShop {...confirmValues} data={selectedSupplier} />
            <CancelShop />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShoppingBill