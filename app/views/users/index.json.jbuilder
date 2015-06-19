json.array!(@users) do |user|
  json.extract! user, :id, :email, :username, :admin, :location, :coins, :latitude, :longitude, :password_digest
  json.url user_url(user, format: :json)
end
