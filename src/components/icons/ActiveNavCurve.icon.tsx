import { SvgIcon, SvgIconProps } from "@mui/material"
import React from "react"

const ActiveNavCurve: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon width='47' height='32' viewBox="0 0 47 32" fill="#EA0501" {...props}>
      <path d="M21.6641 17.3333C37.8203 17.3333 45.2865 27.1111 47 32H0V0C0.489582 5.77778 5.50781 17.3333 21.6641 17.3333Z" />
    </SvgIcon>
  )
}

export default ActiveNavCurve