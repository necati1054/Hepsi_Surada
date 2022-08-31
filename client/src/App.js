import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/Page/HomePage';
import Login from './components/Page/Login';
import Register from './components/Page/Register';
import AdminPanel from './components/Page/AdminPanel';
import CategoryManagementPanel from './components/Page/CategoryManagementPanel';
import SubCategoryManagementPanel from './components/Page/SubCategoryManagementPanel';
import ProductManagementPanel from './components/Page/ProductManagementPanel';
import TmpStoreManagementPanel from './components/Page/TmpStoreManagementPanel';
import Store_application from"./components/Page/Store_application"
import Store from './components/Page/Store';
import ProductInfo from './components/Page/ProductInfo';

import AdminRoute from './components/control/AdminRoute';
import AuthRoute from './components/control/AuthRoute';

import Hata from './components/Page/Hata';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/product_info/:product_id' element={<ProductInfo/>}></Route>
      {/* Server Admin */}
      <Route element={<AdminRoute/>}> 
        <Route path='/admin' element={<AdminPanel/>}></Route>
        <Route path='/admin/category' element={<CategoryManagementPanel/>}/>
        <Route path='/admin/subcategory' element={<SubCategoryManagementPanel/>}/>
        <Route path='/admin/product' element={<ProductManagementPanel/>}/>
        <Route path='/admin/tmpstore' element={<TmpStoreManagementPanel/>}/>
      </Route>
      {/* Şirket Sahibi Başvuru */}
      <Route element={<AuthRoute/>}>
        <Route path='/sirket_basvuru' element={<Store_application/>}/>
        <Route path='/store' element={<Store/>}/>
      </Route>
      {/* Hata */}
      <Route path="*" element={<Hata />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
