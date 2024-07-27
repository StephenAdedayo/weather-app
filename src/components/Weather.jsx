import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

const Weather = () => {

      const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allICons = {
        '01d' : '/clear.png',
        '01n' : '/clear.png',
        '02d' : '/cloud.png',
        '02n' : '/cloud.png',
        '03d' : '/cloud.png',
        '03n' : '/cloud.png',
        '04d' : '/drizzle.png',
        '04n' : '/drizzle.png',
        '09d' : '/rain.png',
        '09n' : '/rain.png',
        '10d' : '/rain.png',
        '10n' : '/rain.png',
        '13d' : '/snow.png',
        '13n' : '/snow.png',


    }

   const search = async (city) => {
    if(city === ''){
        alert('please enter a city')
        return
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

        const response = await fetch(url)
        const data = await response.json()
         
        if(!response.ok){
            alert(data.message)
            return
        }
        console.log(data);
        const icon = allICons[data.weather[0].icon] || '/clear.png'
        setWeatherData({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temperature:Math.floor(data.main.temp),
            location:data.name,
            icon:icon
        })
    } catch (error) {
        
    }
   }

   useEffect(() => {
     search('london')
   }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
   <input ref={inputRef} type="text" placeholder='search' />
   <img src="/search.png" alt="" onClick={() => search(inputRef.current.value)}/>
      </div>

{weatherData ? <>

    <img src={weatherData.icon} alt="" className='weather-icon'/>
<p className='temperature'>{weatherData.temperature}</p>
<p className='location'>{weatherData.location}</p>


<div className='weather-data'>

<div className="col">
    <img src="/humidity.png" alt="" />
    <div>
        <p>{weatherData.humidity}%</p>
        <span>Humidity</span>
    </div>   
</div>


<div className="col">
    <img src="/wind.png" alt="" />
    <div>
        <p>{weatherData.windSpeed}km/hr</p>
        <span>Wind Speed</span>
    </div>   
</div>

</div>


</> : <></>}



    </div>
  )
}

export default Weather
