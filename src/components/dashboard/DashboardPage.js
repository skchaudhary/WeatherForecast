import React, { useState } from 'react';
import {removeUserSession, getToken } from "../../Utils/Common";
import axios from 'axios';
import './DashboardPage.css';

function DashboardPage(props) {
  const [data, setData] = useState({});
  const token = getToken();
  const [city, setCity] = useState("Lucknow");
  const [hasData, setHasData] = useState(false);
  const [isPast, setIsPast] = useState(false);

  var cityList = {};
  cityList['Lucknow']=[];
  cityList['Lucknow'][0] = "26.8467";
  cityList['Lucknow'][1] = "80.9462";

  cityList['Mumbai']=[];
  cityList['Mumbai'][0] = "19.0760";
  cityList['Mumbai'][1] = "72.8777";

  cityList['Bangalore']=[];
  cityList['Bangalore'][0] = "12.9716";
  cityList['Bangalore'][1] = "77.5946";

  cityList['Hyderabad']=[];
  cityList['Hyderabad'][0] = "17.3850";
  cityList['Hyderabad'][1] = "78.4867";

  var dateFormat = require('dateformat');
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  // handle click event of logout button
  const currentWeather = () => {
    const headers = {
      headers: { 'Authorization': `Bearer ${token}`}
    };

    
    axios.get(`http://localhost:8080/weather/forecast/current/${city}`, headers).then(
        response => {
            console.log(response.data)
            setData(response.data);
            setHasData(true);
            setIsPast(false);
        }).catch(error => {
            setData({"error": "Something went wrong. Please try again later."});
            setHasData(false)
        })
  }
  // handle click event of logout button
  const pastWeather = () => {
    const headers = {
      headers: { 'Authorization': `Bearer ${token}`}
    };

    
    axios.get(`http://localhost:8080/weather/forecast/past/${cityList[city][0]}/${cityList[city][1]}`, headers).then(
        response => {
            setHasData(false);
            console.log(response.data)
            setData(response.data);
            setIsPast(true);
        }).catch(error => {
            setData({"error": "Something went wrong. Please try again later."});
            setHasData(false)
        })
  }
  // handle click event of logout button
  const futureWeather = () => {
    const headers = {
      headers: { 'Authorization': `Bearer ${token}`}
    };

    
    axios.get(`http://localhost:8080/weather/forecast/future/${city}`, headers).then(
        response => {
            console.log(response.data)
            setData(response.data);
            setHasData(true);
            setIsPast(false);
        }).catch(error => {
            setData({"error": "Something went wrong. Please try again later."});
            setHasData(false)
        })
  }
 
  return (
    <div>
        <div>
            <table>
              <tbody>
                <tr>
                    <td>
                        <select name="city" id="cityList" value={city} onChange={e=>setCity(e.target.value)}>
                            <option value="Lucknow">Lucknow</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                        </select>
                    </td>
                    <td><input type="button" onClick={currentWeather} value="CurrentWeather" /></td>
                    <td><input type="button" onClick={pastWeather} value="PastWeather" /></td>
                    <td><input type="button" onClick={futureWeather} value="FutureWeather" /></td>
                    <td><input type="button" onClick={handleLogout} value="Logout"/></td>
                </tr>
              </tbody>
            </table>
        </div>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        {hasData?
          <div class="container-fluid px-1 px-md-4 py-5 mx-auto">
            <div class="row d-flex justify-content-center px-3">
                <div class="card">
                    <h2 class="ml-auto">{data.location.name}, {data.location.countryCode}</h2>
                    <p class="ml-auto">{data.weatherCondition}</p>
                    <h1 class="ml-auto">{data.maxTemperature}{data.tempUnit}</h1>
                    <h4 class="ml-auto">Humidity: {data.humidity} {data.humidityUnit}</h4>
                    <h4 class="ml-auto">Pressure: {data.phValue} {data.phValueUnit}</h4>
                    <p class="ml-auto">{dateFormat(data.calculationTime, "h:MM:ss TT")}</p>
                    <p class="ml-auto">{dateFormat(data.calculationTime, "dddd, mmmm dS, yyyy")}</p>
                </div>
            </div>
          </div> : isPast? 
          <div class="container-fluid px-1 px-md-4 py-5 mx-auto">
            <div class="row d-flex justify-content-center px-3">
                <div class="card">
                    <h2 class="ml-auto">{city}</h2>
                    <p class="ml-auto">{data.weatherCondition}</p>
                    <h4 class="ml-auto">Humidity: {data.humidity} {data.humidityUnit}</h4>
                    <h4 class="ml-auto">Pressure: {data.phValue} {data.phValueUnit}</h4>
                    <p class="ml-auto">{dateFormat(data.calculationTime, "h:MM:ss TT")}</p>
                    <p class="ml-auto">{dateFormat(data.calculationTime, "dddd, mmmm dS, yyyy")}</p>
                </div>
            </div>
          </div> : <p>Please selct Some city to get data...</p>
        }
    </div>
  );
}
 
export default DashboardPage;