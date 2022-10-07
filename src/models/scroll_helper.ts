import { createModel } from "@rematch/core";
import { RootModel } from ".";

type ScrollHelperState = {
  activeIndex: number,
  activeSocialMedias: boolean,
  scrollContainerEl?: HTMLDivElement,
  scrollEvent?: any
}
export const scrollHelper = createModel<RootModel>()({
  state: {
    activeIndex: 0,
    activeSocialMedias: false
  } as ScrollHelperState,
  reducers: {
    setActiveIndex(state, payload: number) {
      return {...state, activeIndex: payload}
    },
    setScrollContainer(state, payload?: HTMLDivElement) {
      return {...state,  scrollContainerEl: payload}
    },
    setScrollEvent(state, payload?: any) {
      return {...state, scrollEvent: payload}
    },
    setActiveSocialMedias(state, payload: boolean) {
      return { ...state, activeSocialMedias: payload }
    },
    toggleActiveSocialMedias(state) {
      return {
        ...state,
        activeSocialMedias: !state.activeSocialMedias
      }
    }
  }
})