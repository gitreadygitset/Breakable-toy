import React, { useEffect } from 'react'

const useVideoPause = (targetVideo, timesArray) => {
  useEffect(() => {
    if(timesArray.length > 0) {
      targetVideo.current.addEventListener('timeupdate', (event) => {
        if(event.currentTarget.currentTime > timesArray[0]){
          event.currentTarget.pause();
          timesArray = timesArray.slice(1);
        }
      })
    }
  })
}
export default useVideoPause
