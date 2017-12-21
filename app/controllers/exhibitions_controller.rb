class ExhibitionsController < ApplicationController
  def create
    logger.debug 'PARAMS'
    logger.debug params[:gallery_id]
    logger.debug params[:artwork_id]

    @gallery = Gallery.find(params[:gallery_id])

    @exhibition = @gallery.exhibitions.build()
    @exhibition.artwork_id = params[:artwork_id]

    respond_to do |format|
      if @exhibition.save
        format.js
      end
    end
  end

  def destroy
    @exhibition = Exhibition.find(params[:id])
    @exhibition.destroy
    @gallery = Gallery.find(params[:gallery_id])
    @artworks = Artwork.all - @gallery.artworks

    respond_to do |format|
      format.js
    end
  end
end
