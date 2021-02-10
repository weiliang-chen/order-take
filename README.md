# order-api
This app uses googleMap api to calculate distance between two locations

# Config
Config setting are in order-delivery/config/dev.env

## To start up local API
This app is using MongoDB for local database.

First connect with your local MongoDB

Then enter command

```bash
npm run dev
```

if it shows

     Server is up on 8080
     
Then your local APi is set up.

# create order
Post {{url}}/orders

require request body in JSON

"origin" is the origin place of the order. 

"destination" is the destination place of the order.

example body:
     
    {
     "origin": ["39.9222","117.2014"],
     "destination" : ["39.9156", "116.4074"]
    }

if order is created successed, it will return 200OK and response.

response:
    
    {
     "origin":[
        "39.9222",
        "117.2014"
    ],
    "destination": [
        "39.9156",
        "116.4074"
    ], 
    "_id": "601cedb16ddb5f0017a3a160",
    "status": "UNASSIGNED",
    "distance": "105 km"
    }
    
"origin" is the origin place of the order. 

"destination" is the destination place of the order.

"_id" is the id of the order

"status" is the current status of the order

"distance" is the distance between origin place and destination place.

# take order

Patch {{url}}/orders/:id

:id is the id of the order you want to take

require request body in JSON
body:

    {
    "status": "Taken"
    }

if order is taken successed, it will return 200OK and response.

response:
     
    {
     "origin": [
        "39.9222",
        "117.2014"
    ],
    "destination": [
        "39.9156",
        "116.4074"
    ],
    "_id": "601cedb16ddb5f0017a3a160",
    "status": "SUCCESS",
    "distance": "105 km"
     }

Now "status" is "SUCCESS"

# get orders
Get {{url}}/orders?page=:page&limit=:limit

:page is the number page you want to see
:limit is the number of orders in a page

# get order by id
Get {{url}}/orders/:id

:id is the id of the order you want to get
