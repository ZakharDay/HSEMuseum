class CreateExhibitions < ActiveRecord::Migration[5.0]
  def change
    create_table :exhibitions do |t|
      t.integer :artwork_id
      t.integer :gallery_id

      t.timestamps
    end
  end
end
