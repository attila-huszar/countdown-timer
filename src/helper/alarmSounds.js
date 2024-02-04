import ambient from '../assets/sounds/ambient.mp3'
import clock from '../assets/sounds/clock-alarm.mp3'
import digital from '../assets/sounds/digital-alarm.mp3'
import marimba from '../assets/sounds/marimba.mp3'
import spaceStation from '../assets/sounds/space-station.mp3'

export const alarms = [
  { name: 'Ambient', sound: ambient },
  { name: 'Alarm Clock', sound: clock },
  { name: 'Digital Alarm', sound: digital },
  { name: 'Marimba', sound: marimba },
  { name: 'Space Station', sound: spaceStation },
  { name: 'No Sound' },
].map((el) => {
  return { name: el.name, sound: new Audio(el.sound) }
})
