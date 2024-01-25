import { useState, useEffect, useRef } from 'react'
import style from './Timer.module.css'
import logo from '../assets/logo.svg'
import start from '../assets/start.svg'
import pause from '../assets/pause.svg'

export const Timer = () => {
  const [isActive, setIsActive] = useState(false)
  const [initialMins, setInitialMins] = useState(10)
  const [secs, setSecs] = useState(initialMins * 60)
  const [warnVis, setWarnVis] = useState(0)
  const interval = useRef(null)

  useEffect(() => {
    if (secs === 0) {
      setIsActive(false)
      clearInterval(interval.current)
      interval.current = null
    }
  }, [secs])

  const handleInputChange = (e) => {
    const minutes = Math.min(Number(e.target.value), 99)

    if (!isActive) {
      setInitialMins(isNaN(minutes) ? 0 : minutes)
      setSecs(isNaN(minutes) ? 0 : minutes * 60)
    } else {
      setWarnVis(1)
      setTimeout(() => setWarnVis(0), 3000)
    }
  }

  const handleSubmit = () => {
    if (initialMins === 0) {
      setWarnVis(1)
      setTimeout(() => setWarnVis(0), 3000)
      return
    }

    setIsActive((prevState) => !prevState)

    if (!isActive && interval.current === null) {
      interval.current = setInterval(() => {
        setSecs((prevSecs) => {
          return prevSecs > 0 ? prevSecs - 1 : 0
        })
      }, 1000)
    } else {
      clearInterval(interval.current)
      interval.current = null
    }

    if (secs === 0) {
      setSecs(initialMins * 60)
    }
  }

  const addSpan = (string) => {
    return [...string].map((char, i) => (
      <span key={i} className={style.timerChar}>
        {char}
      </span>
    ))
  }

  const formatMins = (sec) => {
    const minutes = Math.floor(sec / 60)
    return addSpan(`${minutes}`.padStart(2, '0'))
  }

  const formatSecs = (sec) => {
    const seconds = sec % 60
    return addSpan(`${seconds}`.padStart(2, '0'))
  }

  return (
    <div className={style.main}>
      <img className={style.logo} src={logo} alt="logo"></img>
      <form>
        <div className={style.inputRow}>
          <span>Set timer for</span>
          <input
            className={style.inputTime}
            type="number"
            min="0"
            max="99"
            value={initialMins}
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()}
          />
          <span>minutes</span>
        </div>
      </form>
      <div className={style.countdown}>
        {formatMins(secs)}
        <span className={style.timerColon}>:</span>
        {formatSecs(secs)}
      </div>

      <button className={style.button} type="button" onClick={handleSubmit}>
        <img src={isActive ? pause : start} alt="play/pause" />
        {isActive ? 'Pause' : 'Start'}
      </button>

      <div
        className={style.warn}
        style={{
          opacity: warnVis,
          top: warnVis ? '40px' : '-40px',
          transition: 'all 0.3s ease',
        }}>
        {initialMins
          ? 'Please pause first to set new timer'
          : 'Please set minutes to start'}
      </div>
    </div>
  )
}
