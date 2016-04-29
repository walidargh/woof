json.id @business.id
json.name @business.name
json.address @business.address
json.hours @business.hours
json.price @business.price
json.reviews do 
 json.array! @business.reviews do |review|
		json.id review.id
		json.name review.content
		json.address review.address
	end
end