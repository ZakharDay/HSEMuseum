class Annotation < ApplicationRecord
  belongs_to :gallery
  belongs_to :user
  validates :body, :gallery_id, :user_id, presence: true

  def to_json
    {
      id: id,
      body: body,
      position: position
    }
  end
end
