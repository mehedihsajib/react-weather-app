const WeatherForm = ({ getWeather, onChangeHandler, inputCity }) => {
  return (
    <form className="weather-form" onSubmit={getWeather}>
      <input
        type="text"
        className="form-input"
        placeholder="Enter city name..."
        onChange={onChangeHandler}
        value={inputCity}
      />

      <input type="submit" value="Get Weather" className="form-submit" />
    </form>
  );
};

export default WeatherForm;
