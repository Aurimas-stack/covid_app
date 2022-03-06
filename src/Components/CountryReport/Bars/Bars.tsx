import { ScaleBand, ScaleLinear } from "d3";
import { FC } from "react";

interface BarsProps {
    data: { label: string; value: number }[];
    height:number;
    scaleX: ScaleBand<string>;
    scaleY: ScaleLinear<number, number, never>;
}

const Bars: FC<BarsProps> = ({data,height,scaleX, scaleY}) => {
    return (
        <>
        {
            data.map(({label, value}) => (
                <rect key={`bar-${label}`}
                x={scaleX(label)}
                y={scaleY(value)}
                width={scaleX.bandwidth()}
                height={height - scaleY(value)}
                fill="teal"
                />
            ))
        }
        </>
    )
}
export default Bars;