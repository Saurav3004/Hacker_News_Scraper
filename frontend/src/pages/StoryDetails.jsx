import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";

const StoryDetails = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    API.get(`/stories/${id}`).then(res => setStory(res.data));
  }, [id]);

  if (!story) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => nav(-1)}
        className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition mb-6"
      >
        ← Back
      </button>

      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold text-stone-900 leading-snug">{story.title}</h1>

        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span>{story.points} points</span>
          <span>by <span className="text-stone-600 font-medium">{story.author}</span></span>
        </div>

        {story.url && (
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-stone-900 font-medium border border-stone-200 px-4 py-2 rounded-lg hover:bg-stone-50 transition"
          >
            Visit Article ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default StoryDetails;