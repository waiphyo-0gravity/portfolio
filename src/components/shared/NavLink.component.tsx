import { Link, LinkProps, styled } from "@mui/material"
import { forwardRef } from "react"
import { colors, secondary } from "../../styles/colors"
import fonts from "../../styles/fonts"
import Typography from "../main/Typography"

type NavLinkProps = {
  isActive?: boolean
} & LinkProps
const NavLink: React.ForwardRefRenderFunction<any, NavLinkProps> = ({
  isActive,
  ...props
}, ref) => {
  return (
    <StyledLink
      ref={ref}
      {...props}>
        <Typography
          className="link-label"
          variant="lg"
          color={isActive ? 'gray-50' : 'gray-400'}
          fontWeight={700}
          family="MonomaniacOne-Regular">
            {props.title}
        </Typography>
        <span className="underline"/>
    </StyledLink>
  )
}

export default forwardRef(NavLink)

const StyledLink = styled(Link)({
  display: 'grid',
  gridTemplateColumns: 'max-content max-content',
  gap: '2px',
  padding: '10px',
  height: 'max-content',
  textDecoration: 'none',
  transition: '.6s ease-in-out',
  cursor: 'pointer',

  '& .link-label': {
    writingMode: 'vertical-rl',
    rotate: '-180deg',
    transition: '.3s ease-in-out',

    '&.active': {
      color: colors.white,
      ...fonts.lg
    }
  },
  
  '&:hover .underline': {
    animation: '.7s link-hover-animation cubic-bezier(0.53, 0.21, 0, 1)'
  },

  '&:active .link-label': {
    transform: 'scale(.96)'
  },

  '& .underline': {
    display: 'block',
    width: '2px',
    borderRadius: '99px',
    background: secondary,
    zIndex: '-1'
  },

  '@keyframes link-hover-animation': {
    '0%': {
      transform: 'scaleY(1)'
    },
    '1%': { transformOrigin: '0 0' },

    '50%': {
      transformOrigin: '0 0',
      transform: 'scaleY(0)'
    },

    '51%': {
      transformOrigin: '100% 100%',
    },

    '100%': {
      transformOrigin: '100% 100%',
      transform: 'scaleY(1)'
    }
  }
})