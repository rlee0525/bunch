Rails.application.routes.draw do
  
  root 'static_pages#index'

  namespace :api do
    defaults format: :json do

    end
  end
end