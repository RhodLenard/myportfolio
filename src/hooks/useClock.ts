import { useEffect, useState } from 'react'

function timeIn(timeZone: string) {
  try { return new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date()) }
  catch { return '--:--' }
}

export function useClock(timeZone: string) {
  const [time, setTime] = useState(() => timeIn(timeZone))
  useEffect(() => {
    const tick = () => setTime(timeIn(timeZone))
    tick()
    const timer = window.setInterval(tick, 30_000)
    return () => window.clearInterval(timer)
  }, [timeZone])
  return time
}
