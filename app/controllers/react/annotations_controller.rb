class React::AnnotationsController < ApplicationController
  load_and_authorize_resource
  before_action :set_annotation, only: [:show, :update, :destroy]
  before_action :set_gallery, except: :index

  def show
  end

  def create
    if @gallery.user_id == current_user.id
      @annotation = @gallery.annotations.new(add_user_id(annotation_params))

      if @annotation.save
        @new_annotation = @gallery.annotations.new
        render json: {}, status: :ok
      else
        render json: {}, status: :unprocessable_entity
      end
    end
  end

  def update
    respond_to do |format|
      if @annotation.update(annotation_params)
        format.json { render :show, status: :ok, location: @annotation }
      else
        format.json { render json: @annotation.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @annotation.destroy

    respond_to do |format|
      format.json { head :no_content }
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
