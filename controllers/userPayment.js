const userPayment = require("../models/userPayment");
const User = require("../models/user");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.create = async (req, res) => {
  const { name, email, id, payAmonut } = req.body;

  var userPaymentData = new userPayment({
    name,
    email,
    payAmonut,
  });

  userPaymentData.save(function (err, data) {
    if (err) return console.error(err);
    else {
      return cors(req, res, async () => {
        const { id, payAmonut } = req.body;

        const amount = parseFloat(payAmonut) * 100;

        const paymentIntent = await stripe.paymentIntents.create({
          currency: "USD",
          amount: amount,
          payment_method: id,
          confirm: true,
        });
        res.json({ clientSecret: paymentIntent.client_secret, data: data._id });

        // response.status(200).json({subscriptionId: 'subscription.id'})
      });
    }
  });
};
