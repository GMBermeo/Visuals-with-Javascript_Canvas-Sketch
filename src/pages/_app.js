import React from "react";
import "../assets/animations.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import Produtos from "./produtos";
import Contato from "./contato";
import Produto from "./produto/produto";
import NotFounded from "./notFounded";

const App = () => {
  return (
    <div className="container mx-auto min-h-screen px-5">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Produtos />} />
          <Route path="contato" element={<Contato />} />
          <Route path="produto/:id/*" element={<Produto />} />
          <Route path="*" element={<NotFounded />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
