  
import React from 'react'
import WeatherDay from './WeatherDay'

export default function Weather(props) {
    return (
        <div className="weather-container">
            {props.weatherData.map((item, idx) => {
                return <WeatherDay
                key={idx}
                description={item.description}
                date={item.date}
                />
            })}

        </div>
    )
}