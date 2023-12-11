import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../Context/Dashboard.context';

const Dashboard = () => {
  const {
    getMostPurchasedSupplies,
    getMostSoldProducts,
    getTotalProfitAndExpenses,
    getOrganizeByDay,
    getOrganizeByWeek,
    getOrganizeByMonth,
    getTotalProfitAndExpensesByPaymentMethod,
    getTotalUnitsPurchasedBySupply,
    getTotalUnitsSoldByProduct,
    getAverageUnitsPerPurchase,
    getAverageUnitsPerSale,
    getNetIncomeByProduct,
    getNetIncomeBySupply,
  } = useDashboard();

  useEffect(() => {
    // Realizar la solicitud de datos si es necesario
  }, []); // Agrega dependencias si es necesario

  const mostSoldProducts = getMostSoldProducts();
  const mostPurchasedSupplies = getMostPurchasedSupplies();
  const totalProfitAndExpenses = getTotalProfitAndExpenses();
  const organizeByDay = getOrganizeByDay();
  const organizeByWeek = getOrganizeByWeek();
  const organizeByMonth = getOrganizeByMonth();
  const totalProfitAndExpensesByPaymentMethod = getTotalProfitAndExpensesByPaymentMethod();
  const totalUnitsPurchasedBySupply = getTotalUnitsPurchasedBySupply();
  const totalUnitsSoldByProduct = getTotalUnitsSoldByProduct();
  const averageUnitsPerPurchase = getAverageUnitsPerPurchase();
  const averageUnitsPerSale = getAverageUnitsPerSale();
  const netIncomeByProduct = getNetIncomeByProduct();
  const netIncomeBySupply = getNetIncomeBySupply();

  return (

    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Dashboard</h5>
                </div>
                <div className="card-body">
                  <div className="card-body table-border-style"></div>
                  <div>
                    <h2>Productos Más Vendidos</h2>
                    <ul>
                      {mostSoldProducts.map((product) => (
                        <li key={product.Product_ID}>
                          Producto ID: {product.Product_ID}, Unidades Vendidas: {product.totalLot}
                        </li>
                      ))}
                    </ul>

                    <h2>Insumos Más Comprados</h2>
                    <ul>
                      {mostPurchasedSupplies.map((supply) => (
                        <li key={supply.Supplies_ID}>
                          Insumo ID: {supply.Supplies_ID}, Unidades Compradas: {supply.totalLot}
                        </li>
                      ))}
                    </ul>

                    <h2>Ganancias Totales</h2>
                    <p>Ganancias Totales: {totalProfitAndExpenses.totalProfit}</p>

                    <h2>Gráfico de Barras - Ventas y Gastos Diarios</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={organizeByDay.salesByDay}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalSales" fill="rgba(75,192,192,0.2)" name="Ventas" />
                        <Bar dataKey="totalExpenses" fill="rgba(255,99,132,0.2)" name="Gastos" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p>Total Ventas: {totalProfitAndExpenses.totalProfit}</p>
                    <p>Total Gastos: {totalProfitAndExpenses.totalExpenses}</p>

                    <h2>Gráfico de Barras - Ventas y Gastos Semanales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={organizeByWeek.salesByWeek}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalSales" fill="rgba(75,192,192,0.2)" name="Ventas" />
                        <Bar dataKey="totalExpenses" fill="rgba(255,99,132,0.2)" name="Gastos" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p>Total Ventas: {totalProfitAndExpenses.totalProfit}</p>
                    <p>Total Gastos: {totalProfitAndExpenses.totalExpenses}</p>

                    <h2>Gráfico de Barras - Ventas y Gastos Mensuales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={organizeByMonth.salesByMonth}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalSales" fill="rgba(75,192,192,0.2)" name="Ventas" />
                        <Bar dataKey="totalExpenses" fill="rgba(255,99,132,0.2)" name="Gastos" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p>Total Ventas: {totalProfitAndExpenses.totalProfit}</p>
                    <p>Total Gastos: {totalProfitAndExpenses.totalExpenses}</p>

                    <h2>Gráfico de Barras - Métodos de Pago</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={totalProfitAndExpensesByPaymentMethod}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="Payment" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="usageCount" fill="rgba(75,192,192,0.2)" name="Usos" />
                      </BarChart>
                    </ResponsiveContainer>

                    <h2>Tabla - Unidades Compradas y Vendidas</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Unidades Compradas</th>
                          <th>Unidades Vendidas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {totalUnitsPurchasedBySupply.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.totalUnitsPurchased}</td>
                            <td>{totalUnitsSoldByProduct[index]?.totalUnitsSold || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <h2>Gráfico de Barras - Promedio de Unidades por Compra</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={averageUnitsPerPurchase}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="averageUnitsPerPurchase" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageUnitsPerPurchase" fill="rgba(75,192,192,0.2)" name="Promedio" />
                      </BarChart>
                    </ResponsiveContainer>

                    <h2>Gráfico de Barras - Promedio de Unidades por Venta</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={averageUnitsPerSale}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="averageUnitsPerSale" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageUnitsPerSale" fill="rgba(255,99,132,0.2)" name="Promedio" />
                      </BarChart>
                    </ResponsiveContainer>

                    <h2>Gráfico de Barras - Ingresos Netos por Producto</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={netIncomeByProduct}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="Product_ID" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="netIncome" fill="rgba(75,192,192,0.2)" name="Ingresos Netos" />
                      </BarChart>
                    </ResponsiveContainer>

                    <h2>Gráfico de Barras - Ingresos Netos por Suministro</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={netIncomeBySupply}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="Supplies_ID" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="netIncome" fill="rgba(255,99,132,0.2)" name="Ingresos Netos" />
                      </BarChart>
                    </ResponsiveContainer>

                    {/* Descripción - Ingresos Netos por Producto y Suministro */}
                    <h2>Descripción - Ingresos Netos por Producto y Suministro</h2>
                    <p>
                      La función <strong>getNetIncomeByProduct</strong> proporciona información sobre el ingreso neto por producto,
                      teniendo en cuenta los costos asociados. Mientras tanto, la función <strong>getNetIncomeBySupply</strong> ofrece
                      datos sobre el ingreso neto por insumo, teniendo en cuenta los costos asociados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
