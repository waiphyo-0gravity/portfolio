import { Stack } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import Typography from "../components/main/Typography"
import MainSection from "../components/shared/MainSection.component"
import { RootState } from "../store"
import About from "./components/About.component"
import Creations from "./components/Creations.component"
import Experience from "./components/Experience.component"
import Home from "./components/Home.component"

const MainPage: React.FC = () => {
  const scrollContainerEl = useSelector((state: RootState) => state.scrollHelper.scrollContainerEl)

  return (
    <MainSection>
      <Home />
      <About />
      <Experience />
      <Creations />

      {/* Footer */}
      <Stack
        alignItems='center'
        justifySelf='center'
        alignSelf='center'
        margin='-72px 0 24px 0'>
          <Typography variant="sm" color='gray-400'>Built and designed with ❤️ by Wai Phyo.</Typography>
          <Typography variant="sm" color='gray-400'>All rights reserved. ©</Typography>
      </Stack>
    </MainSection>
  )
}

export default MainPage