import React, { useEffect, useRef, useState } from "react";
import './index.css';
import snow_img from './Assets/snow.png';
import clear_img from './Assets/clear.png';
import cloud_img from './Assets/cloud.png';
import rain_img from './Assets/rain.png';  
import sun_img from './Assets/sun.png';  

export default function Weather() {
  const searchref = useRef();

  const allicon = {
    "01d": clear_img,
    "01n": clear_img,
    "02d": cloud_img,
    "02n": cloud_img,
    "03d": cloud_img,
    "03n": cloud_img,
    "04d": clear_img,
    "04n": clear_img,
    "09d": rain_img,
    "09n": rain_img,
    "10d": rain_img,
    "10n": rain_img,
    "13d": snow_img,
    "13n": snow_img
  };

  const [weatherdata, setWeatherData] = useState(null);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      
      const iconCode = data.weather[0].icon;
      const icon = allicon[iconCode] || sun_img;  

      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: data.main.temp,
        name: data.name,
        icon: icon
      });
      
    } catch (error) {
      alert("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="search-box">
      <input ref={searchref} placeholder="Search" />
      <img 
        src="/search.png" 
        alt="Search" 
        className="Search-img" 
        onClick={() => search(searchref.current.value)} 
      />
      
      
      {weatherdata && (
        <div className="icon-img">
          <img src={weatherdata.icon} alt="Weather Icon" className="Sun-img" />
          <p>{Math.floor(weatherdata.temperature)}°C</p>
          <p>{weatherdata.name}</p>
        </div>
      )}

      <div className="Col">
        <div>
          <img src="/humidity.png" alt="Humidity" className="humidity" />
          <p>{weatherdata ? weatherdata.humidity : '--'}%</p>
          <p>Humidity</p>
        </div>

        <div>
          <img src="/wind.png" alt="Wind" className="wind" />
          <p>{weatherdata ? weatherdata.wind : '--'} Km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

