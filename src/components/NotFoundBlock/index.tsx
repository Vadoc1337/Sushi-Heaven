import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";
import cat_404 from "../../assets/img/cat_404.jpeg";
import AnimationLayout from "../../layots/AnimationLayout";
import useLanguageChecker from "../../hooks/useLanguageChecker";

export const NotFoundBlock = () => {
    return (
      <AnimationLayout>
        {useLanguageChecker() ? (
            <div className={styles.root}>
                <img src={cat_404} alt="Cat_404" width="250"/>
                <h1>Error</h1>
                <p className={styles.description}>Nothing was found</p>
                <Link to="/" className="button button--black">
                    <span>Back to home</span>{" "}
                </Link>
            </div>
        ): (
          <div className={styles.root}>
              <img src={cat_404} alt="Cat_404" width="250"/>
              <h1>Ошибка</h1>
              <p className={styles.description}>Ничего не найдено</p>
              <Link to="/" className="button button--black">
                  <span>На главную</span>{" "}
              </Link>
          </div>)}
      </AnimationLayout>
    );
};
