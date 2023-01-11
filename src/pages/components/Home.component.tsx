import { Box, styled } from "@mui/material"
import React, { useEffect, useRef } from "react"
import Typography from "../../components/main/Typography"
import { CSSTransition } from 'react-transition-group'
import { useImmer } from "use-immer"
import { useIsInViewport } from "../../lib/useIsInViewport"
import MailIcon from "../../components/icons/Mail.icon"
import Button from "../../components/main/Button"
import { colors } from "../../styles/colors"

const Home: React.FC = () => {
  const [transitionIn, setTransitionIn] = useImmer(false)
  const containerRef = useRef<any>()
  const isVisible = useIsInViewport(containerRef)

  useEffect(() => {
    const words = document.getElementsByClassName('name-word')
    const nameLabel = document.getElementsByClassName('name-label')

    for(let i = 0; i < words.length; i++) {
      const nameWord = words[i]

      nameWord.addEventListener('mouseover', _ => {
        handleMouseOverNameWord(i, words)
      })
    }

    nameLabel[0].addEventListener('mouseleave', () => {
      for(let i = 0; i < words.length; i++) {
        words[i].classList.remove('active-main', 'active-adjacent-1')
      }
    })
  }, [])

  useEffect(() => {
    if(!isVisible) return

    setTransitionIn(true)
  }, [isVisible, setTransitionIn])

  const handleSendMail = () => {
    window.open('mailto:waiphyo.995@gmail.com', '_blank')
  }

  const handleMouseOverNameWord = (currentIndex: number, words: HTMLCollectionOf<Element>) => {
    for(let i = 0; i < words.length; i++) {
      words[i].classList.remove('active-main', 'active-adjacent-1')

      if(i !== currentIndex) {
        if((currentIndex - 1 === i || currentIndex + 1 === i) && currentIndex !== i) {
          words[i].classList.add('active-adjacent-1')
        }
      } else {
        words[i].classList.add('active-main')
      }
    }
  }

  return (
    <CSSTransition
      in={transitionIn}
      timeout={0}
      classNames='home'
      appear>
        {() => (
          <StyledBox ref={containerRef}>
            <Typography
              className="first-label"
              variant="4xl"
              color='gray-50'
              fontWeight={700}
              display='flex'>
                Hi
                <span className="hand-label">👋</span>, I’m
            </Typography>
            <Typography
              className="name-label"
              color='primary'
              fontWeight={700}>
                <span className="name-word">W</span>
                <span className="name-word">a</span>
                <span className="name-word">i</span>
                &nbsp;
                <span className="name-word">P</span>
                <span className="name-word">h</span>
                <span className="name-word">y</span>
                <span className="name-word">o</span>
            </Typography>
            <Typography className="pasion-label" variant="3xl" color='gray-100' fontWeight={700}>I love complex things.</Typography>
            <Typography className="info-label" variant="lg" color='gray-400' marginTop='8px'>I’m a Software Developer from Myanmar. And have great interest in iOS and full-stack development </Typography>
            
            <Button
              alignSelf='start'
              marginTop='24px'
              className="send-mail-btn"
              onClick={handleSendMail}
              fontWeight='700!important'>
                <MailIcon />
                Say hi!
            </Button>
          </StyledBox>
        )}
    </CSSTransition>
  )
}

export default Home

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  justifyContent: 'center',
  minHeight: '100vh',
  height: 'max-content',
  padding: '52px 24px 52px 72px',
  marginLeft: 'calc(15% + 22px)',
  // paddingLeft: '72px',
  maxWidth: 'calc(484px + 72px)',

  '& *': {
    transition: '1s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '& .hand-label': {
    transition: '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    margin: '0 0 0 -35px',
    overflow: 'hidden',
    opacity: 0
  },

  '& .name-label': {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '66px',
    lineHeight: '76px',
    alignSelf: 'start',
    cursor: 'pointer',

    '& *': {
      opacity: 0,
      transform: 'translateX(-45px) scale(0) rotate(-10deg)'
    },
  },

  '& .name-word': {
    '&.active-main': {
      fontSize: '77px',
      color: colors.secondary
    },

    '&.active-adjacent-1': {
      fontSize: '71px',
      color: '#F9BC9B',
    }
  },

  '& .send-mail-btn': {
    opacity: 0,
    transform: 'translateY(40px) translateX(20px)',
    transition: 'scale .1s ease, opacity 1s cubic-bezier(0.4, 0, 0.2, 1) .5s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) .5s!important'
  },

  '& .first-label': {
    opacity: 0,
    transform: 'translate(-25px, -45px) rotate(-2deg)'
  },

  '& .pasion-label': {
    opacity: 0,
    transform: 'translateX(25px) rotate(2deg)'
  },

  '& .info-label': {
    opacity: 0,
    transform: 'translateY(45px) rotate(-2deg)'
  },

  '&.home-enter-done': {
    '& .first-label': {
      opacity: 1,
      transform: 'none'
    },

    '& .pasion-label': {
      transitionDelay: '.2s',
      opacity: 1,
      transform: 'none'
    },

    '& .info-label': {
      transitionDelay: '.4s',
      opacity: 1,
      transform: 'none'
    },

    '& .hand-label': {
      animation: '1s hand-animation forwards 1.2s',
    },

    '& .send-mail-btn': {
      transform: 'translateY(0)',
      opacity: 1
    },

    '& .name-label': {
      '& :nth-of-type(1)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .3s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.3s',
        opacity: 1,
        transform: 'none'
      },
      '& :nth-of-type(2)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .34s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.34s',
        opacity: 1,
        transform: 'none'
      },
      '& :nth-of-type(3)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .38s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.38s',
        opacity: 1,
        transform: 'none'
      },
      '& :nth-of-type(4)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .42s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.42s',
        opacity: 1,
        transform: 'none'
      },
      '& :nth-of-type(5)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .46s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.46s',
        opacity: 1,
        transform: 'none'
      },
      '& :nth-of-type(6)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .50s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.50s',
        opacity: 1,
        transform: 'none'
      },
      '& :nth-of-type(7)': {
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) .54s, font-size 0.2s ease-in-out, color 0.2s ease-in-out 0s',
        // transitionDelay: '.54s',
        opacity: 1,
        transform: 'none'
      },
    },

    '@keyframes hand-animation': {
      '25%': {
        marginLeft: '0',
        opacity: '1',
        transform: 'scale(0.8) rotate(25deg)'
      },

      '50%': {
        transform: 'scale(1.4) rotate(-25deg)'
      },

      '75%': {
        transform: 'scale(1.2) rotate(20deg)'
      },

      '100%': {
        marginLeft: '0',
        transform: 'scale(1)',
        opacity: '1'
      }
    }
  },

  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    marginRight: '20px',
  }
}))