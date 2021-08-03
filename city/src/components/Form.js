import React from 'react';
import form from 'react-bootstrap/Form';
import button from 'react-bootstrap/Button';
import axios from 'axios';

let serverRoute = process.env.REACT_APP_SERVER;


class FormInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            locationResult:'',
        }
    }

    getInput = (event) => {
        let searchRequest = '';
        searchRequest = event.target.value;
        this.setState({
            searchInput: searchRequest,
        })
    }
    getData = async (e) => {
        e.preventDefault();
        let reqUrl = `https://eu1.locationiq.com/v1/search.php?key=pk.b63c5ecf5d90031a016f3169a46a0e31&q=${this.state.searchInput}&format=json`;
        try{

        let result = await axios.get(reqUrl);
      
        this.setState({
        locationResult:result.data[0],
        })
        this.props.setData(this.state.locationResult,true);
        }catch(error){
           this.props.setData(error,false);
        }
        try{
            let weatherData = await axios.get(`http://localhost:3001/weather?searchQuery=${this.state.searchInput}&long=${this.state.locationResult.lon}&lat=${this.state.locationResult.lat}`);
            this.props.setWeather(weatherData.data,true);
            console.log(serverRoute);
        }catch(e){
            console.log(e.response);
            this.props.setWeather(e.response,false);
        }
    }
    render() {
        return (
            <>
         <form  onSubmit={this.getData}  style={{padding: "10px", borderStyle: "outset" , width : "20rem" , margin: "20px auto" }}>
          <label>City Explorer</label>
          <br/>
          <br/>
          <input type="text" placeholder="Enetr City Name " onChange={this.getInput} />
          <button>Explore!</button>
        </form>
        
                   
            </>
        )
    }
}
export default FormInfo;