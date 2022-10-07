import { Box, Stack, styled } from "@mui/material"
import React, { useEffect, useMemo, useRef } from "react"
import { useImmer } from "use-immer"
import Link from "../../components/main/Link"
import ListItem from "../../components/main/ListItem"
import Typography from "../../components/main/Typography"
import ContentTitle from "../../components/shared/ContentTitle.component"
import { useIsInViewport } from "../../lib/useIsInViewport"

const About: React.FC = () => {
  const [transitionIn, setTransitionIn] = useImmer(false)
  const boxRef = useRef<any>()
  const isVisible = useIsInViewport(boxRef)

  useEffect(() => {
    if(!isVisible) return

    setTransitionIn(true)
  }, [isVisible])

  return (
    <StyledBox className={transitionIn ? 'is-visible' : ''}>
      {/* Title */}
      <ContentTitle ref={boxRef} title={'About me'} className={transitionIn ? 'is-visible' : ''}/>

      {/* Content */}
      <Stack ref={boxRef} direction='column' gap='16px' marginLeft='20px'>
        <Typography className="briefing-label" variant="lg">
          I’m currently a full-stack & iOS developer at <Link href='#' fontWeight={700}>One Terrace</Link>. 
          And also a Software Developer with a Bachelor of Science focused in Computer Software Engineering from {<Link href='#' fontWeight={700}>UCSM</Link>}.
        </Typography>
        <Typography className="technologies-label">
          Here are some technologies I have been working with:
        </Typography>

        {/* Technologies list */}
        <Box className="technologies-container">
          <Stack component='ul' className="list-container">
            <ListItem>Javascript</ListItem>
            <ListItem>React.js</ListItem>
            <ListItem>HTML & CSS</ListItem>
          </Stack>
          <Stack component='ul' className="list-container">
            <ListItem>Swift</ListItem>
            <ListItem>Node.js</ListItem>
            <ListItem>Laravel</ListItem>
          </Stack>
        </Box>

        {/* Out of work */}
        <Typography className="out-of-work-label" variant='lg' marginTop='8px'>
          Outside of work, I'm interested in following the developments of science. I also play a lot of video games.
        </Typography>
      </Stack>
    </StyledBox>
  )
}

export default About

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  justifyContent: 'center',
  minHeight: '100vh',
  height: 'max-content',
  padding: '52px 0',
  marginLeft: '15%',
  paddingLeft: '72px',
  maxWidth: 'calc(506px + 72px)',

  '& *': {
    transition: '1s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '& .briefing-label, .technologies-label, .technologies-container, .out-of-work-label': {
    opacity: 0,
    transform: 'translateX(-25px)'
  },

  '& .technologies-container': {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content',
    gap: '50px'
  },

  '& .list-container': {
    flexDirection: 'column',
    gap: '12px',
    padding: 0,
    margin: 0
  },

  // Visible animations
  '&.is-visible': {
    '& .briefing-label': {
      transitionDelay: '.2s',
      opacity: 1,
      transform: 'none',
    },

    '& .technologies-label': {
      transitionDelay: '.3s',
      opacity: 1,
      transform: 'none',
    },

    '& .technologies-container': {
      transitionDelay: '.4s',
      opacity: 1,
      transform: 'none',
    },

    '& .out-of-work-label': {
      transitionDelay: '.5s',
      opacity: 1,
      transform: 'none',
    }
  },

  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    marginRight: '20px',
  }
}))