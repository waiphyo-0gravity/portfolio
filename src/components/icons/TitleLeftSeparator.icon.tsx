import { SvgIcon, SvgIconProps } from "@mui/material"
import React from "react"

const TitleLeftSeparator: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon width='19' height='3' viewBox="0 0 19 3" fill='none' {...props}>
      <path d="M20.116 2.32751C13.3029 0.160957 7.06579 1.26073 0.943865 3.01377" stroke="white" strokeLinecap="round"/>
    </SvgIcon>
  )
}

export default TitleLeftSeparator