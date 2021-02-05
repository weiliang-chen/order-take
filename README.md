# order-api
This app uses googleMap api to calculate distance between two locations

## Usage
# create order
Post {{url}}/orders

require body in JSON
body:
{
  "origin": ["", ""],
  "destination" : ["", ""]
}

# take order

Patch {{url}}/orders/:id

:id is the id of the order you want to take

require body in JSON
body:
{
  "status": "Taken"
}

# get orders
Get {{url}}/orders?page=:page&limit=:limit

:page is the number page you want to see
:limit is the number of orders in a page

# get order by id
Get {{url}}/orders/:id

:id is the id of the order you want to get
