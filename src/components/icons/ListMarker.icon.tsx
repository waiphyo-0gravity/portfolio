import { SvgIcon, SvgIconProps } from "@mui/material"
import React from "react"

const ListMarkerIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon width='12' height='12' viewBox="0 0 12 12" fill='none' {...props}>
      <path d="M9 6L0 11.1962L0 0.803848L9 6Z" fill="#EA0501"/>
    </SvgIcon>
  )
}

export default ListMarkerIcon