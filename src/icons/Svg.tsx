"use client";

import { SVGAttributes } from "react";

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
    color?: string;
    spin?: boolean;
}

const Svg = (props: SvgProps) => {
    return <svg {...props} />;
};

Svg.defaultProps = {
    xmlns: "http://www.w3.org/2000/svg"
};

export default Svg;
