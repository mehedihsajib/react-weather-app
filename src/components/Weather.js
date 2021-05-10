import React, { Component } from "react";
import axios from "axios";
import WeatherForm from "./WeatherForm";
import WeatherIcons from "./WeatherIcons";
import GetCalender from "./GetCalender";

const apiKey = "86288fe86b39a8af16aa77ef58c7086f";

class Weather extends Component {
  // States
  state = {
    city: "",
    country: "",
    temp: "",
    max_temp: "",
    min_temp: "",
    main: "",
    wind: "",
    humidity: "",
    description: "",
    weatherIcon: "",
    inputCity: "",
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.getWeather();

    this.setState({
      inputCity: "",
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      inputCity: e.target.value,
    });
  };

  // Getting weather from api.
  getWeather = () => {
    const { inputCity } = this.state;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        const city = response.data.name;
        const country = response.data.sys.country;
        const temp = Math.floor(response.data.main.temp);
        const main = response.data.weather[0].main;
        const wind = response.data.wind.speed;
        const humidity = response.data.main.humidity;
        const description = response.data.weather[0].description;
        const iconId = response.data.weather[0].id;

        this.setState({
          city: city,
          country: country,
          temp: temp,
          main: main,
          wind: wind,
          humidity: humidity,
          description: description,
        });

        // Set icon according to weather
        if (iconId >= 200 && iconId <= 232) {
          this.setState({
            weatherIcon: WeatherIcons.thunderstrom,
          });
        } else if (iconId >= 300 && iconId <= 321) {
          this.setState({
            weatherIcon: WeatherIcons.drizzle,
          });
        } else if (iconId >= 500 && iconId <= 531) {
          this.setState({
            weatherIcon: WeatherIcons.rain,
          });
        } else if (iconId >= 600 && iconId <= 622) {
          this.setState({
            weatherIcon: WeatherIcons.snow,
          });
        } else if (iconId >= 701 && iconId <= 781) {
          this.setState({
            weatherIcon: WeatherIcons.atmosphere,
          });
        } else if (iconId === 800) {
          this.setState({
            weatherIcon: WeatherIcons.clear,
          });
        } else if (iconId >= 801 && iconId <= 804) {
          this.setState({
            weatherIcon: WeatherIcons.clouds,
          });
        }
      })
      .catch((error) => {
        alert("Please enter the city name currectly");
      });
  };

  render() {
    // Destructuring states
    const {
      inputCity,
      city,
      country,
      weatherIcon,
      temp,
      main,
      description,
      humidity,
      wind,
    } = this.state;

    return (
      <>
        <WeatherForm
          getWeather={this.submitHandler}
          inputCity={inputCity}
          onChangeHandler={this.onChangeHandler}
        />

        <div className="container">
          <div
            className={
              main === "Thunderstrom"
                ? "weather-side thunderstrom"
                : main === "Drizzle"
                ? "weather-side drizzle"
                : main === "Rain"
                ? "weather-side rain"
                : main === "Snow"
                ? "weather-side snow"
                : main === "Atmosphere"
                ? "weather-side atmosphere"
                : main === "Clear"
                ? "weather-side clear"
                : main === "Clouds"
                ? "weather-side clouds"
                : "weather-side"
            }
          >
            <div className="weather-gradient"></div>
            <div className="date-container">
              <h2 className="date-dayname">{GetCalender(new Date())}</h2>
              {city ? (
                <span className="location">
                  {city}, {country}
                </span>
              ) : null}
            </div>
            <div className="weather-container">
              <i className={`weather-icon ${weatherIcon}`}></i>
              {this.state.temp ? (
                <h1 className="weather-temp">{temp}&deg;C</h1>
              ) : null}
              <h3 className="weather-desc">{main}</h3>
            </div>
          </div>
          <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="humidity">
                  {" "}
                  <span className="title">HUMIDITY:</span>
                  <span className="value">{humidity} %</span>
                  <div className="clear"></div>
                </div>
                <div className="wind">
                  {" "}
                  <span className="title">WIND:</span>
                  <span className="value">{wind} km/h</span>
                  <div className="clear"></div>
                </div>
                <div className="description">
                  {" "}
                  <span className="title">DESC:</span>
                  <span className="value">{description}</span>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Weather;
