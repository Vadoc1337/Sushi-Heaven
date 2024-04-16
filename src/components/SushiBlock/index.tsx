import React from "react";
import Popup from "reactjs-popup";

import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  minusItem,
  selectCartItemById,
} from "../../redux/slices/cartSlice";

import { ICartItem, ISushiBlockProps } from "../../data/declarations";
import AnimationLayout from "../../layots/AnimationLayout";

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

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as ICartItem),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const POSITION_TYPES = ["left top"];

  return (
    <AnimationLayout>
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
            {addedCount > 0 ? (
              <div className="cart__item__mobile cart__item-count">
                <button
                  onClick={onClickMinus}
                  className="button button--outline button--circle cart__item-count-minus"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.000001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    ></path>
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    ></path>
                  </svg>
                </button>
                <b>{addedCount}</b>
                <button
                  onClick={onClickPlus}
                  className="button button--outline button--circle cart__item-count-plus"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    ></path>
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onClickAdd}
                className="button button--outline button--add"
              >
                <span>Добавить</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};
