import React, { useState, useRef, useEffect } from 'react';
import './css/styles.css';

import json from './api/cars.json';

function App() {
  const [filter, setFilter] = useState(String);
  const [jsonFiltered, setJsonFiltered] = useState(json);
  const [scrollMobileIndex, setScrollMobileIndex] = useState(Number);
  const [scrollValue, setScrollValue] = useState(Number);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const ref = useRef(null);

  useEffect(() => {
    if(scrollValue >= 0 && scrollValue < windowSize.current[0]) {
      setScrollMobileIndex(0);
    } else if(scrollValue >= windowSize.current[0] && scrollValue < windowSize.current[0] * 2) {
      setScrollMobileIndex(1);
    } else if(scrollValue >= windowSize.current[0] * 2 && scrollValue < windowSize.current[0] * 3) {
      setScrollMobileIndex(2);
    } else if(scrollValue >= windowSize.current[0] * 3 && scrollValue < windowSize.current[0] * 4) {
      setScrollMobileIndex(3);
    } else if(scrollValue >= windowSize.current[0] * 4 && scrollValue < windowSize.current[0] * 5) {
      setScrollMobileIndex(4);
    } else if(scrollValue >= windowSize.current[0] * 5 && scrollValue < windowSize.current[0] * 6) {
      setScrollMobileIndex(5);
    } else if(scrollValue >= windowSize.current[0] * 6 && scrollValue < windowSize.current[0] * 7) {
      setScrollMobileIndex(6);
    } else if(scrollValue >= windowSize.current[0] * 7) {
      setScrollMobileIndex(7);
    } 
  }, [scrollValue])

  const handleScroll = (event) => {
    setScrollValue(event.currentTarget.scrollLeft);
  }

  const scrollHorizontal = (scrollOffset: number) => {
    ref.current.scrollLeft += scrollOffset;
  }

  const scrollHorizontalMobile = (scrollOffset: number, k:number) => {
    ref.current.scrollLeft = scrollOffset;
    setScrollMobileIndex(k);
  }

  const search = () => {
    if(filter === '') {
      setJsonFiltered(json);
    } else {
      const result = json.filter(item => item.bodyType === filter);
      setJsonFiltered(result);
    }
  }

  const refresh = () => {
    setJsonFiltered(json);
    setFilter('');
  }

  return (
    <div className='app'>
      <div className='filter'>
        <input onChange={e => setFilter(e.target.value)} value={filter} placeholder="What you're looking for?" />
        <div onClick={search} className='searchbutton'>
          <img width={20} height={20} src='/images/search.png' />
        </div>
      </div>

      {jsonFiltered.length > 1 ?
        <>
          <div onScroll={handleScroll} className='list' ref={ref}>
            {jsonFiltered.map((item, k) => (
              <div style={{width: windowSize.current[0]}} className='item' key={k}>
                <div className='header'>
                  <span className='title'>{item.bodyType}</span>

                  <div className='subtitle'>
                    <span className='bold'>{item.modelName}</span>
                    <span className='regular'>{item.modelType}</span>
                  </div>
                </div>

                <img width={350} height={250} className='image' id="image" src={item.imageUrl} />
                <img width={windowSize.current[0] - 40} height={250} className='imagemobile' src={item.imageUrl} />

                <div className='buttons'>
                  <a href={'/learn/'+item.id} className='button'>
                    <span className='buttontext'>LEARN</span>
                    <img width={12} height={12} className='smallleft' src='../../svg/chevron-small.svg' />
                  </a>

                  <a href={'/shop/'+item.id} className='button'>
                    <span className='buttontext'>SHOP</span>
                    <img width={12} height={12} className='smallright' src='../../svg/chevron-small.svg' />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className='navigation'>
            <div onClick={() => scrollHorizontal(-320)} className='navbutton'>
              <img width={50} height={50} className='left' src='../../svg/chevron-circled.svg' />
            </div>

            <div onClick={() => scrollHorizontal(320)} className='navbutton'>
              <img width={50} height={50} className='right' src='../../svg/chevron-circled.svg' />
            </div>
          </div>

          <div className='navigationmobile'>
            {jsonFiltered.map((item, k) => (
              <div style={{backgroundColor: scrollMobileIndex === k ? '#000' : '#ccc'}} onClick={() => scrollHorizontalMobile(windowSize.current[0] * k, k)} key={k} className='navigationdot'></div>
            ))}
          </div>
        </>
        :
        <div className='notfound'>
          <span>Sorry, you can't find anything with this name in our database.</span>

          <div onClick={refresh} className='notfoundbutton'>Refresh</div>
        </div>
      }
    </div>
  );
}

export default App;
