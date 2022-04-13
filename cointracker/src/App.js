import React, { memo, useEffect, useState } from 'react';
import './App.css';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [upDown, setUpDown] = useState([]);

  useEffect(() => {
    // fetch('https://api.coinpaprika.com/v1/tickers', {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     Origin: 'http://localhost:3000/',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setCoins(json);
    //     setLoading(false);
    //   });

    const getCoinDatas = async () => {
      const response = await fetch(
        'https://api.coinpaprika.com/v1/tickers?limit=50',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Origin: 'http://localhost:3000/',
          },
        }
      );

      const datas = await response.json();

      let upDownDatas = [];
      for (let i = 0; i < 50; i++) {
        if (datas[i].quotes.USD.price === coins[i]?.quotes?.USD?.price) {
          upDownDatas.push(1);
        } else if (datas[i].quotes.USD.price > coins[i]?.quotes?.USD?.price) {
          upDownDatas.push(true);
        } else {
          upDownDatas.push(false);
        }
      }
      setUpDown(upDownDatas);
      setCoins(datas);
      setLoading(false);
    };

    let timer = setInterval(() => {
      getCoinDatas();
    }, 1000);

    return () => clearInterval(timer);
  }, [coins]);

  return (
    <div>
      {loading ? <strong>Loading...</strong> : null}
      <h1>
        The Coins Top {loading ? '' : `${coins.length}`} Tracker
        <span>
          (Up and Down Mark Comparing the price with the price of 24 hours ago)
        </span>
        <span>(The price is being updated every seconds)</span>
        <span>
          (When price goes up, background-color turn into &ensp;
          <p className='blue'>Blue</p>)
        </span>
        <span>
          (When price goes down, background-color turn into &ensp;
          <p className='red'>Red</p>)
        </span>
      </h1>
      <ul>
        {coins.map((coin) => (
          <li
            style={
              upDown[coins.indexOf(coin)] === 1
                ? { backgroundColor: 'transparent' }
                : upDown[coins.indexOf(coin)] === true
                ? { backgroundColor: 'lightblue' }
                : { backgroundColor: 'lightcoral' }
            }
          >
            <img
              src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            />
            <div>
              <span>
                {coin.name} ({coin.symbol})&ensp;:&ensp;
              </span>
              <span className='price'>$ {coin.quotes.USD.price} (USD)</span>
            </div>
            <span className='longAgoPrice'>
              {coin.quotes.USD.percent_change_24h === 0 ? (
                ''
              ) : coin.quotes.USD.percent_change_24h > 0 ? (
                <ArrowDropUpIcon
                  style={{
                    fontSize: '3rem',
                    position: 'absolute',
                    right: '0',
                    top: '25%',
                    color: 'lightsteelblue',
                  }}
                />
              ) : (
                <ArrowDropDownIcon
                  style={{
                    fontSize: '3rem',
                    position: 'absolute',
                    right: '0',
                    top: '25%',
                    color: 'salmon',
                  }}
                />
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
