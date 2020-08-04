const router = require("express").Router();

const Users = require("../models/User");

router.get("/", async (req, res) => {
  const user = await Users.findOne({ _id: req.query.id });

  res.send(user);
});

router.post("/", async (req, res) => {
  const user = new Users({
    name: req.body.name,
  });

  try {
    const savedUser = await user.save();

    res.send({
      status: "ok",
      user: savedUser,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
