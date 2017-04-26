json.extract! artwork, :id, :artist_id, :title, :year, :created_at, :updated_at
json.url artwork_url(artwork, format: :json)
