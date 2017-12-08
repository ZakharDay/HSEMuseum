class AddPositionToExhibition < ActiveRecord::Migration[5.0]
  def change
    add_column :exhibitions, :position, :integer, default: 0
  end
end
