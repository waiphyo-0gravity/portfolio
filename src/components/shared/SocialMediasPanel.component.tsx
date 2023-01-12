import { Box, IconButton, Stack, styled, svgIconClasses, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect, useRef } from "react"
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
import Typography from "../main/Typography"
import astronautAnimationData from '../../lotties/astronaut-with-space-shuttle.json'
import socialMediaAnimationData from '../../lotties/social-media.json'
import Lottie, { Options } from 'react-lottie'

const SocialMediasPanel: React.FC = () => {
  const scrollHelper = useSelector((state: RootState) => state.scrollHelper)
  const dispatch = useDispatch<Dispatch>()
  const [transitionIn, setTransitionIn] = useImmer(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const astronautLottieOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: astronautAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const socialMediaLottieOptions: Options = {
    loop: false,
    autoplay: false,
    animationData: socialMediaAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

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
            <BackIcon className="navigate-btn-icon" fill={ colors.white } sx={{ transform: 'rotateY(180deg)' }} />
        </IconButton>

        <Box className="social-medias-container">
          <Box className="social-medias">
            <Lottie
              isStopped={!scrollHelper.activeSocialMedias}
              options={socialMediaLottieOptions}
              width={300}
              height={40}
              style={{
                margin: '0 0 16px 0',
                transform: 'translateX(-35%)'
              }}/>

            <Link
              className="social-media-link"
              href="mailto:waiphyo.995@gmail.com"
              target='_blank'
              linkDecorationColor={colors.primary}>
                <MailFillIcon fill={colors.white}/>
                <Typography variant="xl" color='white'>
                  Mail
                </Typography>
            </Link>

            <Link
              className="social-media-link"
              href="https://www.linkedin.com/in/waiphyo995/"
              target='_blank'
              linkDecorationColor='#0077b5'>
                <LinkedInIcon />
                <Typography variant="xl" color='white'>
                  LinkedIn
                </Typography>
            </Link>
            
            <Link
              className="social-media-link"
              href="https://github.com/waiphyo-0gravity"
              target='_blank'
              linkDecorationColor='#333'>
                <GithubIcon sx={{ fontSize: "20px" }}/>
                <Typography variant="xl" color='white'>
                  Github
                </Typography>
            </Link>
          </Box>

          <Lottie
            options={astronautLottieOptions}
            width={200}
            height={200}
            style={{
              position: 'absolute',
              left: isMobile ? 'calc(120px + 100px)' : 'calc(50% - 50px)',
              bottom: 0
            }}/>
        </Box>
    </StyledBox>
  )
}

export default SocialMediasPanel

const StyledBox = styled(Box)<{ is_active: number }>(({
  is_active,
  theme
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
    flexDirection: 'column',
    position: 'absolute',
    top: '-240px',
    left: '-120px',
    gap: '8px',
    width: is_active ? 'calc(100vh + 240px - 24px)' : '40px',
    height: is_active ? 'calc(100vh + 240px - 24px)' : '40px',
    maxWidth: '800px',
    maxHeight: '800px',
    visibility: is_active ? 'visible' : 'collapse',
    padding: '8px 12px',
    borderRadius: '999px',
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
      background: colors.secondary,
      zIndex: -1,
      filter: 'blur(2.5px)',
      borderRadius: '999px',
    }
  },

  '& .social-medias': {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '50%',
    marginTop: 'calc((50% / 5) + 240px)',
    alignItems: 'start',
    gap: '16px'
  },

  '& .social-media-link': {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    transition: '.3s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      transform: 'scale(1.1)'
    }
  },

  [`${theme.breakpoints.down('md')}`]: {
    '& .social-medias': {
      marginLeft: 'calc(120px + 120px)'
    }
  }
}))