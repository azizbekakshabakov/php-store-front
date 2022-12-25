import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from "./component/main-page";
import { Employees } from "./component/page/all-items/employees";
import { Employee } from './component/page/item/employee';
import { Login } from './component/auth/login';
import { Register } from './component/auth/register';
import { EmployeeEdit } from './component/page/item/employee-edit';
import { Categories } from './component/page/all-items/categories';
import { Category } from './component/page/item/category';
import { CategoryEdit } from './component/page/item/category-edit';
import { Goods } from './component/page/all-items/goods';
import { Good } from './component/page/item/good';
import { GoodEdit } from './component/page/item/good-edit';
import { Sales } from './component/page/all-items/sales';
import { Sale } from './component/page/item/sale';
import { SaleEdit } from './component/page/item/sale-edit';
import { Suppliers } from './component/page/all-items/suppliers';
import { Supplier } from './component/page/item/supplier';
import { SupplierEdit } from './component/page/item/supplier-edit';
import { Warehouses } from './component/page/all-items/warehouses';
import { WarehouseEdit } from './component/page/item/warehouse-edit';
import { Warehouse } from './component/page/item/warehouse';

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<MainPage/>} />

          <Route path="/employees" element={<Employees/>}>
            <Route path=":id" element={<EmployeeEdit />} />
            <Route path="new" element={<Employee />} />
          </Route>

          <Route path="/categories" element={<Categories/>}>
            <Route path=":id" element={<CategoryEdit />} />
            <Route path="new" element={<Category />} />
          </Route>

          <Route path="/goods" element={<Goods/>}>
            <Route path=":id" element={<GoodEdit />} />
            <Route path="new" element={<Good />} /> 
          </Route>

          <Route path="/sales" element={<Sales/>}>
            <Route path=":id" element={<SaleEdit />} />
            <Route path="new" element={<Sale />} />
          </Route>

          <Route path="/suppliers" element={<Suppliers/>}>
            <Route path=":id" element={<SupplierEdit />} />
            <Route path="new" element={<Supplier />} />
          </Route>

          <Route path="/warehouses" element={<Warehouses/>}>
            <Route path=":id" element={<WarehouseEdit />} />
            <Route path="new" element={<Warehouse />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
      
    </>
  );
}

export default App;
