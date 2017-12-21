class GalleriesController < ApplicationController
  load_and_authorize_resource
  before_action :set_gallery, only: [:show, :edit, :update, :destroy]
  before_action :set_gallery_items, only: [:show, :edit]

  # GET /galleries
  # GET /galleries.json
  def index
    @galleries = Gallery.all
  end

  # GET /galleries/1
  # GET /galleries/1.json
  def show
  end

  # GET /galleries/new
  def new
    @gallery = Gallery.new
  end

  # GET /galleries/1/edit
  def edit
    @annotation = @gallery.annotations.new
    @artworks = Artwork.all - @gallery.artworks
  end

  # POST /galleries
  # POST /galleries.json
  def create
    @gallery = Gallery.new(add_user_id(gallery_params))

    respond_to do |format|
      if @gallery.save
        format.html { redirect_to @gallery, notice: 'Gallery was successfully created.' }
        format.json { render :show, status: :created, location: @gallery }
      else
        format.html { render :new }
        format.json { render json: @gallery.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /galleries/1
  # PATCH/PUT /galleries/1.json
  def update
    respond_to do |format|
      if @gallery.update(gallery_params)
        format.html { redirect_to @gallery, notice: 'Gallery was successfully updated.' }
        format.json { render :show, status: :ok, location: @gallery }
      else
        format.html { render :edit }
        format.json { render json: @gallery.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /galleries/1
  # DELETE /galleries/1.json
  def destroy
    @gallery.destroy
    respond_to do |format|
      format.html { redirect_to galleries_url, notice: 'Gallery was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def sort_items
    params['gallery_items'].each_with_index do |gallery_item, index|
      type = gallery_item[1][0]
      id = gallery_item[1][1]

      if type == 'annotation'
        gallery_item_object = Annotation.find(id)
      elsif type == 'exhibition'
        gallery_item_object = Exhibition.find(id)
      end

      gallery_item_object.update_attribute(:position, index + 1)
    end

    render nothing: true
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gallery
      @gallery = Gallery.find(params[:id])
    end

    def set_gallery_items
      @gallery_items = @gallery.annotations + @gallery.exhibitions
      @gallery_items = @gallery_items.sort_by(&:position)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def gallery_params
      params.require(:gallery).permit(:title, :teaser, :background)
    end
end
