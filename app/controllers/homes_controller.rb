class HomesController < ApplicationController
  before_action :authenticate_user!

  def authenticated
  end
end
