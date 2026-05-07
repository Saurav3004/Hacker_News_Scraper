import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    setLoading(true);
    const res = await API.get("/stories?page=1&limit=10");
    setStories(res.data.data);
    setLoading(false);
  };

  useEffect(() => { fetchStories(); }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Top Stories</h2>
        <span className="text-xs text-stone-400">{stories.length} stories</span>
      </div>
      <div className="space-y-3">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} refresh={fetchStories} />
        ))}
      </div>
    </div>
  );
};

export default Home;