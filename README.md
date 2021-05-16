# About CanDo

CanDo is a tool for creating custom video-based teaching materials. Tailored particularly for making video models and video prompts to assist people with learning differences and disabilities in acquiring new skills. 

## Demo Site

The best way to see what it's all about is to visit [the Heroku site](can-do.herokuapp.com). Create your own account, or log in with the following credentials to see some sample videos: 

- To see an "independent user" account
*Username: demo
*Password: password

- To see a "supported user" account
 *Username: demo-supported
 *Password: password

## Run CanDo locally

To set up CanDo on your machine:

You will need to have Ruby(v2.7.3), Rails, and PostegreSQL installed. 

1. Clone this repository
2. From your local repository, run `bundle install` in your CLI to install Ruby backend dependencies
3. Run `yarn` to install frontend Javascript dependencies
4. Run `bundle exec rake db:create` and then `bundle exec rake db:migrate` to set up the PostgreSQL database 
5. Start the rails server with `rails server`
6. In your browser, navigate to localhost:3000
7. Create a user account, upload a video, and see what you can do! (see use instructions and notes below).
  [![Codeship Status for gitreadygitset/Breakable-toy](https://app.codeship.com/projects/287a9f55-522b-4afa-af54-b823b6ce68dc/status?branch=master)](https://app.codeship.com/projects/443301)

## Technical notes

As of now, this CanDo reliably supports .mov and .mp4 video files encoded with the H.264 codec. Please encode any H.265/HEVC high-definition videos to the H.264 standard before uploading to ensure cross-browser compatibility. On an iPhone, change your camera > settings > formats option to "Most compatible" before taking your video. Or, use your computer's video processing tool to change your high-def file's encoding (on a Mac, right-click the file and choose "Encode selected video files").

Text-to-speech is available on browsers that support the Web Audio API. Please make sure your browser is up to date to use the text-to-speech feature. This feature is not supported on Safari versions prior to 14.5 (released April 2021). 

## Features coming soon

CanDo is designed to be small and easy to use, and everything you need to start making materials for your learners is ready to go! That said, there are still a few more exciting features in the works, including options to:
- Embed videos from an external source like YouTube
- Organize your videos by topic or learner, and search by title
- Use the site on small-screen mobile devices
- Add answer choices to questions
       
### Miscellaneous

Icons provided by Font Awesome, per [license](https://fontawesome.com/license)
