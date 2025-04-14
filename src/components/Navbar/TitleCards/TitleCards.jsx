import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'

const TitleCards = ({title,category}) => {

      const [apiData, setApiData] = useState([]);
      const cardsRef = useRef();

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODc0ZGYwN2Y0Yzk2YjFhYjQwOThiYmZlMGU2YWE1OSIsIm5iZiI6MTc0NDY0NTg0Ni4yNjcsInN1YiI6IjY3ZmQyZWQ2YzFlMGE3MDhjYmFkMjdlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3q8MX2qm3y8J74cVPFUHPVc8rSQtm8y003DYq_x0Io'
        }
      };
      

    const handleWheel = (event) =>{
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

      cardsRef.current.addEventListener('wheel',handleWheel)
    },[])

  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className='card-list' ref={cardsRef}>
          {apiData.map((card, index) => {
            return <Link to={`/player/${card.id}`} className='card' key={index}>
               <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" /> 
               <p>{card.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards