import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

//Context
import { Role } from './Context/Role.context.jsx'
import { User } from './Context/User.context.jsx'
import { Supplier } from './Context/Supplier.context.jsx'
import { Supplies } from './Context/Supplies.context.jsx'
import { ShoppingProvider } from './Context/Shopping.context.jsx'
import { CategorySupplies } from './Context/CategorySupplies.context.jsx'
import { CategoryProducts } from './Context/CategoryProducts.context.jsx'
import { SaleProvider } from './Context/SaleContext.jsx'
import { DashboardProvider } from './Context/Dashboard.context.jsx'
import { Losses } from './Context/Losses.context.jsx'

// Pages
import UserPage from './Pages/UserPage.jsx'
import RolePage from './Pages/RolePage.jsx'
import SupplierPage from './Pages/SupplierPage.jsx'
import SuppliesPage from './Pages/SuppliesPage.jsx'
import SuppliesCategoryPage from './Pages/SuppliesCategoryPage.jsx'
import ProductCategoryPage from './Pages/ProductCategoryPage.jsx'
import WaiterPage from './Pages/WaiterPage.jsx'
import DashBoard from './Pages/Dashboard.jsx'

// Menu & Header
import Navbar from './Components/Navbar.jsx'
import Header from './components/Header.jsx'


function App() {
  return (
    <BrowserRouter>
      <Role>
        <User>
          <DashboardProvider>
            <CategorySupplies>
              <CategoryProducts>
                <Supplier>
                  <Supplies>
                  <Losses>
                    <ShoppingProvider>
                      <SaleProvider>
                        <Navbar />
                        <Header />
                        <Routes>
                          <Route path='/' element={<DashBoard />} />
                          <Route path='/setting' element={<RolePage />} />
                          <Route path='/user' element={<UserPage />} />
                          <Route path='/category_supplies' element={<SuppliesCategoryPage />} />
                          <Route path='/supplies' element={<SuppliesPage />} />
                          <Route path='/supplier' element={<SupplierPage />} />
                          <Route path='/shopping' element={<h3>Compras</h3>} />
                          <Route path='/category_product' element={<ProductCategoryPage />} />
                          <Route path='/product' element={<h3>Producto</h3>} />
                          <Route path='/waiter' element={<WaiterPage />} />
                          <Route path='/sale' element={<h3>Venta</h3>} />
                        </Routes>
                      </SaleProvider>
                    </ShoppingProvider>
                  </Losses>
                  </Supplies>
                </Supplier>
              </CategoryProducts>
            </CategorySupplies>
          </DashboardProvider>
        </User>
      </Role>
    </BrowserRouter>
  )
}

export default App
