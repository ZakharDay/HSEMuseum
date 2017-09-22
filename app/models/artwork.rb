class Artwork < ApplicationRecord
  belongs_to :artist

  has_many :exhibitions
  has_many :galleries, through: :exhibitions

  mount_uploader :image, ImageUploader
  validates :artist_id, :image, :user_id, presence: true
end
