import { Box, IconButton, styled, svgIconClasses } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useImmer } from "use-immer"
import { Dispatch, RootState } from "../../store"
import { colors } from "../../styles/colors"
import BackIcon from "../icons/Back.icon"
import GithubIcon from "../icons/Github.icon"
import LinkedInIcon from "../icons/LinkedIn.icon"
import MailFillIcon from "../icons/MailFill.icon"
import SocialMediaProfileIcon from "../icons/SocialMediaProfile.icon"
import Link from "../main/Link"

const SocialMediasPanel: React.FC = () => {
  const scrollHelper = useSelector((state: RootState) => state.scrollHelper)
  const dispatch = useDispatch<Dispatch>()
  const [transitionIn, setTransitionIn] = useImmer(false)

  useEffect(() => {
    setTransitionIn(true)
  }, [setTransitionIn])

  return (
    <StyledBox
      className={transitionIn ?  "is-visible" : ''}
      is_active={scrollHelper.activeSocialMedias ? 1 : 0}>
        <IconButton
          className="navigate-btn"
          onClick={_ => dispatch.scrollHelper.toggleActiveSocialMedias()}>
            <SocialMediaProfileIcon className="navigate-btn-icon" fill={ colors.secondary } />
            <BackIcon className="navigate-btn-icon" fill={ colors.secondary } sx={{ transform: 'rotateY(180deg)' }} />
        </IconButton>

        <Box className="social-medias-container">
          <Link href="mailto:waiphyo.995@gmail.com" target='_blank'>
            <MailFillIcon />
          </Link>

          <Link href="https://www.linkedin.com/in/waiphyo995/" target='_blank'>
            <LinkedInIcon />
          </Link>
          
          <Link href="https://github.com/waiphyo-0gravity" target='_blank'>
            <GithubIcon sx={{ fontSize: "20px" }}/>
          </Link>
        </Box>
    </StyledBox>
  )
}

export default SocialMediasPanel

const StyledBox = styled(Box)<{ is_active: number }>(({
  is_active
}) =>({
  position: 'absolute',
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'max-content max-content',
  alignItems: 'center',
  top: '24px',
  left: '12px',
  transform: 'translateY(-40px)',
  opacity: 0,
  transition: '1s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 10,

  '&.is-visible': {
    transform: 'none',
    opacity: 1
  },

  '& .navigate-btn': {
    position: 'relative',
    padding: 0,
    transition: '.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: is_active ? 'rotateZ(90deg) rotateY(180deg)' : 'none',
    zIndex: 1,
    width: '32px',
    height: '32px',
    transformStyle: 'preserve-3d',
    
    [`& .${svgIconClasses.root}`]: {
      fontSize: '32px'
    }
  },

  '& .navigate-btn-icon': {
    position: 'absolute',
    transition: '.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backfaceVisibility: 'hidden'
  },

  '& .social-medias-container': {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    width: is_active ? '112px' : '40px',
    visibility: is_active ? 'visible' : 'collapse',
    padding: '8px 12px',
    borderRadius: '99px',
    transition: '.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: is_active ? 1 : 0,
    transform: (
      is_active
      ? '' 
      : 'translateX(-28px)'
    ),

    '&::before': {
      content: "''",
      left: 0,
      right: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: colors.primary,
      zIndex: -1,
      filter: 'blur(2.5px)',
      borderRadius: '99px'
    }
  }
}))