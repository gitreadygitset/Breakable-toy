import { useEffect } from 'react'

const useVideoPause = (targetVideo, timesArray, questionDisplay) => {
  
  useEffect(() => {
    if(timesArray.length > 0) {
      
      targetVideo.current.addEventListener('play', (event) => {
        console.log("triggered")
        questionDisplay.current.innerHTML = ""
      })
      
      targetVideo.current.addEventListener('timeupdate', (event) => {
        if(timesArray.length > 0){
          if(event.currentTarget.currentTime > timesArray[0].vid_timestamp){
            event.currentTarget.pause();
            if(timesArray[0].body){
              questionDisplay.current.innerHTML = `<p>${timesArray[0].body}</p>`
            } 
            timesArray = timesArray.slice(1);  
          }
        }    
      })
    }
  })
}
export default useVideoPause
