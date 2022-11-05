import { Box, Stack, styled } from "@mui/material"
import React, { forwardRef } from "react"
import TitleLeftSeparator from "../icons/TitleLeftSeparator.icon"
import TitleRightSeparator from "../icons/TitleRightSeparator.icon"
import Typography from "../main/Typography"

type ContentTitleProps = {
  title: string,
  className?: string
}
const ContentTitle: React.ForwardRefRenderFunction<any, ContentTitleProps> = ({
  title,
  className
}, ref) => {
  return (
    <StyledBox ref={ref} className={'content-title' + (className ? ` ${className}` : '')} >
      <TitleLeftSeparator className="left-separator" sx={{ fill: 'none', width: '19px', height: '3px', marginTop: '5px', overflow: 'visible' }}/>
      <Typography className="title-label" variant="2xl" color='gray-50' fontWeight={700} sx={{ padding: '0 4px 0 2px' }}>{title}</Typography>
      <TitleRightSeparator className="right-separator" />
    </StyledBox>
  )
}

export default forwardRef(ContentTitle)

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'max-content max-content 1fr',

  '& *': {
    transition: '1s cubic-bezier(0.4, 0, 0.2, 1)!important',
  },

  '& .title-label': {
    opacity: 0,
    transform: 'scale(0.5)'
  },

  '& .left-separator': {
    opacity: 0,
    transform: 'translateX(-25px)'
  },

  '& .right-separator': {
    opacity: 0,
    transform: 'translateX(25px)',
    fill: 'none',
    width: '100%',
    height: 'auto',
    overflow: 'visible',
    alignSelf: 'center' 
  },

  '&.is-visible': {
    '& .left-separator, .right-separator, .title-label': {
      opacity: 1,
      transform: 'none'
    }
  }
}))