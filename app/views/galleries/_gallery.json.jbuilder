json.extract! gallery, :id, :title, :teaser, :background, :created_at, :updated_at
json.url gallery_url(gallery, format: :json)
