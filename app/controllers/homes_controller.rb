class HomesController < ApplicationController
  before_action :authenticate_user!, except: [:landing]
  
  def authenticated
  end

  def landing
  end
end
