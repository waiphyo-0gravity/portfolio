import { Box, styled } from "@mui/material"
import React, { useEffect, useRef } from "react"
import { useImmer } from "use-immer"
import GithubIcon from "../../components/icons/Github.icon"
import Link from "../../components/main/Link"
import Typography from "../../components/main/Typography"
import ContentTitle from "../../components/shared/ContentTitle.component"
import { useIsInViewport } from "../../lib/useIsInViewport"
import { colors } from "../../styles/colors"

const Creations: React.FC = () => {
  const [transitionIn, setTransitionIn] = useImmer(false)
  const boxRef = useRef<any>()
  const isVisible = useIsInViewport(boxRef)

  useEffect(() => {
    if(!isVisible) return

    setTransitionIn(true)
  }, [isVisible, setTransitionIn])

  return (
    <StyledBox className={transitionIn ? 'is-visible' : ''}>
      <ContentTitle ref={boxRef} title={'Creations'} className={transitionIn ? 'is-visible' : ''}/>

      {/* Project Feature Album */}

      {/* Project grid */}
      <Box className="project-grid" component='section'>
        {PROJECTS.map((project, index) => (
          <Box key={index} className='project-container' sx={{ transitionDelay: `${index * 0.3}s!important` }}>
            {project.topStack}

            <Typography variant="xl" color='gray-50' marginTop='6px'>
              {project.title}
            </Typography>

            {project.content}

            <Typography variant="sm" color='gray-400' marginTop='24px'>
              {project.frameworks}
            </Typography>
          </Box>
        ))}
      </Box>
    </StyledBox>
  )
}

export default Creations

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'max-content max-content',
  alignItems: 'start',
  justifyContent: 'start',
  minHeight: '100vh',
  height: 'max-content',
  padding: '52px 0 98px 0',
  marginLeft: '15%',
  paddingLeft: '72px',
  maxWidth: 'calc(800px + 72px)',

  '& .project-grid': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px',
    marginTop: '24px'
  },

  '& .project-container': {
    display: 'grid',
    gridTemplateRows: 'max-content max-content 1fr max-content',
    background: colors["slate-800"],
    borderRadius: '12px',
    padding: '12px',
    transform: 'translateY(40px)',
    opacity: 0,
    transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '&.is-visible .project-container': {
    opacity: 1,
    transform: 'none'
  },

  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    marginRight: '20px',

    '& .project-grid': {
      gridTemplateColumns: '1fr'
    }
  }
}))

const PROJECTS = [
  {
    title: 'MovieTV',
    topStack: (
      <Link href='https://github.com/waiphyo-0gravity/MovieTV' target='_blank' justifySelf='end'>
        <GithubIcon id="0"/>
      </Link>
    ),
    content: (
      <Typography variant="sm" color="gray-400">
        A VIPER architecture iOS application to show movie information from&nbsp;
        <Link href="https://developers.themoviedb.org/3" fontWeight={700}>TMDB</Link>
        &nbsp;API.
      </Typography>
    ),
    frameworks: 'Swift'
  },
  {
    title: 'Currency convector',
    topStack: (
      <Link href='https://github.com/waiphyo-0gravity/currency-converter' target='_blank' justifySelf='end'>
        <GithubIcon id="1"/>
      </Link>
    ),
    content: (
      <Typography variant="sm" color="gray-400">
        An iOS application that will help to calculate between currencies using&nbsp;
        <Link href="http://api.currencylayer.com" fontWeight={700}>Currency Data API</Link>&nbsp;. And it also support during offline.
      </Typography>
    ),
    frameworks: 'Swift, Realm, XCTest'
  },
  {
    title: 'Portfolio',
    topStack: (
      <Link href='https://github.com/waiphyo-0gravity/portfolio' target='_blank' justifySelf='end'>
        <GithubIcon id="2"/>
      </Link>
    ),
    content: (
      <Typography variant="sm" color="gray-400">
        My own portfolio web app.
      </Typography>
    ),
    frameworks: 'React, Material-UI'
  }
]