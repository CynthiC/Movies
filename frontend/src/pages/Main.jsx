import React from 'react'
import Navbar from '../components/Navbar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase-config';


export default function Main() {
  console.log(auth.currentUser)
  const [movies, setMoviesData] = useState([])
  const [user, setUser] = useState({})


useEffect(()=>{
  const getMovies = async () => {
    const url= `https://api.themoviedb.org/3/movie/popular?api_key=5c50f145cf5f45743b12cfd9ef2a7284`
    await axios.get(url).then((response)=>setMoviesData(response.data.results))
  }
  getMovies();
},[])

useEffect(() => {
  setUser(JSON.parse(localStorage.getItem('usuarioLogeado')))
}, [])

console.log(movies);

  return (
    <div>
      <Navbar></Navbar>
      {
        user.emailVerified ?
        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {movies.map((movie,index)=>{
          return(
            <a href="/" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={movie.images} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
            </div>
        </a>
          )
        })}
      </div> 
      :<h1>Verifique su cuenta Para ver las peliculas</h1>
      }
       
    </div>
  )
}
