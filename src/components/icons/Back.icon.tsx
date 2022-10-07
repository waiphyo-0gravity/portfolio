import { SvgIcon, SvgIconProps } from "@mui/material"
import React from "react"

const BackIcon: React.FC<SvgIconProps> = ({ fill, ...props }) => {
  return (
    <SvgIcon width='32' height='32' viewBox="0 0 32 32" fill='none' {...props} sx={{ fill: 'none', ...props.sx }}>
      <path stroke={fill ?? "#292D32"} d="M16 8H19.56C23.9733 8 25.7867 11.1333 23.5733 14.96L21.7867 18.04L20 21.12C17.7867 24.9467 14.1733 24.9467 11.96 21.12L10.1733 18.04L8.38666 14.96C6.21333 11.1333 8.01333 8 12.44 8H16Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}

export default BackIcon