import mongoose from "mongoose";
import Story from "../models/Story.js";
import User from "../models/User.js";

export const getStories = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (page < 1) page = 1;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    const total = await Story.countDocuments();

    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: stories,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStory = async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.json(story);
};

export const toggleBookmark = async (req, res) => {
  try {
    const user = req.user;
    const storyId = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ message: "Invalid story ID" });
    }

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === storyId
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.json({
      message: alreadyBookmarked
        ? "Bookmark removed"
        : "Bookmark added",
      bookmarks: user.bookmarks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};