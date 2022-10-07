import React, { forwardRef } from "react"
import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material'
import fonts from "../../styles/fonts"
import { colors } from "../../styles/colors"
import font_families from "../../styles/font_families"

export type TypographyProps = {
  variant?: keyof typeof fonts,
  family?: keyof typeof font_families,
  color?: keyof typeof colors
} & Omit<MUITypographyProps, 'color' | 'variant'>
const Typography: React.ForwardRefRenderFunction<any, TypographyProps> = ({
  variant = 'base',
  family,
  color = 'gray-400',
  ...props
}, ref) => {
  return (
    <MUITypography
      {...props}
      ref={ref}
      sx={{
        ...fonts[variant],
        color: colors[color],
        fontFamily: family,
        ...props.sx,
      }}/>
  )
}

export default forwardRef(Typography)