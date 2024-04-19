import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";
import cat_404 from "../../assets/img/cat_404.jpeg";
import AnimationLayout from "../../layots/AnimationLayout";

export const NotFoundBlock = () => {
    return (
      <AnimationLayout>
        <div className={styles.root}>
          <img src={cat_404} alt="Cat_404" width="250" />
          <h1>Ошибка</h1>
          <p className={styles.description}>Ничего не найдено</p>
          <Link to="/" className="button button--black">
            <span>На главную</span>{" "}
          </Link>
        </div>
      </AnimationLayout>
    );
};
