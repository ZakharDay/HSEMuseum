class Artwork < ApplicationRecord
  belongs_to :artist
  mount_uploader :image, ImageUploader
  validates :artist_id, presence: true
end
