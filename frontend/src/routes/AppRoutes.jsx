import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Wardrobe from "../pages/Wardrobe/Wardrobe";
import Recommendations from "../pages/Recommendations/Recommendations";
import Favorites from "../pages/Favorites/Favorites";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/wardrobe"
          element={<Wardrobe />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}