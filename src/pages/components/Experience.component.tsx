import { Box, Stack, styled } from "@mui/material"
import React, { useEffect, useMemo, useRef } from "react"
import { useImmer } from "use-immer"
import Link from "../../components/main/Link"
import ListItem from "../../components/main/ListItem"
import Typography from "../../components/main/Typography"
import VerticalTab from "../../components/main/VerticalTab"
import VerticalTabs from "../../components/main/VerticalTabs"
import ContentTitle from "../../components/shared/ContentTitle.component"
import { useIsInViewport } from "../../lib/useIsInViewport"
import { colors, primary } from "../../styles/colors"

const Experience: React.FC = () => {
  const [transitionIn, setTransitionIn] = useImmer(false)
  const [tab, setTab] = useImmer(0)
  const boxRef = useRef<any>()
  const isVisible = useIsInViewport(boxRef)

  const tabs = useMemo(() => {
    return Object.keys(Experiences)
  }, [])

  useEffect(() => {
    if(!isVisible) return

    setTransitionIn(true)
  }, [isVisible, setTransitionIn])

  return (
    <StyledBox 
      className={transitionIn ? 'is-visible' : ''}
      is_first_tab_active={tab === tabs.length-1 ? 1 : 0}
      is_last_tab_active={tab === 0 ? 1 : 0}>
        <ContentTitle title={'Experience'} className={transitionIn ? 'is-visible' : ''}/>

        <Box ref={boxRef} className="content-body">
          {/* Tabs */}
          <VerticalTabs
            className={"vertical-tabs" + (transitionIn ? ' is-visible' : '')}
            tab={tab}
            onChange={setTab}>
              {tabs.map((key, i) => (
                <VerticalTab key={i} title={key} isActive={i === tab}/>
              ))}
          </VerticalTabs>

          {/* Tabs' panel */}
          <Box className={"tab-panel-container" + (transitionIn ? ' is-visible' : '')}>
            {tabs.map((key, i) => {
              const data = Experiences[key]
              return (
                <TabPanel
                  key={i}
                  isActive={i === tab && transitionIn}
                  company={key}
                  {...data}/>
              )  
            })}
          </Box>
        </Box>
    </StyledBox>
  )
}

export default Experience

type TabPanelProps = {
  isActive?: boolean
  company: string,
} & ExperienceType
const TabPanel: React.FC<TabPanelProps> = ({
  isActive,
  company,
  ...experience
}) => {
  return (
    <Box className={"tab-panel" + (isActive ? ' active' : '')}>
      <Stack direction='column' gap='4px'>
        {/* Company name */}
        <Typography variant="lg" fontWeight={700} color='gray-100'>
          {experience.title}&nbsp;
          <Link href={experience.link} target='__blank'>
            <span style={{ color: primary }}>{company}</span>
          </Link>
        </Typography>

        {/* Duration */}
        <Typography color='gray-400'>{experience.duration}</Typography>
      </Stack>
      
      {/* Descriptions */}
      <Stack
        gap='16px'
        direction='column'
        component='ul'
        margin='0'
        padding='0'>
          {experience.descriptions.map((description, index) => (
            <ListItem
              key={index}
              className='description-label'
              sx={{
                transitionDelay: isActive ? (index * .2) + 's!important' : 0
              }}>
                <Typography variant="base" color='gray-400'>{description}</Typography>
            </ListItem>
          ))}
      </Stack>
    </Box>
  )
}

const StyledBox = styled(Box)<{ is_first_tab_active: number, is_last_tab_active: number }>(({
  theme,
  is_first_tab_active,
  is_last_tab_active
}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  alignItems: 'start',
  justifyContent: 'start',
  minHeight: '100vh',
  height: 'max-content',
  padding: '52px 0',
  marginLeft: '15%',
  paddingLeft: '72px',
  maxWidth: 'calc(700px + 72px)',

  '& .content-body': {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    gap: '46px',
    alignItems: 'start',
    position: 'relative',

    '& > *': { transition: '1s cubic-bezier(0.4, 0, 0.2, 1)' },

    '& .vertical-tabs': {
      opacity: 0,
      transform: 'translateX(-20px)',

      '&.is-visible': {
        transitionDelay: '.4s',
        opacity: 1,
        transform: 'none'
      }
    },
  },

  '& .tab-panel-container': {
    display: 'grid',
    transform: 'translateY(20px)',
    opacity: 0,

    '&.is-visible': {
      transitionDelay: '.2s',
      transform: 'none',
      opacity: 1
    }
  },

  '& .tab-panel': {
    display: 'grid',
    gap: '24px',
    height: 0,
    overflow: 'hidden',
    position: 'relative',

    '&::before': {
      content: "''",
      position: 'absolute',
      height: '56px',
      borderRadius: '99px',
      width: '1px',
      background: colors["gray-200"],
      top: '6px'
    },

    '& .description-label': {
      transition: '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
      transform: 'translateX(20px)',
    }
  },
  
  '& .tab-panel.active': {
    padding: '6px 12px',
    height: 'auto',

    '& .description-label': {
      transform: 'none',
      opacity: 1
    }
  },

  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    marginRight: '20px',

    '& .content-body': {
      gridTemplateColumns: '1fr',

      '&::before,::after': {
        content: "''",
        position: 'absolute',
        width: '20px',
        height: '40px',
        zIndex: 1
      },

      '&::before': {
        display: is_first_tab_active ? 'none' : 'block',
        left: '-1px',
        background: `linear-gradient(to right, ${colors["slate-900"]}, transparent)`
      },

      '&::after': {
        display: is_last_tab_active ? 'none' : 'block',
        right: '-1px',
        background: `linear-gradient(to right, transparent, ${colors["slate-900"]})`
      }
    }
  }
}))

type ExperienceType = {
  title: string,
  duration: string,
  link: string,
  descriptions: React.ReactNode[]
}
const Experiences: {[key: string]: ExperienceType} = {
  'One Terrace': {
    title: 'Software Development Engineer @',
    duration: 'NOV 2021 - PRESENT',
    link: 'https://oneterrace.jp',
    descriptions: [
      'Crafted a Housing Service React app from scratch for both client and server side.',
      <>
        Collaborate with team members to deliever an &nbsp;
        <Link href='https://online.businessjapanese.jp/login' target='_blank'>Online Learning System</Link>
        , both on client and server side</>
    ]
  },
  'Amdon': {
    title: 'Software Development Engineer @',
    duration: 'SEP 2017 - OCT 2021',
    link: 'https://www.amdon.com',
    descriptions: [
      'Worked closely with designers and team leader to define a rich iOS experience for the users',
      'Developed multiple apps from scratch, and maintained applications using Xcode, interface builder, Cocoa Touch and other iOS development tools.',
      'Collaborate as a member of Scrum agile team to get products developed and completed.',
      'Discussed with QA team to get more suitable, reliable and testable architecture design pattern.',
      'Implemented complex UIs and animations for rich experience.',
      <>
        Performed as key player to deliever&nbsp;
        <Link href='https://apps.apple.com/us/app/nodma-reader/id1515688650' target='_blank'>NODMA Reader</Link>,&nbsp;
        <Link href='https://apps.apple.com/mu/app/classwerkz/id1439046073' target='_blank'>ClassWerkz</Link> &nbsp;
        and&nbsp; <Link href='https://apps.apple.com/us/app/stemwerkz/id1545876287' target='_blank'>STEMWerkz</Link>
      </>
    ]
  },
  'Information Matrix': {
    title: 'Software Engineering Intern @',
    duration: 'MAY 2017 - JUL 2017',
    link: 'https://www.amdon.com/',
    descriptions: [
      'Delievered an ASP.NET web app that manage staffs\' information.'
    ]
  }
}