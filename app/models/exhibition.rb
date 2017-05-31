class Exhibition < ApplicationRecord
  belongs_to :artwork
  belongs_to :gallery
end
