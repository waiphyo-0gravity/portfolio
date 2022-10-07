import { Button, styled } from "@mui/material"
import React from "react"
import Typography from "./Typography"

type VerticalTabProps = {
  title: string
  isActive?: boolean
}
const VerticalTab: React.FC<VerticalTabProps> = ({
  title,
  isActive
}) => {
  return (
    <StyledButton
      className={"vertical-tab" + (isActive ? ' active' : '')}>
        <Typography
          className="content-label"
          variant="base"
          color={isActive ? 'gray-50' : 'gray-400'}
          fontWeight={700}>
            {title}
        </Typography>
    </StyledButton>
  )
}

export default VerticalTab

const StyledButton = styled(Button)({
  transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  justifyContent: 'start',
  minWidth: 'auto',
  padding: 0,
  width: 'max-content',

  '& .content-label': {
    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
})