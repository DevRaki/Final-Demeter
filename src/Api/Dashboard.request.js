import axios from './Axios';

export const getMostPurchasedSuppliesRequest = () => axios.get('/dashboard/mostPurchasedSupplies');
export const getMostSoldProductsRequest = () => axios.get('/dashboard/mostSoldProducts');
export const getTotalProfitAndExpensesRequest = () => axios.get('/dashboard/totalProfitAndExpenses');
export const getOrganizeByDayRequest = () => axios.get('/dashboard/organizeByDay');
export const getOrganizeByWeekRequest = () => axios.get('/dashboard/organizeByWeek');
export const getOrganizeByMonthRequest = () => axios.get('/dashboard/organizeByMonth');
export const getTotalProfitAndExpensesByPaymentMethodRequest = () => axios.get('/dashboard/totalProfitAndExpensesByPaymentMethod');
export const getTotalUnitsPurchasedBySupplyRequest = () => axios.get('/dashboard/totalUnitsPurchasedBySupply');
export const getTotalUnitsSoldByProductRequest = () => axios.get('/dashboard/totalUnitsSoldByProduct');
export const getAverageUnitsPerPurchaseRequest = () => axios.get('/dashboard/averageUnitsPerPurchase');
export const getAverageUnitsPerSaleRequest = () => axios.get('/dashboard/averageUnitsPerSale');
export const getNetIncomeByProductRequest = () => axios.get('/dashboard/netIncomeByProduct');
export const getNetIncomeBySupplyRequest = () => axios.get('/dashboard/netIncomeBySupply');
