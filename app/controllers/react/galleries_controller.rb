class React::GalleriesController < ApplicationController
  load_and_authorize_resource
  before_action :get_gallery

  def edit
    @gallery_items_props = get_gallery_items_props
  end

  def sort_items
    JSON.parse(gallery_params['gallery_items']).each_with_index do |gallery_item, index|
      if gallery_item['id']
        id = gallery_item['id'].to_i

        if gallery_item.key?('artwork_id')
          begin
            gallery_item_object = Exhibition.find(id)
          rescue ActiveRecord::RecordNotFound => error
            logger.debug "RECORD NOT FOUND"
            logger.debug error
          end
        else
          begin
            gallery_item_object = Annotation.find(id)
          rescue ActiveRecord::RecordNotFound => error
            logger.debug "RECORD NOT FOUND"
            logger.debug error
          end
        end

        if gallery_item_object
          gallery_item_object.update_attribute(:position, index + 1)
        else
          body = gallery_item['body']
          position = gallery_item['position']
          annotation = @gallery.annotations.create!(body: body, position: index + 1, user_id: current_user.id)
        end
      end
    end

    render json: get_gallery_items_props, status: :ok
  end

  private

    def gallery_params
      params.require(:gallery).permit(:gallery_items)
    end

    def get_gallery
      @gallery = Gallery.find(params[:id])
    end

    def get_gallery_items_props
      gallery_items = (@gallery.annotations + @gallery.exhibitions.includes(:artwork)).sort_by(&:position)
      JSON.generate(gallery_items.collect { |gallery_item| gallery_item.to_json })
    end

end
