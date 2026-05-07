import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    setLoading(true);
    const res = await API.get("/users/bookmarks");
    setStories(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchBookmarks(); }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Bookmarks</h2>
        <span className="text-xs text-stone-400">{stories.length} saved</span>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-sm">No bookmarks yet.</p>
          <p className="text-xs mt-1">Save stories from the home feed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} refresh={fetchBookmarks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;