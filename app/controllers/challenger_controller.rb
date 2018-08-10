class ChallengerController < ApplicationController
  before_action :authenticate_user!
  def index
    @challengers = current_user.challengers
    render :json => @challengers
  end
end
