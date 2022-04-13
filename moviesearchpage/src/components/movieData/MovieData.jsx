import React from 'react';

const MovieData = ({ data }) => {
  console.log(data);
  // data.title
  // data.summary
  // {data.genres.map((genre) => (
  //   <li>{genre}</li>
  // ))}
  return (
    <div className='movieBox'>
      <div className='top'></div>
      <div className='rect'>
        <img src={data.large_cover_image} />
        <div
          className='contentBox'
          style={{
            background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${data.large_cover_image})`,
          }}
        >
          <h3>{data.title}</h3>
          <ul>
            {data.genres.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
          <p>{data.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieData;
