import React from "react";
import Head from "../components/common/Head";
import fotoContato from "../public/contato.jpg";

const Contato = () => {
  return (
    <>
      <Head title="Contato" />
      <div className="flex">
        <div className="w-1/2 flex-initial">
          <img
            src={fotoContato}
            alt="Imagem de uma máquina de escrever."
            className="slideUpSlow h-auto w-full rounded-md"
          />
        </div>
        <div className="slideLeft ml-6 w-1/2">
          <h3 className="text-3xl font-bold">Entre em contato.</h3>
          <ul className="slideDown ml-4 mt-4">
            <li> Guilherme Bermêo</li>
            <li> 99999-9999</li>
            <li> Rua Ali Perto, 999</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contato;
