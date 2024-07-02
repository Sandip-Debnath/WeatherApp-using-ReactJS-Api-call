import { useState } from 'react';
import './App.css';

function App() {
  let [city, setCity] = useState('');
  let [wdetails, setWdetails] = useState();
  let getData = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c`)
      .then((resp) => resp.json())
      .then((finalresp) => {
        if(finalresp.cod === "404"){
          setWdetails(undefined);
        }
        else{
          setWdetails(finalresp);
        }
      });
    event.preventDefault();
    setCity('');
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className='max-w-md w-full px-6 py-8 bg-white bg-opacity-50 rounded-lg shadow-lg backdrop-blur-sm'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Simple Weather App</h1>

        <form onSubmit={getData} className="flex items-center justify-center mb-6">
          <input 
            type='text' 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            className='w-2/3 h-12 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
            placeholder='Enter city name' 
          />
          <button className='w-1/3 h-12 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors'>Submit</button>
        </form>

        <div className='text-center'>
          {wdetails !== undefined
            ? (
              <div className='bg-white bg-opacity-75 p-6 rounded-lg shadow-inner backdrop-blur-sm'>
                <h3 className='text-2xl font-semibold text-gray-800 mb-2'>{wdetails.name}, <span className='text-lg font-medium text-gray-600'>{wdetails.sys.country}</span></h3>
                <h2 className='text-4xl font-bold text-gray-800 mb-4'>{Math.round(wdetails.main.temp - 273.15)}&deg;C</h2>
                <img className='mx-auto mb-4' src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`} alt='weather icon' />
                <p className='text-xl font-medium text-gray-700 capitalize'>{wdetails.weather[0].description}</p>
              </div>
            )
            : (
              <h3 className='text-xl font-medium text-gray-700'>No Data</h3>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
