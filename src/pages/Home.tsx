import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setOrderType,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchSushi, selectSushiData } from "../redux/slices/sushiSlices";

import { IList, Status } from "../data/declarations";

import {
  Categories,
  Sort,
  SushiBlock,
  Skeleton,
  Pagination,
  list,
} from "../components";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, orderType, searchValue } =
    useSelector(selectFilter);
  // вот этот вот код возвращает начальные значения из стора

  const { items, status } = useSelector(selectSushiData);

  const onChangeCategory = React.useCallback(
      (idx: number) => {
        dispatch(setCategoryId(idx));
        localStorage.setItem("categoryId", idx.toString());
      },
      [dispatch],
  );
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeOrderType = (type: string) => {
    return dispatch(setOrderType({ name: type }));
  };

  const sushi = items.map((obj: any) => <SushiBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const getSushi = async () => {
    const category =
      categoryId > 0 && !searchValue ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      fetchSushi({
        currentPage,
        category,
        sort: {
          sortProperty: sort?.sortProperty, // Костыльчик чтобы значение по умолчанию работало
        },
        orderType,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер то ставим параметр isMounted.current = true
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sort.sortProperty,
        orderType: orderType.name,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [navigate, currentPage, categoryId, sort.sortProperty, orderType.name]);
  // Если был первый рендер то проверяем URL параметры и сохраняем в Redux

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(
        (obj) => obj.sortProperty === params.sortProperty,
      ) as IList;
      const orderType = {
        name: params.orderType as string,
      };
      dispatch(
        setFilters({
          ...params,
          sort,
          orderType,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          searchValue: params.searchValue as string,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  //Если был первий рендер то запрашиваем роллы/суши
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getSushi()
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, orderType.name]);

  const getCategoryIdString = localStorage.getItem("categoryId");
  const getCategoryId = getCategoryIdString ? +getCategoryIdString : 1;
  React.useEffect(() => {
    if (searchValue) {
      dispatch(setCategoryId(0));
    } else {
      dispatch(setCategoryId(getCategoryId));
    }
  }, [searchValue,categoryId]);

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
