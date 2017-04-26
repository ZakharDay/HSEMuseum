class AddImageToArtworks < ActiveRecord::Migration[5.0]
  def change
    add_column :artworks, :image, :string
  end
end
