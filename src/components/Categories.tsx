import React from "react";
import { useSelector } from "react-redux";

import { selectFilter } from "../redux/slices/filterSlice";
import { ICategoriesProps } from "../data/declarations";
import useLanguageChecker from "../hooks/useLanguageChecker";

const ruCategories = ["Роллы", "Тэмпура", "Суши", "Наборы"];
const enCategories = ["Rolls", "Tempura", "Sushi", "Sets"];

export const Categories: React.FC<ICategoriesProps> = ({
  value,
  onChangeCategory,
}) => {
  const { searchValue } = useSelector(selectFilter);

  const checkLanguage = useLanguageChecker()

  return (
    <div className="categories">
      <ul>
        {searchValue.length > 0 ? (
          <li className={value > 0 ? "active" : ""}>{checkLanguage? "All products": "Все продукты"}</li>
        ) : (
          <>
            {checkLanguage
              ? enCategories.map((categoryName, i) => (
                  <li
                    key={i}
                    onClick={() => onChangeCategory(i + 1)}
                    className={value === i + 1 ? "active" : ""}
                  >
                    {categoryName}
                  </li>
                ))
              : ruCategories.map((categoryName, i) => (
                  <li
                    key={i}
                    onClick={() => onChangeCategory(i + 1)}
                    className={value === i + 1 ? "active" : ""}
                  >
                    {categoryName}
                  </li>
                ))}
          </>
        )}
      </ul>
    </div>
  );
};
