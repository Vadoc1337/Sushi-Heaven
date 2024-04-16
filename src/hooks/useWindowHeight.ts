import React from "react";
import debounce from "lodash.debounce";

const useWindowHeight = () => {
    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const handleResize = debounce(() => {
            setHeight(window.innerHeight);
        }, 60);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return height;
};

export default useWindowHeight;
