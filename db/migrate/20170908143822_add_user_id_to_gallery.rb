class AddUserIdToGallery < ActiveRecord::Migration[5.0]
  def change
    add_column :galleries, :user_id, :integer
  end
end
