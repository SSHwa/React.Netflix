import axios from "axios";

const instance = axios.creaete({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "f4f722a4b15f50c75289c574a4d60159",
    language: "ko-KR",
  },
});

export default instance;
