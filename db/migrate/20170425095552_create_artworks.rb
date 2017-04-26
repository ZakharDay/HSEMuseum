class CreateArtworks < ActiveRecord::Migration[5.0]
  def change
    create_table :artworks do |t|
      t.integer :artist_id
      t.string :title
      t.integer :year

      t.timestamps
    end
  end
end
