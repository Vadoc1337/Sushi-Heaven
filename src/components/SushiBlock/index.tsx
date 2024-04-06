import React from "react";
import Popup from "reactjs-popup";

import { useSelector, useDispatch } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";

import { ICartItem, ISushiBlockProps } from "../../data/declarations";
export const SushiBlock: React.FC<ISushiBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  description,
  weight,
  nutritionFacts,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const { calories, protein, fat, carbohydrate } = nutritionFacts;

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: ICartItem = {
      id,
      title,
      price,
      imageUrl,
      description,
      weight,
      count: 0,
    };
    dispatch(addItem(item));
  };

  const POSITION_TYPES = ["left top"];

  return (
    <div className="sushi-block">
      <img className="sushi-block__image" src={imageUrl} alt="Роллы" />
      <h4 className="sushi-block__title">
        {title} <span className="sushi-block__weight">{weight} г</span>
        {POSITION_TYPES.map((position, i) => (
          <Popup
            key={`tp-${i}`}
            trigger={<button type="button" className="button__info"></button>}
            // @ts-ignore
            position={position}
            on={["click"]}
            // arrow={position !== "center center"}
          >
            <table className="sushi-block__calories">
              <tbody>
                <tr>
                  <th colSpan={3}>
                    <b>Пищевая ценность на 100 г</b>
                  </th>
                </tr>
                <tr>
                  <td>Калорийность</td>
                  <td>
                    <b>{calories}</b>
                  </td>
                  <td>Ккал</td>
                </tr>
                <tr>
                  <td>Белки</td>
                  <td>
                    <b>{protein}</b>
                  </td>
                  <td>грамм</td>
                </tr>
                <tr>
                  <td>Жиры</td>
                  <td>
                    <b>{fat}</b>
                  </td>
                  <td>грамм</td>
                </tr>
                <tr>
                  <td>Углеводы</td>
                  <td>
                    <b>{carbohydrate}</b>
                  </td>
                  <td>грамм</td>
                </tr>
              </tbody>
            </table>
          </Popup>
        ))}
      </h4>
      <div className="sushi-block__selector">
        <p>{description}</p>
        <div className="sushi-block__bottom">
          <div className="sushi-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
