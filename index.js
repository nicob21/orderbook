const express = require("express");
const cors = require("cors");
const { size, get, filter } = require("lodash");
const uuid = require("uuid");

const {
  uuidType,
  positiveNumber,
  enumType,
  ASK,
  BID,
  PLACED,
  CANCELLED,
} = require("./utils/constants");
const { logAction } = require("./utils/log");
const { isValidParam } = require("./utils/validation");

const app = express();
const router = express.Router();
const port = 3000;

router.use(cors());
router.use(express.json());

let orders = [];

/**
 * Return the entire orderbook
 * Available URL param filters:
 *      - userId
 **/
router.get("/orders", (req, res) => {
  const userId = get(req, ["query", "userId"]);
  if (userId) {
    res.json(
      filter(orders, (item) => get(item, ["userId"]) === parseInt(userId))
    );
  } else {
    res.json(orders);
  }
});

/**
 * Create a new order
 * Body:
 *      - userId: user placing the order
 *      - side: BID | ASK
 *      - price: order price
 *      - amount: order amount
 * Returns: orderId
 **/
router.post("/orders", (req, res) => {
  const userId = get(req, ["body", "userId"]);
  const side = get(req, ["body", "side"]);
  const price = get(req, ["body", "price"]);
  const amount = get(req, ["body", "amount"]);

  if (!isValidParam(userId, positiveNumber))
    res.status(400).send("userId must be specified");
  if (!isValidParam(side, enumType, [ASK, BID]))
    res.status(400).send(`side must be either ${ASK} or ${BID}`);
  if (!isValidParam(price, positiveNumber))
    res.status(400).send("Invalid price value");
  if (!isValidParam(amount, positiveNumber))
    res.status(400).send("Invalid amount value");

  const id = uuid.v4();
  orders.push({
    id,
    userId,
    side,
    price,
    amount,
  });
  res.json({ orderId: id });
  logAction(PLACED, side, price, amount);
});

/** Delete an existing order */
router.delete("/orders/:orderId", (req, res) => {
  const orderId = get(req, ["params", "orderId"]);

  if (
    !isValidParam(orderId, uuidType) ||
    size(filter(orders, (item) => get(item, ["id"]) === orderId)) === 0
  )
    res.status(400).send("Invalid orderId value");

  const cancelledOrder = get(
    filter(orders, (item) => get(item, ["id"]) === orderId),
    [0]
  );
  orders = filter(orders, (item) => get(item, ["id"]) !== orderId);
  res.send("Order removed");
  logAction(
    CANCELLED,
    get(cancelledOrder, ["side"]),
    get(cancelledOrder, ["price"]),
    get(cancelledOrder, ["amount"])
  );
});

app.use("/api", router);
app.listen(port, () => console.log(`API running on port ${port}`));
