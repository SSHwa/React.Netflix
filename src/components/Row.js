import axios from "../API/axios";
import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal/MovieModal";
import "./Row.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [MovieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log("request", request);
    return request;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      {/* TITLE */}
      <h2>{title}</h2>
      <div className="slider">
        {/* <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div> */}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          // spaceBetween={10}
          // slidesPerView={6}
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          <div id={id} className="row__posters">
            {/*SEVERAL ROW__POSTER */}
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${"https://image.tmdb.org/t/p/original/"}${
                    isLargeRow || movie.backdrop_path === null
                      ? movie.poster_path
                      : movie.backdrop_path
                  }`}
                  loading="lazy"
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        {/* <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div> */}
      </div>

      {modalOpen && (
        <MovieModal {...MovieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}

export default Row;
