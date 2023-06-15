import React from 'react'
import Typewriter from 'typewriter-effect'; 

const Subtitles = () => {
  return (
    <div className='flex flex-col items-center justify-center font-bold text-white text-center text-xl md:text-5xl'>
        <h2>LET <span className='font-normal'>GPTrip</span> BE YOUR GUIDE TO</h2>
        <Typewriter
            onInit={(typewriter) => {
                typewriter
                .typeString('STRESS-FREE TRAVEL PLANNING')
                .pauseFor(2500)
                .deleteAll()
                .typeString('AI-POWERED TRIP COORDINATION')
                .pauseFor(2500)
                .deleteAll()
                .typeString('PERSONALIZED TRAVEL RECOMMENDATIONS')
                .pauseFor(2500)
                .start();
            }}
            options={{
                autoStart: true,
                loop: true,
                delay: 75,
              }}
        />
    </div>
  )
}

export default Subtitles