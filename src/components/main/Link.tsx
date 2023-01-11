import { Link as MUILink, LinkProps as MUILinkProps,styled } from '@mui/material'
import { secondary } from '../../styles/colors'

type LinkPropsProps = {
  linkDecorationColor?: string
} & MUILinkProps
const Link: React.FC<LinkPropsProps> = ({
  linkDecorationColor,
  children,
  ...props
}) => {
  return (
    <StyledLink link_color={linkDecorationColor} { ...props }>
      {children}
    </StyledLink>
  )
}

export default Link

const StyledLink = styled(MUILink)<{ link_color?: string }>(({
  link_color
}) =>({
  textDecoration: 'none',
  position: 'relative',

  '&::after': {
    position: 'absolute',
    content: '""',
    height: '2px',
    width: '100%',
    bottom: 0,
    left: 0,
    zIndex: 0,
    background: link_color ?? secondary,
    transform: 'scaleX(0)',
    transformOrigin: '100% 100%',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '&:hover::after': {
    transformOrigin: '0 0',
    transform: 'scaleX(1)',
  },

  '@keyframes indicator-animation': {
    '0%': {
      transformOrigin: '0 0',
      transform: 'scaleX(0)'
    },
    '100%': {
      transform: 'scaleX(1)'
    }
  }
}))