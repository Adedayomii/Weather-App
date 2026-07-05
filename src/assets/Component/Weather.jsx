import SearchIcon from '../images/search.svg';
import Sunshine from '../images/sun.webp';
import Humidity from '../images/humidity.jpg';
import WindSpeed from '../images/wind-speed.jpeg';
import './weather.css';
import { useState } from 'react';
import axios  from 'axios';

export function Weather () {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');


  function inputData (event) {
    setLocation(event.target.value);

  }

  function enterKey (event) {
    if (event.key === 'Enter') {
      sendLocation()
    }

  }

  function sendLocation () {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}
                  &appid=${API_KEY}&units=metric`;

    axios.get(url).then((response)=>{
      setData(response.data);
      setError('');
    }) 
    .catch(() => {
     setError('City not found');
  });

  }


  return (
    <section className='weather-app'>
      <div className="app-container">
        <div className="search-box-container">
          <input type="text" 
                 className='input-box' 
                 placeholder='Search'
                 onChange={inputData}
                 onKeyDown={enterKey}     
          />
          <div className="search-button-container">
            <button className='search-button' onClick={sendLocation}>
              <img src={SearchIcon} className='searchIcon'/>
            </button>
          </div>
        </div>
        
        {error && <p className="error-message">{error}</p>}

        <div className="sunshine-container">
           
          <img src={data.name ? `https://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png` : Sunshine} alt='weather icon' className='sunshine' />

        </div>

        <div className="location-temperature">{data.main?.temp}°C</div>

        <div className="location">{data.name}</div>

        <div className="humidity-windSpeed-container">
              <div className='humidity-container'>
                <div className='humidity-image-container'>
                    <img src={Humidity} className='humidity-image' />
                </div>
                    <div className="humidity-volume-container">
                      <p>{data.main?.humidity}%</p>
                      <p className='humidity'>Humidity</p>
                    </div>
              </div>

              <div className="wind-speed-container">
                <div className='windspeed-image-container'>
                  <img src={WindSpeed} className='windspeed-image' />
                </div>

                <div className="humidity-volume-container">
                  <p>{data.wind?.speed ? (data.wind.speed * 3.6).toFixed(1): ""} km/h</p>
                  <p className='wind'>Wind Speed</p>

                </div>
                  
              </div>
        </div>
      </div>
    </section>
  );
}