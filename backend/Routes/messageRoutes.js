const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { allMessages, sendMessage } = require("../controllers/messageController");
const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
