import { axisLeft, ScaleLinear, select } from "d3";
import { FC, useEffect, useRef } from "react";

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

const AxisLeft: FC<AxisLeftProps> = ({scale}) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if(ref.current) {
            select(ref.current).call(axisLeft(scale))
        }
    }, [scale])

    return <g ref={ref}/>
}
export default AxisLeft;