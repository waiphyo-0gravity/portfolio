import React from "react"
import { Box, styled } from '@mui/material'
import { BoxProps } from "@mui/system"
import fonts from "../../styles/fonts"
import { colors } from "../../styles/colors"
import ListMarkerIcon from "../icons/ListMarker.icon"

const ListItem: React.FC<BoxProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledBox
      component='li'
      {...props}>
        <ListMarkerIcon sx={{ width: '12px', height: '12px', marginTop: '4px' }}/>
        {children}
    </StyledBox>
  )
}

export default ListItem

const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  gap: '4px',
  alignItems: 'top',
  ...fonts.sm,
  color: colors["gray-300"],

  '&::marker': {
    content: '""'
  }
})