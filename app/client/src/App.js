import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Drinks from './components/Drinks/Drinks';
import FAQ from './components/FAQ/FAQ';
import Food from './components/Food/Food';
import ItemDetail from './components/ItemDetail/ItemDetail';
import Admin from './components/Admin/Admin';
import AdminArticles from './components/Admin/Articles';
import AdminEditArticle from './components/Admin/Edit-Article';
import AdminCategorys from './components/Admin/Categorys';
import AdminEditCategory from './components/Admin/Edit-Category';
import Login from './components/Login/Login';

function App() {
    return (
      <div>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/getraenke" element={<Drinks />} />
            <Route path="/speisen" element={<Food />} />
            <Route path="/speisen/:catName" element={<Food />} />
            <Route exact path="/items/detail/:id" element={<ItemDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/admin/articles" element={<AdminArticles />} />
            <Route exact path="/admin/articles/:id" element={<AdminEditArticle />} />
            <Route exact path="/admin/categorys" element={<AdminCategorys />} />
            <Route exact path="/admin/categorys/:id" element={<AdminEditCategory />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
        </Routes>
      </div>
    )
}

export default App;
