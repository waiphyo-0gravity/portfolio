import { Box, BoxProps, styled } from "@mui/material"
import React from "react"
import { colors } from "../../styles/colors"
import fonts from "../../styles/fonts"

const Button: React.FC<BoxProps> = ({
  ...props
}) => {
  return (
    <StyledBox
      component='button'
      {...props}/>
  )
}

export default Button

const StyledBox = styled(Box)({
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '8px',
  background: 'transparent',
  border: 'none',
  alignItems: 'center',
  ...fonts.base,
  fontWeight: 500,
  color: colors["gray-100"],
  cursor: 'pointer',
  transition: 'scale .1s ease-in-out',
  position: 'relative',

  '&::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: colors.primary,
    zIndex: -1,
    borderRadius: '8px'
  },

  '&:active': {
    transform: 'scale(.96)'
  },

  '&:hover::before': {
    filter: 'blur(2.5px)'
  }
})