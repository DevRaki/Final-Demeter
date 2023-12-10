import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingContext } from '../Context/Shopping.context';
import { useSupplier } from "../Context/Supplier.context";
import { useUser } from '../Context/User.context';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import ShoppingView from '../Components/ShoppingView';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import '../css/style.css';
import "../css/landing.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


function ShoppingPage() {
  const { getOneShopping, shopping: Shopping, selectAction, disableShopping, getShopingByProvider } = useShoppingContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { getCurrentUser } = useUser();
  const [currentUser, setCurrentUser] = useState({})
  const [shoppingData, setShoppingData] = useState([])
  const [showEnabledOnly, setShowEnabledOnly] = useState(false); // Estado para controlar la visibilidad


  useLayoutEffect(() => {
		return async () => {
		  const user = await getCurrentUser()
		  setCurrentUser(user)
		};
	  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShopingByProvider();
        setShoppingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getShopingByProvider]);

  const status = Shopping.State ? "" : "desactivado";

  //función para mostrar solo los inhabilitados

  const handleCheckboxChange = (event) => {
    setShowEnabledOnly(event.target.checked);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredShopping = shoppingData.filter((shoppingItem) => {
    const {
      ID_Shopping,
      Total,
      State,
      Supplier: { Name_Supplier },
    } = shoppingItem;
  
    const itemDate = new Date(shoppingItem.Datetime).toLocaleDateString('en-CA');
    const searchDate = new Date(searchTerm).toLocaleDateString('en-CA');
  
    if (showEnabledOnly) {
      // Filtrar por proveedores habilitados que coincidan con la búsqueda
      return (
        shoppingItem.State && // Verificar si el proveedor está habilitado
        (itemDate === searchDate.toLowerCase() || // Comparar fechas
        `${ID_Shopping} ${itemDate} ${Total} ${State} ${Name_Supplier} `
        .toLowerCase()
            .includes(searchTerm.toLowerCase())) // Comparar términos de búsqueda
      );
    }
  
    // Si showEnabledOnly no está marcado, mostrar todos los proveedores que coincidan con la búsqueda
    return (
      itemDate === searchDate.toLowerCase() ||
      `${ID_Shopping} ${itemDate} ${Total} ${State} ${Name_Supplier}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

const generatePDF = () => {
  const tableBody = shoppingData.map((shoppingItem) => {
    const {
      ID_Shopping,
      Datetime,
      Total,
      Invoice_Number,
      Supplier: { Name_Supplier },
    } = shoppingItem;

    return [
      { text: ID_Shopping, bold: true, alignment: 'center'  },
      { text: `${currentUser.Name_User} ${currentUser.LastName_User}`, alignment: 'center' }, // Agregar información del usuario
      { text: Invoice_Number  },
      { text: Name_Supplier, alignment: 'center' },
      { text: new Date(Datetime).toLocaleDateString() , alignment: 'center' },
      { text: Total, alignment: 'center'  },


    ];
  });

  const documentDefinition = {
    content: [
      { text: 'Reporte de compras', fontSize: 16, margin: [0, 10, 0, 10] }, // Margen superior ajustado
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', '*', 'auto', '*'], // Ajuste de anchos de columnas
          body: [
            [
              'ID',
              'Usuario',
              'N. factura',
              'Proveedor',
              'Fecha',
              'Total',
            ],
            ...tableBody,
          ],
        },
        layout: {
          defaultBorder: false, 
          fontSize: 12,
          fillColor: (rowIndex) => (rowIndex % 2 === 0 ? '#CCCCCC' : null),
          paddingTop: () => 5, 
          paddingBottom: () => 5, 
        },
      },
    ],
    styles: {
      table: {
        width: '100%',
        margin: [0, 10, 0, 15], 
      },
    },
  };
  
  pdfMake.createPdf(documentDefinition).download('shopping_report.pdf');
};



   

  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de compras</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <Link to="/shop">
                        <button type="button" className="btn btn-primary" onClick={() => { selectAction(1) }}>
                          Registrar compra
                        </button>
                      </Link>
                     
                         <button title='Presiona para generar el pdf ' className="btn btn-outline-secondary p-2 ml-1" onClick={generatePDF}>Generar Reporte </button>

                          
                      
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      

                        <input
                          type="search"
                          title='Presiona para buscar la compra'
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Buscador"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                 
                      <div className="form-check ml-4 mt-1" >
                        <input
                          type="checkbox"
                          title='Presiona para mostrar solo las compras habilitadas'
                          className="form-check-input"
                          id="showEnabledOnly"
                          checked={showEnabledOnly}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="showEnabledOnly">
                          Mostrar solo habilitados
                        </label>
                      </div>
                  

                  <div className="card-body table-border-style">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>N Factura</th>
                            <th>Proveedor</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredShopping.map((
                            {
                              ID_Shopping,
                              Invoice_Number,
                              Datetime,
                              Total,
                              State,
                              Supplier: {
                                Name_Supplier,
                                ID_Supplier
                              }
                            }
                          ) => (
                            <tr key={ID_Shopping}>
                              <td>{new Date(Datetime).toLocaleDateString()}</td>
                              <td>{`${currentUser.Name_User} ${currentUser.LastName_User}`}</td>
                              <td>{Invoice_Number}</td>
                              <td>{Name_Supplier}</td>
                              <td>{Total}</td>
                              <td className={`${status}`}>
                                {State ? "Habilitado" : "Deshabilitado"}
                              </td>

                              <td className="flex items-center" title='Presiona para ver el detalle de la compra'>
                                <ShoppingView id={ID_Supplier} date={Datetime} />

                                <button
                                  type="button"
                                  title='Presiona para inhabilitar o habilitar la compra'
                                  className={`btn  btn-icon btn-success ${status}`}
                                  onClick={() => disableShopping(ID_Shopping)}

                                >
                                  {State ? (
                                    <MdToggleOn className={`estado-icon active${status}`} />
                                  ) : (
                                    <MdToggleOff className={`estado-icon inactive${status}`} />

                                  )}
                                </button>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShoppingPage