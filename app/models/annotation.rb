class Annotation < ApplicationRecord
  belongs_to :gallery
  belongs_to :user
  validates :body, :gallery_id, :user_id, presence: true
end
