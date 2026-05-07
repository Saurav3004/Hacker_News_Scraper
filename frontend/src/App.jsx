import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmark";
import StoryDetails from "./pages/StoryDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import "./App.css"

function App() {
  return (
      <div className="min-h-screen bg-stone-50 text-stone-900">
        <Navbar />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
          <Route path="/stories/:id" element={<ProtectedRoute><StoryDetails /></ProtectedRoute>} />
        </Routes>
      </div>
  );
}

export default App;