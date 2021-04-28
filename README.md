<!-- prettier-ignore-start -->

# Orderbook

## Backend

The files stored at `/` are used by the Node.js server.

### Steps to run

- Install the dependencies `npm install`
- Start the server `npm run start`

The server should be running on port `3000`.

## Frontend

The `client` folder contains all the code of the React.js application.

### Steps to run

- Go into the `client` folder `cd client`
- Install the dependencies `npm install`
- Build the application `npm run build`
- Open `build/index.html` in your browser

## Improvements

This project has been built in 4 hours so there are a few things that could be improved:

- Add some security to the API. Currently all the endpoints can be called without any permission. Implementing an x-api-key header or a jwtToken mecanism would prevent the API from being public.
- Increase performance. Currently the every time an action is done (place or cancel an order), all the orders a fetched again from the API. In this case, there are very few orders so it doesn't cause any issue. But if there were a lot of orders, we could directly insert/remove the order in the frontend depending on the API call result.
- Another performance improvment would be to add some pagination to the orders endpoints. This would allow to only fetch a few orders and then if the user wants to load more (via infinite scrolling or clicking on the next page button) we could load more orders. Also, implementing some filters to only show "ASK" orders or with an amount greater than X would allow the user to find specific orders without loading everything.
- This app could also face concurrency issues. If several users are using the app, the changes done by one user won't be reflected in the orderbook of the other users. To improve that, we could add a websocket connexion between the server and the different frontend instances. This way, when an order is placed/cancelled, the server would be able to notify the frontend instances that there has been some changes so they can refresh the data accordingly.
- Extend the test coverage.
