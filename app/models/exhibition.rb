class Exhibition < ApplicationRecord
  belongs_to :artwork
  belongs_to :gallery

  validates :artwork_id, :gallery_id, presence: true
end
