import React from 'react'
import Movie from './Movie'
export default function Movies(props) {

    
    return (
        <div className="movies-container">
            <h1>Movies</h1>
            {props.moviesData.map((elem, idx) => {
                return <Movie
                released_on = {elem.released_on}
                title= {elem.title}
                overview= {elem.overview}
                average_votes= {elem.average_votes}
                popularity= {elem.popularity}
                image_url = {elem.image_url}
                />

            })}
        </div>
    )
}