import React from "react";
import { useSelector } from "react-redux";

import { selectFilter } from "../redux/slices/filterSlice";
import { ICategoriesProps } from "../data/declarations";

const categories = ["Роллы", "Тэмпура", "Суши", "Наборы"];

export const Categories: React.FC<ICategoriesProps> = ({
  value,
  onChangeCategory,
}) => {
  const { searchValue } = useSelector(selectFilter);

  return (
    <div className="categories">
      <ul>
        {searchValue.length > 0 ? (
          <li className={value > 0 ? "active" : ""}>Все продукты</li>
        ) : (
          <>
            {categories.map((categoryName, i) => (
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
