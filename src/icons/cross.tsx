import React from "react";

const Cross = ({
  className,
  width = "15px",
  height = "15px",
}: {
  className?: string;
  width?: string;
  height?: string;
}): JSX.Element => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 490 490"
    className={className}
    width={width}
    height={height}
  >
    <polygon
      points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 
	11.387,0 0.561,10.811 234.191,244.996 0.561,479.174 "
    />
  </svg>
);

export default Cross;
