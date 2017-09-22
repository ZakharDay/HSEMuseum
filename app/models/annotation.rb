class Annotation < ApplicationRecord
  belongs_to :gallery
  validates :body, :gallery_id, :user_id, presence: true
end
