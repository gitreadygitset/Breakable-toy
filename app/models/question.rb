class Question < ApplicationRecord
  belongs_to :video

  validates :vid_timestamp, numericality: {only_integer: true, allow_nil: true}
end
