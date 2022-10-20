import React, {useState} from "react";
import axios from "axios";



function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c4bf9d47683348643cb4094ff48ddc41&units=metric&lang=tr`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('');
      
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Lokasyon Girin"
        type="text"/>
      </div>
      <div className="container">


        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather.map(data => data.description).join(", ")}</p> : null}
          </div>
        </div>


        {data.name !== undefined &&
          <div className="bottom row">
            <div className="feels col-sm-4">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Hissediliyor</p>
            </div>
            <div className="humidity col-sm-4">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Nem</p>
            </div>
            <div className="wind col-sm-4">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Rüzgar Hızı</p>
            </div>
          </div>
        }


      </div>
    </div>
  );
}

export default App;
