import React, { useEffect, useState } from 'react';
import './App.css';
import MovieDatas from './components/movieDatas/MovieDatas.jsx';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year&limit=50`,
        {
          method: 'GET',
        }
      );

      const datas = await response.json();
      setDatas(datas.data.movies);
      setLoading(false);
    };

    getDatas();
  }, []);

  console.log(datas);

  return (
    <div>
      <div>{loading ? 'loading...' : <MovieDatas datas={datas} />}</div>
    </div>
  );
};

export default App;
