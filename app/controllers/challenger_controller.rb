class ChallengerController < ApplicationController
  before_action :authenticate_user!

  def index
    @challengers = current_user.challengers
    render :json => @challengers
  end

  def create
    @challenger = Challenger.new challenger_params
    if @challenger.save
      return "success"
    else
      return "fail "
    end
  end

  private
  def challenger_params
    params.require(:challenger).permit(:name, :length, :start_at, :status, :longest, :user_id)
  end
end
