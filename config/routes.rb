# == Route Map
#
#            Prefix Verb   URI Pattern                    Controller#Action
#              root GET    /                              main#index
#   play_flappyfood GET    /play/flappyfood(.:format)     play#flappyfood
# play_fishingtacos GET    /play/fishingtacos(.:format)   play#fishingtacos
#        highscores GET    /highscores(.:format)          highscores#index
#                   POST   /highscores(.:format)          highscores#create
#     new_highscore GET    /highscores/new(.:format)      highscores#new
#    edit_highscore GET    /highscores/:id/edit(.:format) highscores#edit
#         highscore GET    /highscores/:id(.:format)      highscores#show
#                   PATCH  /highscores/:id(.:format)      highscores#update
#                   PUT    /highscores/:id(.:format)      highscores#update
#                   DELETE /highscores/:id(.:format)      highscores#destroy
#             users GET    /users(.:format)               users#index
#                   POST   /users(.:format)               users#create
#          new_user GET    /users/new(.:format)           users#new
#         edit_user GET    /users/:id/edit(.:format)      users#edit
#              user GET    /users/:id(.:format)           users#show
#                   PATCH  /users/:id(.:format)           users#update
#                   PUT    /users/:id(.:format)           users#update
#                   DELETE /users/:id(.:format)           users#destroy
#          vouchers GET    /vouchers(.:format)            vouchers#index
#                   POST   /vouchers(.:format)            vouchers#create
#       new_voucher GET    /vouchers/new(.:format)        vouchers#new
#      edit_voucher GET    /vouchers/:id/edit(.:format)   vouchers#edit
#           voucher GET    /vouchers/:id(.:format)        vouchers#show
#                   PATCH  /vouchers/:id(.:format)        vouchers#update
#                   PUT    /vouchers/:id(.:format)        vouchers#update
#                   DELETE /vouchers/:id(.:format)        vouchers#destroy
#             games GET    /games(.:format)               games#index
#                   POST   /games(.:format)               games#create
#          new_game GET    /games/new(.:format)           games#new
#         edit_game GET    /games/:id/edit(.:format)      games#edit
#              game GET    /games/:id(.:format)           games#show
#                   PATCH  /games/:id(.:format)           games#update
#                   PUT    /games/:id(.:format)           games#update
#                   DELETE /games/:id(.:format)           games#destroy
#           clients GET    /clients(.:format)             clients#index
#                   POST   /clients(.:format)             clients#create
#        new_client GET    /clients/new(.:format)         clients#new
#       edit_client GET    /clients/:id/edit(.:format)    clients#edit
#            client GET    /clients/:id(.:format)         clients#show
#                   PATCH  /clients/:id(.:format)         clients#update
#                   PUT    /clients/:id(.:format)         clients#update
#                   DELETE /clients/:id(.:format)         clients#destroy
#                   GET    /highscores(.:format)          highscores#index
#                   POST   /highscores(.:format)          highscores#create
#                   GET    /highscores/new(.:format)      highscores#new
#                   GET    /highscores/:id/edit(.:format) highscores#edit
#                   GET    /highscores/:id(.:format)      highscores#show
#                   PATCH  /highscores/:id(.:format)      highscores#update
#                   PUT    /highscores/:id(.:format)      highscores#update
#                   DELETE /highscores/:id(.:format)      highscores#destroy
#                   GET    /users(.:format)               users#index
#                   POST   /users(.:format)               users#create
#                   GET    /users/new(.:format)           users#new
#                   GET    /users/:id/edit(.:format)      users#edit
#                   GET    /users/:id(.:format)           users#show
#                   PATCH  /users/:id(.:format)           users#update
#                   PUT    /users/:id(.:format)           users#update
#                   DELETE /users/:id(.:format)           users#destroy
#                   GET    /vouchers(.:format)            vouchers#index
#                   POST   /vouchers(.:format)            vouchers#create
#                   GET    /vouchers/new(.:format)        vouchers#new
#                   GET    /vouchers/:id/edit(.:format)   vouchers#edit
#                   GET    /vouchers/:id(.:format)        vouchers#show
#                   PATCH  /vouchers/:id(.:format)        vouchers#update
#                   PUT    /vouchers/:id(.:format)        vouchers#update
#                   DELETE /vouchers/:id(.:format)        vouchers#destroy
#                   GET    /games(.:format)               games#index
#                   POST   /games(.:format)               games#create
#                   GET    /games/new(.:format)           games#new
#                   GET    /games/:id/edit(.:format)      games#edit
#                   GET    /games/:id(.:format)           games#show
#                   PATCH  /games/:id(.:format)           games#update
#                   PUT    /games/:id(.:format)           games#update
#                   DELETE /games/:id(.:format)           games#destroy
#                   GET    /clients(.:format)             clients#index
#                   POST   /clients(.:format)             clients#create
#                   GET    /clients/new(.:format)         clients#new
#                   GET    /clients/:id/edit(.:format)    clients#edit
#                   GET    /clients/:id(.:format)         clients#show
#                   PATCH  /clients/:id(.:format)         clients#update
#                   PUT    /clients/:id(.:format)         clients#update
#                   DELETE /clients/:id(.:format)         clients#destroy
#         main_claw GET    /main/claw(.:format)           main#claw
#         main_slot GET    /main/slot(.:format)           main#slot
#   main_submittest GET    /main/submittest(.:format)     main#submittest
#             login GET    /login(.:format)               session#new
#                   POST   /login(.:format)               session#create
#                   DELETE /login(.:format)               session#destroy
#

Rails.application.routes.draw do
  root :to => "main#index"

  get 'play/flappyfood'

  get 'play/fishingtacos'

  resources :highscores
  resources :users
  resources :vouchers
  resources :games
  resources :clients
  resources :highscores
  resources :users
  resources :vouchers
  resources :games
  resources :clients

  get 'main/claw'

  get 'main/slot'

  get 'main/submittest'

  post 'game_rank' => 'games#game_rank'

  # SESSIONS:
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

end
