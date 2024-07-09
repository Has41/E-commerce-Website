import React from 'react';

const RangeSlider = ({ minValue, maxValue, onMinChange, onMaxChange }) => {

  const handleMinChange = (e) => {
    const newMinValue = parseInt(e.target.value)

    if (newMinValue < 40) {
      onMinChange(newMinValue)
    } else {
      onMinChange(40)
    }
  }

  const handleMaxChange = (e) => {
    const newMaxValue = parseInt(e.target.value)

    if (newMaxValue > 60) {
      onMaxChange(newMaxValue)
    } else {
      onMaxChange(60)
    }
  }

  return (
    <div className="w-[90%] mt-4">
      <div className='flex items-center justify-center'>
        <div className='flex items-center gap-3'>
          <span className='lg:text-lg text-sm  font-semibold'>Min</span>
          <input
            type="number"
            className='lg:w-[60px] w-[40px] lg:text-lg text-xs appearance-none outline-none text-center rounded-md'
            onChange={handleMinChange}
            value={minValue}
          />
        </div>
        <div className='w-[50px] lg:text-2xl text-base flex items-center justify-center'>-</div>
        <div className='flex items-center gap-3'>
          <span className='lg:text-lg text-sm font-semibold'>Max</span>
          <input
            type="number"
            className='lg:w-[60px] w-[50px] lg:text-lg text-xs outline-none appearance-none text-center rounded-md'
            onChange={handleMaxChange}
            value={maxValue}
          />
        </div>
      </div>
      <div className='relative h-[5px] rounded-sm bg-slate-200 mt-8 slider'>
        <div
          className='h-[5px] rounded-sm bg-amber-500 absolute left-[25%] right-[25%] progress'
          style={{
            left: `${(minValue / 100) * 100}%`,
            right: `${100 - (maxValue / 100) * 100}%`,
          }}
        ></div>
      </div>
      <div className='relative'>
        <input
          type="range"
          className='absolute top-[-5px] h-[5px] w-full appearance-none pointer-events-none bg-transparent'
          min={0}
          max={100}
          value={minValue}
          onChange={handleMinChange}/>
        <input
          type="range"
          className='absolute top-[-5px] h-[5px] w-full appearance-none pointer-events-none bg-transparent'
          min={0}
          max={100}
          value={maxValue}
          onChange={handleMaxChange}/>
      </div>
    </div>
  );
}

export default RangeSlider;
