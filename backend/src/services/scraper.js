import axios from "axios";
import cheerio from "cheerio";
import Story from "../models/Story.js";

export const scrapeHackerNews = async () => {
  const { data } = await axios.get("https://news.ycombinator.com");
  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").each((i, el) => {
    if (i >= 10) return false;

    const title = $(el).find(".titleline a").text();
    const url = $(el).find(".titleline a").attr("href");

    const subtext = $(el).next();
    const points = parseInt(subtext.find(".score").text()) || 0;
    const author = subtext.find(".hnuser").text();
    const postedAt = subtext.find(".age").text();

    stories.push({ title, url, points, author, postedAt });
  });

  await Story.deleteMany();
  await Story.insertMany(stories);

  return stories;
};