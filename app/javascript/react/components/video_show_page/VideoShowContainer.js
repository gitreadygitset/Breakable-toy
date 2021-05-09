import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import VideoSharesContainer from './VideoSharesContainer'
import VideoQuestionsContainer from './VideoQuestionsContainer'
import ErrorList from '../ErrorList'
import QuestionDisplay from './QuestionDisplay'
import useVideoPause from '../../useEffect/useVideoPause'
import createQuestion from '../../apiClient/createQuestion'
import destroyQuestion from '../../apiClient/destroyQuestion'
import shareVideo from '../../apiClient/shareVideo'
import destroyShare from '../../apiClient/destroyShare'

const VideoShowContainer = (props) => {
  const videoId = props.match.params.id;

  const [forbidden, setForbidden] = useState(false);
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
        if(videoResponse.status === 403){
          setForbidden(true);
        }
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

  const unshare = async(username) => {
    if(await destroyShare(username, videoId)){
      let remainingUsers = users.filter(existingUser => existingUser.username !== username);
      setUsers(remainingUsers);
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  const addQuestion = async(formData) => {
    const addQuestionResponse = await createQuestion(formData, videoId);
    setQuestions([...questions, addQuestionResponse])    
  }
  
  const deleteQuestion = async(questionId) => {
    if(await destroyQuestion(questionId, videoId)){
      let remainingQuestions = questions.filter(
        (existingQuestion) => existingQuestion.id !== questionId
      );
      setQuestions(remainingQuestions);
    }
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

  if(forbidden){
    return (
      <div>
        <p>You do not have access to this video. Please ask the video's owner to share it with you.</p>
      </div>
    )
  } else {
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
              unshare={unshare}
              setFormErrors={setFormErrors}
            />   
          </div>
          : null}
          {questionsVisibility ?
          <div className="questions">
            <VideoQuestionsContainer 
              questions={questions}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
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
}}
export default VideoShowContainer
