import React from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setOrderType,
  setIsSearch,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchSushi, selectSushiData } from "../redux/slices/sushiSlices";

import { Status } from "../data/declarations";
import useWindowWidth from "../hooks/useWindowWidth";
import useLanguageChecker from "../hooks/useLanguageChecker";

import {
  Categories,
  Sort,
  SushiBlock,
  Skeleton,
  Pagination,
} from "../components";
import {fetchExchangeRate} from "../redux/slices/exchangeRateSlice";

const Home = () => {
  const { languageIcon } = useSelector((state: RootState) => state.sushi);
  const checkLanguage = useLanguageChecker();
  const dispatch = useAppDispatch();
  const topRef = React.useRef<HTMLDivElement>(null);
  const windowWidth = useWindowWidth();
  const scrollFunc = () => {
    const headerElement = document.querySelector(`.header`);
    headerElement!.scrollIntoView({
      behavior: `smooth`,
      block: `start`,
    });
  };
  const { categoryId, sort, currentPage, orderType, searchValue, isSearch } =
    useSelector(selectFilter);
  // данный код возвращает начальные значения из стора

  const { items, status } = useSelector(selectSushiData);

  const onChangeCategory = React.useCallback(
    (idx: number) => {
      localStorage.setItem("categoryId", idx.toString());
      dispatch(setCategoryId(idx));
      dispatch(setCurrentPage(1));
    },
    [dispatch],
  );

  const getCategoryIdString = localStorage.getItem("categoryId");
  const getCategoryId = getCategoryIdString ? +getCategoryIdString : 1;
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const onChangeOrderType = (type: string) => {
    return dispatch(setOrderType({ name: type }));
  };

  const sushi = items.map((obj: any) => <SushiBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const getSushi = async () => {
    const category =
      categoryId > 0 && !searchValue ? `category=${getCategoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    const url = checkLanguage
      ? "https://654e75f6cbc325355742e3fc.mockapi.io/sushi_en"
      : "https://654e75f6cbc325355742e3fc.mockapi.io/sushi_ru"
    ;
    dispatch(
      fetchSushi({
        url,
        currentPage,
        category,
        sort: {
          sortProperty: sort.sortProperty,
        },
        orderType,
        search,
      }),
    );
    if (windowWidth <= 1456) {
      scrollFunc();
    }
  };

  React.useEffect(() => {
    if (checkLanguage){
    dispatch(fetchExchangeRate()).unwrap();}
  }, [dispatch,checkLanguage]);


  //Если был первий рендер то запрашиваем роллы/суши
  React.useEffect(() => {
    if (windowWidth <= 1456) {
      scrollFunc();
    }
    if (!isSearch) {
      getSushi();
    }
    dispatch(setIsSearch(false));
  }, [
    languageIcon,
    getCategoryId,
    sort.sortProperty,
    searchValue,
    currentPage,
    orderType.name,
  ]);

// If we restart page we should get the category we've selected
  React.useEffect(() => {
    if (isSearch) {
      dispatch(setCategoryId(0));
    } else {
      dispatch(setCategoryId(getCategoryId));
    }
  }, [isSearch, categoryId, dispatch]);


  return (
    <div className="container" ref={topRef}>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort
          orderType={orderType.name}
          setOrderType={onChangeOrderType}
          value={sort}
        />
      </div>
      {status === "error" ? (
        checkLanguage ? (
          <div className="content__error-info">
            <h2>
              Error <span>😐</span>
            </h2>
            <p>Try to change the query</p>
          </div>
        ) : (
          <div className="content__error-info">
            <h2>
              Ошибка <span>😐</span>
            </h2>
            <p>Попробуйте изменить запрос</p>
          </div>
        )
      ) : (
        <div
          className={`content__items ${searchValue ? `` : `without-search`}`}
        >
          {status === Status.LOADING ? skeletons : sushi}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
