import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeatherDay(props) {
    return (

        <Card style={{ margin:"30px" , padding: "10px", backgroundColor:" #e0e0d1"  }} className='weather-card'>

<Card.Title><h4>Weather Status on {props.date} ๐กโ</h4></Card.Title>
                <Card.Text>๐งพ Description:{props.description} </Card.Text>
                <Card.Text>๐ Date:{props.date}</Card.Text>

          
        </Card>
    )
}