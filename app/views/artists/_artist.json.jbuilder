json.extract! artist, :id, :name, :born, :died, :created_at, :updated_at
json.url artist_url(artist, format: :json)
