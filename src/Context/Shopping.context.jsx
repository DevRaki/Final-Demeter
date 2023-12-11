import { createContext, useState, useContext } from 'react';
import  { CreateShopping,GetOneShopping, GetShopping,DisableShopping, UpdateShopping,GetShoppingDetail,GetShoppingDetails, CreateShoppingDetail,CreateManyDetails} from '../Api/Shopping.request.js'

export const ShoppingContext = createContext();

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("El useShopping debe usarse dentro de ShoppingProvider");
  }
  return context;
};

export const ShoppingProvider = ({ children }) => {
    const [shopping, setShopping] = useState([]);
    const [shoppingDetails, setShoppingDetails] = useState([]);
    const [newDetails, setnewDetails] = useState([]);
    const [total, setTotal] = useState([]);
    const [action, setAction] = useState([])

    const createShopping = async (data) => {
        try {
          const res = await CreateShopping({
            Total : total,
          });
          setShopping(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const getOneShopping = async (ID_Shopping) => {
        try {
          const res = await GetOneShopping(ID_Shopping);
          setShopping(res.data);
        } catch (error) {
          console.log(error);
        }
      };


      const getShoppingList = async () => {
        try {
          const res = await GetShopping();
          setShopping(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const disableShopping = async (id) => {
        try {
          const res = await DisableShopping(id);
    
          if (res.status === 200) {
            setShopping((prevShopping) =>
            prevShopping.map((data) =>
                data.ID_Shoppingr === id
                  ? { ...data, State: !data.State }
                  : data
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

      //detalles de compras

      const createShoppingDetail = async (data) => {
        try {
          const res = await CreateShoppingDetail(data);
          setnewDetails([])
          console.log(newDetails)
        } catch (error) {
          console.log(error);
        }
      };

      const createManyDetails = async (data) => {
        try {
            const res = await CreateManyDetails(data);
            setnewDetails([])
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

      const CancelDet = async () => {
        try {
            setnewDetails([])
            console.log(newDetails)
        } catch (error) {
            console.log(error)
        }}

      const getShoppingDetail = async (id) => {
        try {
          const res = await GetShoppingDetail(id);
          setShoppingDetails(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const getShoppingDetailsList = async () => {
        try {
          const res = await GetShoppingDetails();
          setShoppingDetails(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchGain = async (totalMoney) =>{
        setTotal(totalMoney)
    }

    const Count = async (data) => {
        try {
            
            const res = await UpdateShopping(data);
        } catch (error) {
            console.log("no funciona el actualizar")
        }
    }

    const addnewDetail = (detail) => {
       
        setnewDetails((prevList) => [...prevList, detail]);
      };

    const selectAction = (act) => {
        setAction(act)
    }

    return (
        <ShoppingContext.Provider
          value={{
            shopping,
            shoppingDetails,
            newDetails,
            total,
            action,
            createShopping,
            getOneShopping,
            getShoppingList,
            disableShopping,
            createShoppingDetail,
            createManyDetails,
            CancelDet,
            getShoppingDetail,
            getShoppingDetailsList,
            fetchGain,
            Count,
            addnewDetail,
            selectAction,
          }}
        >
          {children}
        </ShoppingContext.Provider>
      );
 };