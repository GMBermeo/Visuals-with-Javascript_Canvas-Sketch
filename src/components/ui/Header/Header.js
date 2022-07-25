import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // const location = useLocation();

  // React.useEffect(() => {
  //   // console.log("Muda a rota");
  // }, [location]);

  return (
    <header>
      <nav>
        <NavLink to="/" end>
          Produtos
        </NavLink>
        <NavLink to="contato">Contato</NavLink>
      </nav>
    </header>
  );
};

export default Header;
