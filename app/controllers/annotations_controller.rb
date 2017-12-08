class AnnotationsController < ApplicationController
  load_and_authorize_resource
  before_action :set_annotation, only: [:show, :edit, :update, :destroy]
  before_action :set_gallery, except: :index

  # GET /annotations
  # GET /annotations.json
  def index
    @annotations = Annotation.all
  end

  # GET /annotations/1
  # GET /annotations/1.json
  def show
  end

  def new_link
  end

  # GET /annotations/new
  def new
    @annotation = @gallery.annotations.new
  end

  # GET /annotations/1/edit
  def edit
  end

  # POST /annotations
  # POST /annotations.json
  def create
    if @gallery.user_id == current_user.id
      @annotation = @gallery.annotations.new(add_user_id(annotation_params))
    end

    respond_to do |format|
      if @annotation.save
        @new_annotation = @gallery.annotations.new

        format.html { redirect_to @annotation, notice: 'Annotation was successfully created.' }
        format.json { render :show, status: :created, location: @annotation }
        format.js   { render :create }
      else
        format.html { render :new }
        format.json { render json: @annotation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /annotations/1
  # PATCH/PUT /annotations/1.json
  def update
    respond_to do |format|
      if @annotation.update(annotation_params)
        format.html { redirect_to @annotation, notice: 'Annotation was successfully updated.' }
        format.json { render :show, status: :ok, location: @annotation }
        format.js   { render :update }
      else
        format.html { render :edit }
        format.json { render json: @annotation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /annotations/1
  # DELETE /annotations/1.json
  def destroy
    @annotation.destroy
    
    respond_to do |format|
      format.html { redirect_to annotations_url, notice: 'Annotation was successfully destroyed.' }
      format.json { head :no_content }
      format.js
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_annotation
      @annotation = Annotation.find(params[:id])
    end

    def set_gallery
      @gallery = Gallery.find(params[:gallery_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def annotation_params
      params.require(:annotation).permit(:body)
    end

end
