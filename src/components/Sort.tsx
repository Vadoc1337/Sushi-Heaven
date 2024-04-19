import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useClickAway } from "ahooks";

import { setSort, setOrderType } from "../redux/slices/filterSlice";
import { selectCart } from "../redux/slices/cartSlice";
import { IList, ISortProps } from "../data/declarations";
import useWindowWidth from "../hooks/useWindowWidth";

export const list: Array<IList> = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

export const Sort: React.FC<ISortProps> = (({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const { items } = useSelector(selectCart);
  const location = useLocation();

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0,
  );

  const onClickListItem = (obj: IList) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  const onChangeOrderType = (type: string) => {
    return dispatch(setOrderType({ name: type }));
  };

  // Юзаем ahooks для закрытия popup при клике за его пределами
  useClickAway(() => {
    setOpen(false);
  }, sortRef);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {useWindowWidth() <= 767 ? (
          <div className="content__top__mobile">
            <div className="sort__root">
              <button
                onClick={() => onChangeOrderType("asc")}
                aria-label="Sort Ascending"
              >
                {/*{" "}*/}
                ↑
              </button>
              <button
                onClick={() => onChangeOrderType("desc")}
                aria-label="Sort Descending"
              >
                {/*{" "}*/}
                ↓
              </button>
              <b>Сортировка по:</b>
              <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>
            {location.pathname !== "/cart" && (
              <Link to="cart" className="button button--cart">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{totalCount}</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="sort__root">
              <button
                onClick={() => onChangeOrderType("asc")}
                aria-label="Sort Ascending"
              >
                ↑
              </button>
              <button
                onClick={() => onChangeOrderType("desc")}
                aria-label="Sort Descending"
              >
                ↓
              </button>
            </div>
            <b>Сортировка по:</b>
            <span onClick={() => setOpen(!open)}>{value.name}</span>
          </>
        )}
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : " "
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
