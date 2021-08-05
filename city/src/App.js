import axios from 'axios';
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import form from 'react-bootstrap/Form'
import Weather from './components/Weather'
// import Movies from './components/Movies'
import 'bootstrap/dist/css/bootstrap.min.css';


export class Main extends Component {
  constructor(props) {
      super(props);
      this.state = {
          inputValue: '',
          cityName: {},
          weatherData: [],
          // moviesData:[],
          ErrorAlert: false,
          checkData: false,
      }
  }

  cityHandler = (e) => {
      this.setState({
          inputValue: e.target.value
      })
  }

  submitHandler = async (e) => {
      e.preventDefault();
      try {

          let cityName = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.inputValue}&format=json`)
          let weatherData = await axios.get(`https://city-explorer-api-heba.herokuapp.com/weather?searchQuery=${this.state.inputValue}&lat=${cityName.data[0].lat}&lon=${cityName.data[0].lon}`)
          // let moviesData = await axios.get(`https://city-explorer-api-heba.herokuapp.com/movies?searchQuery=${this.state.inputValue}`)
          this.setState({
              cityName: cityName.data[0],
              weatherData: weatherData.data,
              // moviesData: moviesData.data,
              ErrorAlert: false,
              checkData: true,
              
          })

      }
      catch {

          this.setState({
              checkData: false,
              ErrorAlert: true
          })
      }
  }


  render() {
      return (
          <main>
              <form  style={{padding: "10px", borderStyle: "outset" , width : "20rem" , margin: "20px auto" , textAlign: 'center'}} onSubmit={this.submitHandler}>
              <h2>City Explorer</h2>
              <br/>
              <br/>
                <label>Enter city Name</label>
                <br/>
                <br/>
                <input type="text" placeholder="example 'Amman'" onChange={this.cityHandler} />
                  <button variant="primary" type="submit">
                      Explore!
                  </button>
              </form >

              {this.state.checkData ?
                  <>

<Card style={{ width: '25rem' , margin:"30px" , padding: "10px", backgroundColor:" #e0e0d1" , float: 'left' }}>
        <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityName.lat},${this.state.cityName.lon}`} alt='' style={{ borderRadius: '10px' , height : '400px'}} />
        <Card.Body>
           <Card.Title>
          🗺  {this.state.cityName.display_name}
        
           </Card.Title>
            <Card.Text>
               📌 latitude:  {this.state.cityName.lat}
                <br />
                <br/>
               📌 longitude: {this.state.cityName.lon}
                <br/>
                <br/>
            </Card.Text>
        </Card.Body>
    </Card>

            <Weather weatherData={this.state.weatherData} />
                {/* <Movies moviesData={this.state.moviesData}/> */}
            </>
            : null
        }

              {
                  this.state.ErrorAlert ?
                      <Alert variant='ErrorAlert' style={{ width: '25rem' }}>
                          400 Bad Request Error ... Enter city name
                      </Alert> : null
              }

          </main >
      )
  }
}

export default Main