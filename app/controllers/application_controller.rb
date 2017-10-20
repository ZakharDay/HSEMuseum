class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def add_user_id(action_controller_params)
    params = action_controller_params
    params[:user_id] = current_user.id
    params
  end

  def add_gallery_id(action_controller_params, gallery_id)
    params = action_controller_params
    params[:gallery_id] = gallery_id
    params
  end
end
