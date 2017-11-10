class AddPositionToAnnotation < ActiveRecord::Migration[5.0]
  def change
    add_column :annotations, :position, :integer
  end
end
