import {useState, useEffect} from "react";

const windowDimensions = () => {
    const { innerWidth: width, innerHeight: height} = window;
    return {
        width, height
    };
}

const useWindowDimensions = () => {
    const [dimensions, setDimensions] = useState(windowDimensions());

    useEffect(() => {
        const handleResize = () => {
            setDimensions(windowDimensions());
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return dimensions;
}

export default useWindowDimensions;