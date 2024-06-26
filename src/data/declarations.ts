// * SushiSlice declarations

interface ISushi {
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  description: string;
  weight: number;
  title: string;
  types: number[];
}

interface ISushiSliceState {
  items: ISushi[];
  status: Status;
  isClicked: boolean;
  languageIcon: string;
}

interface InutritionFacts {
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
}

interface ISushiBlockProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  weight: number;
  nutritionFacts: InutritionFacts;
  rating: number;
}

interface IFetchSushiArgs {
  url: string;
  currentPage: number;
  category: string;
  sort: { sortProperty?: string };
  orderType: { name: string };
  search: string;
}

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// * CartSlice declarations

interface ICartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
  imageUrl: string;
  weight: number;
}

interface ICartSliceState {
  totalPrice: number;
  items: ICartItem[];
}

// * FilterSlice declarations

interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: IList;
  orderType: IList;
  visitedCategory?: number | null;
  isSearch: boolean;
}

interface IList {
  name: string;
  sortProperty?: "rating" | "price" | "title";
}

// * ExchangeRateSlice declarations

interface IExchangeRateSliceState {
  value: number;
  status: Status;
  error: undefined | string;
}

interface ExchangeRate {
  value: number;
}

// * Other declarations

interface ICategoriesProps {
  value: number;
  onChangeCategory: (idx: number) => void;
}

interface IPaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
}

interface ISortProps {
  orderType: string;
  setOrderType: (type: string) => void;
  value: IList;
}

interface AnimationLayoutProps {
  children: React.ReactNode;
}

interface IMarginScaleData {
  height: number;
  scale: number;
  marginTopBottom: number;
}

export { Status };
export type {
  ISushi,
  IList,
  ICategoriesProps,
  ICartItem,
  IPaginationProps,
  ISushiBlockProps,
  ISortProps,
  ICartSliceState,
  IFilterSliceState,
  ISushiSliceState,
  IFetchSushiArgs,
  AnimationLayoutProps,
  IMarginScaleData,
  IExchangeRateSliceState,
  ExchangeRate,
};
