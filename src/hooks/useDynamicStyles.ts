// * Будущая функция для MainLayout
// import {useLocation} from "react-router-dom";
// import {useSelector} from "react-redux";
// import {selectFilter} from "../redux/slices/filterSlice";
// import {selectCart} from "../redux/slices/cartSlice";
// import useWindowWidth from "./useWindowWidth";
// import useWindowHeight from "./useWindowHeight";
// import calculateScaleAndMargin from "../utils/marginScaleFunc";
// import React from "react";
//
//
//
//
// let CartEmptyMargin;
// let wideScreen;
// const LAPTOP_WIDTH = 1455;
// const SMARTPHONE_WIDTH = 768;
// const ASPECT_RATIO_THRESHOLD = 1.72;
// const CONTENT_HEIGHT_THRESHOLD = 748;
// const isCart = location.pathname === `/Sushi-Heaven/cart`;
//
// export default function useDynamicStyles () {
//     const location = useLocation();
//
//     const { searchValue } = useSelector(selectFilter);
//     const { totalPrice } = useSelector(selectCart);
//
//     const windowWidth = useWindowWidth();
//     const windowHeight = useWindowHeight();
//     const { scale, marginTopBottom } = calculateScaleAndMargin(windowHeight);
//
//     const shouldApplyTransform =
//         windowWidth > LAPTOP_WIDTH &&
//         !searchValue &&
//         contentHeight <= CONTENT_HEIGHT_THRESHOLD &&
//         !isCart;
//
//
//     const contentRef = React.useRef<HTMLDivElement>(null);
//     const [contentHeight, setContentHeight] = React.useState(0);
//
//     if (shouldApplyTransform && wideScreen) {
//         return {
//             transform: `scale(${scale})`,
//             margin: `${marginTopBottom}px auto`,
//             transition: "all 0.2s ease",
//         };
//     } else if (shouldApplyTransform && !wideScreen) {
//         return {
//             margin: `${marginTopBottom}px auto`,
//             transition: "all 0.2s ease",
//         };
//     } else if (CartEmptyMargin && windowWidth > SMARTPHONE_WIDTH) {
//         return {
//             margin: `8vh auto`,
//             transition: "all 0.2s ease",
//         };
//     }
//     return {}; // Default case when no styles need to be applied
// };
