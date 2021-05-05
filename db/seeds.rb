edna = User.new(username: "edna", password: "edna11", email: "edna@edna.com", role: "supported user")
edna.save

samantha = User.new(username: "samantha", password: "patrick", email: "samantha.@samantha.com", role: "independent user")
samantha.save

devin = User.new(username: "devin", password: "devin1", email: "devin@devin.com", role: "supported user")
devin.save

video1 = Video.new(video_url: File.open(File.join(Rails.root, 'spec/fixtures/IMG_1404-1.mov')), title: "a video", uploader: User.find_by(username: "samantha"))
video1.save

edna.videos << video1
devin.videos << video1
