import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
    <ContentLoader
        className="sushi-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="18" y="297" rx="10" ry="10" width="222" height="94"/>
        <rect x="18" y="407" rx="20" ry="20" width="95" height="34"/>
        <rect x="15" y="252" rx="10" ry="10" width="212" height="23"/>
        <rect x="133" y="401" rx="24" ry="24" width="126" height="43"/>
        <rect x="11" y="68" rx="0" ry="0" width="233" height="165"/>
        <circle cx="242" cy="271" r="10"/>
    </ContentLoader>
);

