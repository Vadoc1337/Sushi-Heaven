import React from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setOrderType,
  setIsSearch,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchSushi, selectSushiData } from "../redux/slices/sushiSlices";

import { Status } from "../data/declarations";

import {
  Categories,
  Sort,
  SushiBlock,
  Skeleton,
  Pagination,
} from "../components";

const Home = () => {
  const dispatch = useAppDispatch();

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
    dispatch(
      fetchSushi({
        currentPage,
        category,
        sort: {
          sortProperty: sort.sortProperty,
        },
        orderType,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  //Если был первий рендер то запрашиваем роллы/суши
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch) {
      getSushi();
    }
    dispatch(setIsSearch(false));
  }, [
    getCategoryId,
    sort.sortProperty,
    searchValue,
    currentPage,
    orderType.name,
  ]);

  React.useEffect(() => {
    if (isSearch) {
      dispatch(setCategoryId(0));
    } else {
      dispatch(setCategoryId(getCategoryId));
    }
  }, [isSearch, categoryId, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort
          orderType={orderType.name}
          setOrderType={onChangeOrderType}
          value={sort}
        />
      </div>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Ошибка <span>😐</span>
          </h2>
          <p>Попробуйте изменить запрос</p>
        </div>
      ) : (
        <div className="content__items">
          {status === Status.LOADING ? skeletons : sushi}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
