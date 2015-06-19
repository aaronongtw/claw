json.array!(@vouchers) do |voucher|
  json.extract! voucher, :id, :name, :description, :expiry, :client_id, :textstuff, :user_id
  json.url voucher_url(voucher, format: :json)
end
