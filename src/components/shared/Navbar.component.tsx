import { Box, styled } from "@mui/material"
import React, { useEffect, useRef } from "react"
import { useMemo } from "react"
import { createRef } from "react"
import { useSelector } from "react-redux"
import { useImmer } from "use-immer"
import { RootState } from "../../store"
import { primary } from "../../styles/colors"
import NavLink from "./NavLink.component"

const navigations = ['Home', 'About', 'Experience', 'Creations']

const Navbar: React.FC = () => {
  const scrollHelper = useSelector((state: RootState) => state.scrollHelper)
  const navRefs: any = useRef(navigations.map(_ => createRef()))
  const [transitionIn, setTransitionIn] = useImmer(false)

  useEffect(() => {
    setTransitionIn(true)
  }, [setTransitionIn])

  const activeMarkerData = useMemo(() => {
    const currentRef = navRefs.current[scrollHelper.activeIndex].current
    
    return {
      height: currentRef?.clientHeight,
      offsetTop: currentRef?.offsetTop
    }
  }, [scrollHelper.activeIndex])

  const handleActiveIndexChanged = (index: number) => {
    // dispatch.scrollHelper.setActiveIndex(index)
    
    requestAnimationFrame(() => {
      scrollHelper.scrollContainerEl?.children[index].scrollIntoView({ 'behavior': 'smooth' })
    })
  }

  return (
    <StyledBox component='nav' className={transitionIn ?  "is-visible" : ''}>
      {/* Links */}
      <Box className="links-container" component='section'>
        {/* Active marker */}
        <Box className="active-marker" sx={{ height: activeMarkerData.height ?? '56px', top: activeMarkerData.offsetTop ?? 0 }}/>

        {/* Links */}
        {
          navigations.map((nav, index) => (
            <NavLink
              className="link"
              key={index}
              ref={navRefs.current[index]}
              title={nav}
              isActive={scrollHelper.activeIndex === index}
              onClick={_ => handleActiveIndexChanged(index)}
              sx={{
                transitionDelay: `${index * 0.2}s`
              }}/>
          ))
        }
      </Box>
    </StyledBox>
  )
}

export default Navbar

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  transition: '0.3s cubic-bezier(0.53, 0.21, 0, 1)',
  transform: 'translateX(-20px)',
  opacity: 0,

  '&.is-visible': {
    transitionDelay: '.25s',
    transform: 'none',
    opacity: 1,

    '& .link': {
      transform: 'none',
      opacity: 1,
    }
  },

  '& .links-container': {
    display: 'grid',
    gap: '24px',
    zIndex: 1
  },

  '& .link': {
    transform: 'translateX(-40px)',
    opacity: 0,
  },

  '& .active-marker': {
    background: primary,
    position: 'absolute',
    borderRadius: '0 12px 12px 0',
    width: '48px',
    zIndex: 0,
    cursor: 'pointer',
    transition: '0.3s cubic-bezier(0.53, 0.21, 0, 1)',

    '&::before': {
      content: `url('${process.env.PUBLIC_URL}/images/ActiveNavCurve.svg')`,
      position: 'absolute',
      top: '-25px',
      left: 0
    },

    '&::after': {
      content: `url('${process.env.PUBLIC_URL}/images/ActiveNavCurve.svg')`,
      position: 'absolute',
      bottom: '-25px',
      transform: 'rotateX(180deg)',
      left: 0
    }
  },

  [theme.breakpoints.down('xs')]: {
    marginTop: '78px'
  }
}))