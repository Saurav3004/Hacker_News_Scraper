import { Link } from "react-router-dom";
import API from "../api/axios";

const StoryCard = ({ story, refresh }) => {


  const toggleBookmark = async () => {
    await API.post(`/stories/${story._id}/bookmark`);
    refresh();
  };

  return (
    <div className="p-4 border rounded shadow">
      <Link to={`/stories/${story._id}`}>
        <h2 className="font-bold">{story.title}</h2>
      </Link>

      <p>{story.points} points | {story.author}</p>
      <p className="text-sm text-gray-500">{story.postedAt}</p>

      <button
        onClick={toggleBookmark}
        className="mt-2  text-white px-3 py-1 rounded cursor-pointer"
      >
        {location.pathname == "/bookmarks" ? <span className="bg-red-500 p-2 text-white rounded-md">Dismiss Bookmark</span> : <span className="bg-blue-500 p-2 rounded-md">Bookmark</span>}
      </button>
    </div>
  );
};

export default StoryCard;