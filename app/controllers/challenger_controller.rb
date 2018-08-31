class ChallengerController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @challengers = current_user.challengers.includes(:challenger_days)
    render json: @challengers
  end

  def create
    @challenger = Challenger.new challenger_params
    if @challenger.save
      return "success"
    else
      return "fail "
    end
  end

  def show
    @challenger = Challenger.find(params[:id])
    render json: { challenger: @challenger,
                   challenger_day: @challenger.challenger_days }
  end

  private

  def challenger_params
    params.require(:challenger).permit(:name, :length, :start_at, :status,
                                       :longest, :user_id)
  end
end
