require('dotenv').config();
const request = require('request-promise');

exports.getCurrency = async function (currency) {
  const promise = await request(`https://api.currencyfreaks.com/latest?apikey=${process.env.CURRENCY_API_KEY}&symbols=${currency}`);
  console.log(promise);
  let curr = JSON.parse(promise);
  console.log(curr);
  let multBy = parseFloat(curr.rates[currency]);
  console.log(multBy);
  return multBy;
}
