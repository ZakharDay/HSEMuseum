class CreateGalleries < ActiveRecord::Migration[5.0]
  def change
    create_table :galleries do |t|
      t.string :title
      t.text :teaser
      t.string :background

      t.timestamps
    end
  end
end
