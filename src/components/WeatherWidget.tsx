'use client'

import { useState, useEffect } from 'react'

interface DayForecast {
  date: string
  dayName: string
  tempMax: number
  tempMin: number
  code: number
  precip: number
  wind: number
}

const WMO: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear', icon: '☀️' },
  1: { label: 'Mostly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  61: { label: 'Light rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Rain showers', icon: '🌧️' },
  82: { label: 'Heavy showers', icon: '🌧️' },
  85: { label: 'Snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm + hail', icon: '⛈️' },
  99: { label: 'Thunderstorm + hail', icon: '⛈️' },
}

function getWeatherInfo(code: number) {
  return WMO[code] ?? { label: 'Unknown', icon: '🌤️' }
}

function getDayName(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return d.toLocaleDateString('en', { weekday: 'short' })
}

export default function WeatherWidget({ lat, lng, locationName }: { lat: number; lng: number; locationName: string }) {
  const [forecast, setForecast] = useState<DayForecast[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Europe/Riga&forecast_days=5`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (!data.daily) { setError(true); return }
        const days: DayForecast[] = data.daily.time.map((date: string, i: number) => ({
          date,
          dayName: getDayName(date),
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weather_code[i],
          precip: data.daily.precipitation_sum[i],
          wind: Math.round(data.daily.wind_speed_10m_max[i]),
        }))
        setForecast(days)
      })
      .catch(() => setError(true))
  }, [lat, lng])

  if (error) return null
  if (!forecast) return (
    <div className="weather-widget">
      <div className="weather-loading">Loading forecast...</div>
    </div>
  )

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <span>5-Day Forecast &mdash; {locationName}</span>
      </div>
      <div className="weather-days">
        {forecast.map((d) => {
          const info = getWeatherInfo(d.code)
          return (
            <div className="weather-day" key={d.date}>
              <div className="wd-name">{d.dayName}</div>
              <div className="wd-icon">{info.icon}</div>
              <div className="wd-temps">
                <span className="wd-hi">{d.tempMax}°</span>
                <span className="wd-lo">{d.tempMin}°</span>
              </div>
              <div className="wd-label">{info.label}</div>
              {d.precip > 0 && <div className="wd-rain">{d.precip}mm</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
