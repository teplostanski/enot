import { useState, useEffect } from 'react'

const useRerender = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [scroll, setScroll] = useState(0)

  const [scrollH, setScrollH] = useState(0)

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  const handleScrollH = () => {
    setScrollH(window.scrollX)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollH)
    return () => window.removeEventListener('scroll', handleScrollH)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions)

    return () => {
      window.removeEventListener('resize', setWindowDimensions)
    }
  }, [])

  return {
    windowHeight,
    windowWidth,
    scroll,
    scrollH,
  }
}

export default useRerender
