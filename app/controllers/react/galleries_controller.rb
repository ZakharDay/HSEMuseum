class React::GalleriesController < ApplicationController
  before_action :set_gallery, only: :edit
  before_action :set_gallery_items, only: :edit

  def edit
    @annotation = @gallery.annotations.new
    @artworks = Artwork.all - @gallery.artworks
  end

  def sort_items
    JSON.parse(gallery_params['gallery_items']).each_with_index do |gallery_item, index|
      id = gallery_item['id']
      position = index + 1

      if gallery_item.key?('artwork_id')
        gallery_item_object = Exhibition.find(id)
      else
        gallery_item_object = Annotation.find(id)
      end

      gallery_item_object.update_attribute(:position, position)
    end

    render json: {}, status: :ok
  end

  private

    def set_gallery
      @gallery = Gallery.find(params[:id])
    end

    def set_gallery_items
      @gallery_items = (@gallery.annotations + @gallery.exhibitions.includes(:artwork)).sort_by(&:position)
    end

    def gallery_params
      params.require(:gallery).permit(:gallery_items)
    end

end
