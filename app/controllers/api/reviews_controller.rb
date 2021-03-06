class Api::ReviewsController < ApplicationController
	def index
		@reviews = Reviews.find_by({business_id: review_params[:business_id]}).order('updated_at DESC')
	end

	def create
		full_params = review_params
		full_params[:user_id] = current_user.id
		@review = Review.new(full_params)
		if @review.save
			render json: @review
		else
			@errors = @review.errors.full_messages
			render json: @errors, status: 422
		end
	end

	private
	def review_params
		params.require(:review).permit(:body, :rating, :business_id)
	end

end
