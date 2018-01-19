class Artwork < ApplicationRecord
  belongs_to :artist

  has_many :exhibitions
  has_many :galleries, through: :exhibitions

  mount_uploader :image, ImageUploader
  validates :artist_id, :image, :user_id, presence: true

  def to_json
    {
      id: id,
      title: title,
      year: year,
      image: image.url
    }
  end
end
