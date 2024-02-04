import { useState } from 'react'
import { alarms } from '../helper/alarmSounds'
import alarm from '../assets/svg/alarm.svg'
import style from './Alarm.module.css'

export const Alarm = ({ alarmSound, setAlarmSound }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className={style.alarm}>
      <div
        className={style.alarmBtn}
        onClick={() => setShowDropdown((prev) => !prev)}>
        <img src={alarm} alt="alarm select" />
      </div>
      <div
        className={`${style.alarmDropdown} ${showDropdown ? style.show : ''}`}>
        <ul className={style.alarmList}>
          {alarms.map((alarm, i) => (
            <li
              key={i}
              className={`${style.listItem} ${alarmSound === alarm.sound ? style.active : ''}`}
              onClick={() => {
                setAlarmSound(alarm.sound)
                setShowDropdown(false)
              }}>
              {alarm.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
