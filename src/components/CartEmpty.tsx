import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.svg";
import AnimationLayout from "../layots/AnimationLayout";
import useLanguageChecker from "../hooks/useLanguageChecker";

export const CartEmpty = () => {
  return (
    <AnimationLayout>
      <div className="cart cart--empty">
        <img src={cartEmptyImg} alt="Empty cart" />
        {useLanguageChecker() ? (
          <>
            <h2>There's nothing here !</h2>
            <p>Add something from the menu</p>
            <Link to="/" className="button button--black">
              <span>Go Back</span>{" "}
            </Link>
          </>
        ) : (
          <>
            <h2>Ой, а тут пусто !</h2>
            <p>Добавьте что-нибудь из меню</p>
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>{" "}
            </Link>
          </>
        )}
      </div>
    </AnimationLayout>
  );
};
