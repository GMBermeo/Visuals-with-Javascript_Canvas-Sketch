import React from "react";
import { useParams } from "react-router-dom";
import Head from "../../components/common/Head";

const Produto = () => {
  const [produto, setProduto] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://ranekapi.origamid.dev/json/api/produto/${id}`)
      .then((r) => r.json())
      .then((json) => setProduto(json));
    setLoading(false);

    // console.log(produto);
  }, [id]);

  // console.log(params);

  if (loading || !produto) return <div className="loading" />;

  return (
    <>
      <Head title={produto.nome} />
      <div className="slideLeft flex">
        <div className="slideUpSlow w-1/2 flex-initial">
          {produto.fotos.map((foto) => (
            <img
              className="mb-4 rounded-lg"
              src={foto.src}
              alt={foto.titulo}
              key={foto.src}
            />
          ))}
        </div>
        <div className="ml-6 w-1/2">
          <h2 className="text-3xl font-bold">{produto.nome}</h2>
          <label
            className={`${
              produto.vendido ? "bg-green-300" : "bg-red-300"
            } my-2 w-fit rounded-md px-3 py-2 text-base`}
          >
            R$ {produto.preco}
          </label>
          <p className="slideDown">{produto.descricao}</p>
        </div>
      </div>
    </>
  );
};

export default Produto;
