import React from 'react';
import FormInfo from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoCard from './components/Card';
import WeatherCard from './components/Weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInfo: '',
      show: false,
      display: false,
      weatherArr: [],
      rend:false,
    }
  }

  setData = (data, showing) => {
    this.setState({
      dataInfo: data,
      show: true,
      display: showing,
    })
  }
  setWeatherArr = (weatherData, showing) => {
    this.setState({
      weatherArr: weatherData,
      rend: showing
    })
    console.log(this.state.weatherArr);
  }

  render() {
    return (
      <>
        <FormInfo setData={this.setData} setWeather={this.setWeatherArr} />
        {this.state.show &&
          <InfoCard data={this.state.dataInfo} display={this.state.display} />
        }

        {this.state.show===true && <WeatherCard display={this.state.rend} weatherData={this.state.weatherArr} />}
      </>
    )
  }
}

export default App;