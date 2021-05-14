import React, { useEffect } from 'react'

const useVideoPause = (targetVideo, timesArray, questionDisplay) => {
  let speechTextId
  const ctx = new(window.AudioContext || window.webkitAudioContext);
  
  const handleSpeak = async() => {
    
    try {
      let speechResponse = await fetch(`/api/v1/questions/speak/${speechTextId}`)
      if(speechResponse.ok && ctx){
        const parsedSpeechResponse = await speechResponse.arrayBuffer();
        const decodedFile = await ctx.decodeAudioData(parsedSpeechResponse);
        const source = ctx.createBufferSource(); 
        source.buffer = decodedFile;
        source.connect(ctx.destination)
        source.start()
      } 
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(timesArray.length > 0) {
      
      targetVideo.current.addEventListener('play', (event) => {
        questionDisplay.current.innerHTML = ""
      })
      
      targetVideo.current.addEventListener('timeupdate', (event) => {
        if(timesArray.length > 0){
          if(event.currentTarget.currentTime > timesArray[0].vid_timestamp){
            event.currentTarget.pause();
            if(timesArray[0].body){
              const icon = document.createElement('i')
              icon.className="fas fa-volume-up fa-2x"
              icon.onmousedown=handleSpeak
              questionDisplay.current.innerHTML = `<p>${timesArray[0].body}</p>`
              questionDisplay.current.appendChild(icon)
            } 
            speechTextId = timesArray[0].id
            timesArray = timesArray.slice(1);  
          }
        }    
      })
    }
  })
}
export default useVideoPause
