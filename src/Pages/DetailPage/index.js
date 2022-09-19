import axios from "../../API/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
      console.log(request.data);
    }

    fetchData();
  }, [movieId]);

  if (!movie || movie.backdrop_path === null) return <div>...loading</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
      {movieId}
    </section>
  );
}

export default DetailPage;
