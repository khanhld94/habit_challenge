class HomeController < ApplicationController

  before_action :authenticate_user!

  def index
    return "home/index"
  end
end
