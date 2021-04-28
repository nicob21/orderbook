/**
 * Function used to write some logs
 * Centralized in one place so we easily change
 * the log system in the futur
 **/
const logAction = (action, side, price, amount) => {
  console.log(`${action} ${side} @ ${price} ${amount}`);
};

exports.logAction = logAction;
