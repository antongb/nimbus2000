class BackboneController < ApplicationController
  before_action :ensure_signed_in, except: :test

  def index
  end

end
