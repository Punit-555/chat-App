const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const { route, search } = require("../Routes/userRoutes");

const generateToken = require("../config/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields.");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    token: name,
  });
  const token = generateToken(user._id);

  const temp = await User.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        token: token,
      },
    }
  );

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("This is From User: ", token);
  } else {
    throw new Error("Failed to Create the User");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("Login Succesfully!");
  } else {
    throw new Error("Invalid Email or Password");
  }
};

// api/user?search=John;

const allUsers = asyncHandler(async (req, res) => {
  // console.log("keyword", req.query.search);

  const keyword = req.query.search? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { authUser, registerUser, allUsers };
