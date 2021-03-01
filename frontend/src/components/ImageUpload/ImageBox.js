import React from 'react';

const ImageBox = ({ pictures }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={pictures} width='500px' heigh='auto'/>
      </div>
    </div>
  );
}

export default ImageBox;