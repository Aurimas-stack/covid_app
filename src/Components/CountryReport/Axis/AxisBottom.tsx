import { FC, useRef, useEffect } from "react";
import { axisBottom, ScaleBand, select } from "d3";

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

const AxisBottom: FC<AxisBottomProps> = ({ scale, transform }) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};
export default AxisBottom;
