import * as React from "react";
import Svg from "./Svg";

const SvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Svg width="12" height="13" fill="none" viewBox="0 0 12 13" {...props}>
        <path stroke="currentColor" strokeWidth="2.133" d="M.002 6.986h11.997M6 .987v11.997"></path>
    </Svg>
);

export default SvgIcon;
