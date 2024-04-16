//@ts-nocheck
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Header } from "../components";

import { selectCart } from "../redux/slices/cartSlice";
import { selectFilter } from "../redux/slices/filterSlice";

import calculateScaleAndMargin from "../utils/marginScaleFunc";
import useWindowHeight from "../hooks/useWindowHeight";
import useWindowWidth from "../hooks/useWindowWidth";

const LAPTOP_WIDTH = 1455;
const MIN_TABLET_WIDTH = 768;
const MIN_SMARTPHONE_WIDTH = 585;
const ASPECT_RATIO_THRESHOLD = 1.72;

const MainLayout = () => {
  const location = useLocation();
  const isCart = location.pathname === `/Sushi-Heaven/cart`;

  const { searchValue } = useSelector(selectFilter);
  const { items } = useSelector(selectCart);

  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const cartEmpty = isCart && items.length === 0;
  const wideScreen =
      windowWidth / windowHeight >= ASPECT_RATIO_THRESHOLD &&
      windowWidth > LAPTOP_WIDTH;

  const { scale, marginTopBottom } = calculateScaleAndMargin(windowHeight);

  const shouldApplyTransform = windowWidth > LAPTOP_WIDTH && !searchValue;

  const getDynamicStyles = () => {
    if (shouldApplyTransform && wideScreen && !isCart && windowHeight >= 500) {
      return {
        transform: `scale(${scale})`,
        margin: `${marginTopBottom}px auto`,
        transition: "all 0.2s ease",
      };
    } else if (shouldApplyTransform && !wideScreen) {
      return {
        margin: `${marginTopBottom}px auto`,
        transition: "all 0.2s ease",
      };
    } else if (shouldApplyTransform && isCart && items.length <= 4) {
      return {
        transform: `scale(${scale})`,
        margin: `${marginTopBottom}px auto`,
        transition: "all 0.2s ease",
      };
    } else if (shouldApplyTransform && isCart && items.length > 4) {
      return {
        transition: "all 0.2s ease",
      };
    } else if (windowWidth >= MIN_TABLET_WIDTH && !cartEmpty && !isCart) {
      return {
        margin: `5vh auto 3vh`,
        width: `calc(100% - 50px)`,
        transition: "all 0.2s ease",
      };
    } else if (
        windowWidth >= MIN_TABLET_WIDTH &&
        !cartEmpty &&
        items.length > 2
    ) {
      return {
        margin: `5vh auto 3vh`,
        width: `calc(100% - 50px)`,
        transition: "all 0.2s ease",
      };
    } else if (
        windowWidth >= MIN_TABLET_WIDTH &&
        !cartEmpty &&
        items.length <= 2 &&
        windowHeight >= 805
    ) {
      return {
        width: `calc(100% - 50px)`,
        margin: `${marginTopBottom}px auto`,
        transition: "all 0.2s ease",
      };
    } else if (
        cartEmpty &&
        windowWidth >= MIN_TABLET_WIDTH &&
        windowHeight >= 805
    ) {
      return {
        margin: `${marginTopBottom}px auto`,
        transition: "all 0.2s ease",
      };
    } else if (windowWidth <= MIN_SMARTPHONE_WIDTH && !isCart) {
      return {
        margin: `2vh 5px`,
        transition: "all 0.2s ease",
      };
    } else if (
        windowWidth <= MIN_SMARTPHONE_WIDTH &&
        isCart &&
        windowHeight >= 900
    ) {
      return {
        margin: `${marginTopBottom}px 5px`,
        transition: "all 0.2s ease",
      };
    } else if (
        windowWidth <= MIN_SMARTPHONE_WIDTH &&
        isCart &&
        windowHeight <= 900
    ) {
      return {
        margin: `30px 5px`,
        transition: "all 0.2s ease",
      };
    }
    return {};
  };

  return (
      <div className="wrapper" style={getDynamicStyles()}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
  );
};

export default MainLayout;
