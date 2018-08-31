class ChallengerDayController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @challenger_day = ChallengerDay.new challenger_day_params
    if @challenger_day.save
      return "success"
    else
      return "fail "
    end
  end

  private

  def challenger_day_params
    params.require(:challenger_day).permit(:content, :day,
                                           :status, :challenger_id)
  end
end
