class AddPositionToAnnotation < ActiveRecord::Migration[5.0]
  def change
    add_column :annotations, :position, :integer, default: 0
  end
end
