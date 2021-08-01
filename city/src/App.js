import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';


export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      displayName:'',
      longitude:'',
      latitude:'',
      ErrorMSG: '',
      error:false,
      show:false,
    }
  }
  
  submitForm =(e)=>{
    this.setState({
      displayName: e.target.value,
      
    })
  }

  submitData=async (e)=>{
    e.preventDefault()
    try{ let  response= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.e266821f0ad39e21a46098fffe81ff92&city=${this.state.displayName}&format=json
    
    `)
   
    this.setState({
      displayName:  response.data[0].display_name,
      longitude:  response.data[0].lon,
      latitude:  response.data[0].lat, 
      show: true
      
      
    })
    }
    catch(ErrorMSG){
      this.setState({
        ErrorMSG: 'ERROR :Please Enter City Name',
        error: true
      })
    }
  }
  render() {
    return (
      <div>

        

        <form onSubmit={(e)=>{this.submitData(e)}}  style={{padding: "10px", borderStyle: "outset" , width : "20rem" , margin: "20px auto" }}>
          <label>City Explorer</label>
          <br/>
          <br/>
          <input type="text" placeholder="Enetr City Name " onChange={(e)=>{this.submitForm (e)}} />
          <button>Explore!</button>
        </form>

       {(this.state.show) &&
        <Card style={{ width: '25rem' , margin:"30px" , padding: "10px", backgroundColor:" #e0e0d1" }}>

  <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.e266821f0ad39e21a46098fffe81ff92
        &center=${this.state.latitude},${this.state.longitude}&zoom=15&format=png`} style={{ borderRadius: "8px" }} />
  <Card.Body>
    <Card.Title><h3>City: </h3>  {this.state.displayName}</Card.Title>
    <Card.Text>
    <h3>longitude:</h3> {this.state.longitude}
    </Card.Text>
    <Card.Text>
    <h3>latitude:</h3>  {this.state.latitude}
    </Card.Text>
  </Card.Body>
</Card>
     
        }

        {(this.state.error) &&
        <Alert variant={'danger'}>{this.state.ErrorMSG} </Alert>
        
        }
        
      </div>
    )
  }
}

export default App;