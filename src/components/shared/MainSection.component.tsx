import { Box, BoxProps, styled } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store";
import Navbar from "./Navbar.component";
import SocialMediasPanel from "./SocialMediasPanel.component";

type MainSectionProps = {

} & BoxProps
const MainSection: React.FC<MainSectionProps> = ({
  children
}) => {
  const scrollHelper = useSelector((store: RootState) => store.scrollHelper)
  const dispatch = useDispatch<Dispatch>()

  const handleScroll = useCallback((e: any) => {
    dispatch.scrollHelper.setScrollEvent(e)
    dispatch.scrollHelper.setActiveSocialMedias(false)
    
    if(!scrollHelper.scrollContainerEl?.children.length) return

    let reachedIndex: number | undefined = undefined

    for(let i = 0; i<scrollHelper.scrollContainerEl.children.length-1; i++) {
      let extraOffset = 52
      switch(i) {
        case 1:
          extraOffset = scrollHelper.scrollContainerEl.children[i].clientHeight / 2
          break
      }
      // @ts-ignore
      if((scrollHelper.scrollContainerEl.scrollTop + scrollHelper.scrollContainerEl.clientHeight - extraOffset) >= scrollHelper.scrollContainerEl.children[i].offsetTop) {
        reachedIndex = i
      }
    }
    
    if(reachedIndex !== undefined && reachedIndex !== scrollHelper.activeIndex) {
      requestAnimationFrame(() => {
        dispatch.scrollHelper.setActiveIndex(reachedIndex!)
      })
    }
  }, [scrollHelper.scrollContainerEl, scrollHelper.activeIndex, dispatch.scrollHelper])

  return (
    <StyledBox component='main'>
      {/* Nav bar */}
      <Navbar />

      {/* Content */}
      <Box
        ref={dispatch.scrollHelper.setScrollContainer}
        className="content"
        component='section'
        onScrollCapture={handleScroll}>
          {children}
      </Box>

      {/* Social medias */}
      <SocialMediasPanel />
    </StyledBox>
  )
}

export default MainSection

const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  gap: '20px',
  alignItems: 'center',
  height: '100%',
  overflow: 'hidden',

  '& .content': {
    position: 'absolute',
    overflowX: 'hidden',
    display: 'grid',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    msOverflowStyle: 'none',
    scrollbarWidth: 'smooth',
    
    '&::-webkit-scrollbar' : {
      display: 'none'
    }
  }
})