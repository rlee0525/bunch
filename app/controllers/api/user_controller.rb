class Api::UserController < ApplicationController
  def create
    fb_id = fb_id(params[:accessToken])
    @user = fb_auth_user(params[:accessToken])
    if @user
      return render "api/users/show", status: 200
    else
      @user = User.new(fb_id: fb_id)
      if @user.save
        return render "api/users/show", status: 200
      else
        return render json: ["invalid token"], status: 401
      end
    end
  end

  def show
    @user = fb_auth_user(params[:id])

    if @user
      render "api/users/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
