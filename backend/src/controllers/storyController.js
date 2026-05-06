import Story from "../models/Story.js";
import User from "../models/User.js";

export const getStories = async (req, res) => {
  const stories = await Story.find().sort({ points: -1 });
  res.json(stories);
};

export const getStory = async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.json(story);
};

export const toggleBookmark = async (req, res) => {
  const user = await User.findById(req.user._id);
  const id = req.params.id;

  if (user.bookmarks.includes(id)) {
    user.bookmarks.pull(id);
  } else {
    user.bookmarks.push(id);
  }

  await user.save();
  res.json(user.bookmarks);
};