Rails.application.routes.draw do
  root "home#index"
  resources :challenger
  resources :challenger_day
  devise_for :users
  match '*path' => redirect('/'), via: :get
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
