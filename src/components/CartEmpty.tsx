import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.svg";

export const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <img src={cartEmptyImg} alt="Empty cart"/>
        <h2>
          Ой, а тут пусто !
        </h2>
        <p>
          Добавьте что-нибудь из меню
        </p>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>{" "}
        </Link>
      </div>
    </>
  );
};


