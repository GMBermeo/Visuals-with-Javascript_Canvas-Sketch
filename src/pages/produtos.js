import React from "react";
import { Link } from "react-router-dom";
import Head from "../components/common/Head";

const Produtos = () => {
  const [produtos, setProdutos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch("https://ranekapi.origamid.dev/json/api/produto")
      .then((r) => r.json())
      .then((json) => setProdutos(json));
    setLoading(false);
    // console.log(produtos);
  }, []);

  if (loading || !produtos) return <div className="loading" />;
  return (
    <>
      <Head />
      <div className="slideLeft grid grid-cols-3 gap-4 md:gap-8">
        {produtos &&
          produtos.map((produto) => (
            <Link to={`/produto/${produto.id}`} key={produto.id}>
              <div>
                <img
                  src={produto.fotos[0].src}
                  alt={produto.fotos[0].titulo}
                  className="w-full cursor-pointer rounded-md"
                />
                <p className="mt-2 text-center text-base">{produto.nome}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Produtos;
