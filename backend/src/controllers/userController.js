import User from "../models/User.js";

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "bookmarks",
        options: { sort: { points: -1 } }
      });

    res.json(user.bookmarks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};