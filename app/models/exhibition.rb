class Exhibition < ApplicationRecord
  belongs_to :artwork
  belongs_to :gallery

  validates :artwork_id, :gallery_id, presence: true

  def to_json
    {
      id: id,
      artwork_id: artwork_id,
      position: position,
      artwork: artwork.to_json
    }
  end
end
