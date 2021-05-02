edna = User.new(username: "edna", password: "edna11", email: "edna@edna.com", role: "supported user")
edna.save!

patrick = User.new(username: "patrick", password: "patrick", email: "patrick@patrick.com", role: "independent user")
patrick.save!

devin = User.new(username: "devin", password: "devin1", email: "devin@devin.com", role: "supported user")
devin.save!

Video.find_or_create_by!(video_url: "video.com", title: "a video", user: User.find_by(username: "patrick"))

VideoShare.find_or_create_by!(user_id: 1, video_id: 1)
