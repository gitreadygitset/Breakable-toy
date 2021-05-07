import React, { useState, useEffect } from 'react'

const useVideoPause = (targetVideo, timesArray) => {
  
  useEffect(() => {
    console.log("useEffect")
    targetVideo.current.addEventListener('timeupdate', (event) => {
      if(event.currentTarget.currentTime > timesArray[0]){
        event.currentTarget.pause();
        timesArray = timesArray.slice(1);
      }
    })
  },[])
}

export default useVideoPause
