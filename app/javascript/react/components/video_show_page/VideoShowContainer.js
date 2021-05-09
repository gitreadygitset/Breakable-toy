import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import VideoSharesContainer from './VideoSharesContainer'
import VideoQuestionsContainer from './VideoQuestionsContainer'
import ErrorList from '../ErrorList'
import QuestionDisplay from './QuestionDisplay'
import useVideoPause from '../../useEffect/useVideoPause'
import createQuestion from '../../apiClient/createQuestion'
import shareVideo from '../../apiClient/shareVideo'

const VideoShowContainer = (props) => {
  const videoId = props.match.params.id;

  const [video, setVideo] = useState({});
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [sharesVisibility, setSharesVisibility] = useState(false);
  const [questionsVisibility, setQuestionsVisibility] = useState(false);
  const targetVideo = useRef(null);

  const fetchVideo = async() => {
    try {
      let videoResponse = await fetch(`/api/v1/videos/${videoId}`)
      if(videoResponse.ok){
        videoResponse = await videoResponse.json()
        setVideo(videoResponse.video);
        setUsers(videoResponse.users);
        setQuestions(videoResponse.questions);
      } else {
        throw new Error(`${videoResponse.status}: ${videoResponse.statusText}`)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const shareVideo = async(formData) => {
    const shareResponse = await shareVideo(formData, videoId);
    if(shareResponse.error){
      setFormErrors([parsedAddShareResponse.error])
    } else {
      setUsers([...users, parsedAddShareResponse]);
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  const addQuestion = async(formData) => {
    const addQuestionResponse = await createQuestion(formData, videoId);
    setQuestions([...questions, addQuestionResponse])    
  }
  
  const toggleShares = (event) => {
    if(!sharesVisibility){
      setSharesVisibility(true);
      event.currentTarget.innerText = "Hide shared users"
    } else {
      setSharesVisibility(false);
      event.currentTarget.innerText = "See and add shared users"
    }
  }

  const toggleQuestions = (event) => {
    if(!questionsVisibility){
      setQuestionsVisibility(true);
      event.currentTarget.innerText = "Hide questions"
    } else {
      setQuestionsVisibility(false);
      event.currentTarget.innerText = "See and add questions"
    }
  }
  
  const timesArray = () => {
    let timesArray = questions?.filter(question => question.vid_timestamp).map(question => question.vid_timestamp)
    return timesArray.sort((a,b) => a-b)
  }
  
  useVideoPause(targetVideo, timesArray())

  return (
    <div>
      <h1>{video.title}</h1>
      <div className="video-show-container">
        <div className="video-container">
          <video src={video.video_url?.url} controls preload="metadata" id="video" ref={targetVideo}/>
          <span id="time-display"></span>
        </div>
        {questions.length > 0 ?
        <div className="question-display">
           <QuestionDisplay questions={questions}/>
        </div>
        : null}
      </div>
      <div className="editing-container">
        <div className="show-buttons">
          <button id="sharesToggle" onClick={toggleShares}>See and add shared users</button>
          <button id="questionsToggle" onClick={toggleQuestions}>See and add questions</button>
        </div>
        <div className="errors">
          <ErrorList errors={formErrors}/>
        </div>
        <div className="forms">
        {sharesVisibility ?
          <div className="shared-users">  
            <VideoSharesContainer 
              users={users} 
              shareVideo={shareVideo}
              setFormErrors={setFormErrors}
            />   
          </div>
          : null}
          {questionsVisibility ?
          <div className="questions">
            <VideoQuestionsContainer 
              questions={questions}
              addQuestion={addQuestion}
              setFormErrors={setFormErrors}
              targetVideo={targetVideo}
            /> 
          </div>
          : null}  
        </div>
      </div>
      <Link to='/videos'>Back to my videos list</Link>
    </div>
  )
}
export default VideoShowContainer
