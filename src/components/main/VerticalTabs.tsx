import { Box, BoxProps, styled } from "@mui/material"
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { primary } from "../../styles/colors"

type VerticalTabsProps = {
  tab: number,
  onChange?: (tab: number) => void
} & Omit<BoxProps, 'onChange'>
const VerticalTabs: React.FC<VerticalTabsProps> = ({
  tab,
  children,
  onChange,
  ...props
}) => {
  const containerEl = useRef<HTMLElement | undefined>()

  const selectedTabPoints = useMemo(() => {
    const verticalTab = containerEl.current?.querySelectorAll('.vertical-tab')?.[tab]
    verticalTab?.getBoundingClientRect()
    const width = ((verticalTab?.clientWidth ?? 0) + 32) + 'px'
    // @ts-ignore
    const offsetLeft = ((verticalTab?.offsetLeft ?? 0) - 16) + 'px'
    // @ts-ignore
    const offsetTop =((verticalTab?.offsetTop ?? 0) - 8) + 'px'

    return {
      width,
      offsetTop,
      offsetLeft
    }
  }, [tab, containerEl.current])
  
  useEffect(() => {
    const verticalTabs = containerEl.current?.querySelectorAll('.vertical-tab')
    
    verticalTabs?.forEach((tab, index) => {
      tab.addEventListener('click',(e) => {
        
        onChange?.(index)
      })
    })

    return () => {
      verticalTabs?.forEach(tab => {
        tab.removeEventListener('click', () => {})
      })
    }
  }, [onChange])

  useLayoutEffect(() => {
    const verticalTabs = containerEl.current?.querySelectorAll('.vertical-tab')

    if(!verticalTabs) return

    // @ts-ignore
    containerEl.current.scrollLeft = verticalTabs[tab].offsetLeft - 16

  }, [containerEl.current, tab])

  return (
    <StyledBox {...props} ref={containerEl}>
      <Box
        className="active-marker"
        sx={{
          width: selectedTabPoints.width,
          top: selectedTabPoints.offsetTop,
          left: selectedTabPoints.offsetLeft,
        }}/>
      <Box className="tabs-container">
        {children}
      </Box>
    </StyledBox>
  )
}

export default VerticalTabs

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  padding: '8px 16px',
  position: 'relative',
  gridTemplateColumns: 'max-content',
  scrollBehavior: 'smooth',

  '&::-webkit-scrollbar' : {
    display: 'none'
  },

  '& .active-marker': {
    height: '40px',
    filter: 'blur(3px)',
    borderRadius: '99px',
    background: primary,
    position: 'absolute',
    transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '& .tabs-container': {
    display: 'grid',
    gap: '24px',
  },

  [theme.breakpoints.down('md')]: {
    overflowX: 'auto',

    '& .tabs-container': {
      display: 'inline-flex',
      direction: 'rtl'
    },
  }
}))