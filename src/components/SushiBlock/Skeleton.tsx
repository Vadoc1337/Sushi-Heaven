import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
    <ContentLoader
        className="sushi-block__skeleton"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="17" y="247" rx="10" ry="10" width="206" height="91"/>
        <rect x="9" y="362" rx="20" ry="20" width="105" height="34"/>
        <rect x="13" y="202" rx="10" ry="10" width="212" height="23"/>
        <rect x="159" y="360" rx="24" ry="24" width="84" height="39"/>
        <rect x="11" y="21" rx="0" ry="0" width="231" height="163"/>
        <circle cx="244" cy="221" r="10"/>
    </ContentLoader>
);

