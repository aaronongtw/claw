json.array!(@clients) do |client|
  json.extract! client, :id, :name, :location, :type, :latitude, :longitude
  json.url client_url(client, format: :json)
end
