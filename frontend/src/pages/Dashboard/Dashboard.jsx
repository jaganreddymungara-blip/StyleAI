import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsCards from "../../components/dashboard/StatsCards";
import OutfitCard from "../../components/dashboard/OutfitCard";

import { getWardrobe } from "../../services/wardrobeService";

export default function Dashboard() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const data = await getWardrobe();

      setClothes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Dashboard wardrobe error:", error);
      setClothes([]);
    } finally {
      setLoading(false);
    }
  };

  const favoriteCount = clothes.filter(
    (item) => item.favorite === true
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-gray-900">

      <Sidebar />

      <div className="ml-72 min-h-screen">

        <Topbar />

        <main className="px-10 py-9">

          {/* Page Header */}

          <div className="mb-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600 mb-2">
                  StyleAI
                </p>

                <h1 className="text-4xl font-black tracking-tight">
                  Your Style Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                  Your wardrobe, favorites and personalized style recommendations.
                </p>

              </div>

            </div>

          </div>


          {/* Welcome */}

          <section className="mb-7">
            <WelcomeCard />
          </section>


          {/* Statistics */}

          <section className="mb-7">

            <div className="mb-4">

              <h2 className="text-xl font-black">
                Your Style Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                A quick look at your StyleAI wardrobe.
              </p>

            </div>

            <StatsCards
              wardrobeCount={clothes.length}
              favoriteCount={favoriteCount}
              loading={loading}
            />

          </section>


          {/* AI Outfit */}

          <section>

            <div className="mb-4">

              <h2 className="text-xl font-black">
                Today's Style Pick
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                A personalized outfit selected by StyleAI.
              </p>

            </div>

            <OutfitCard />

          </section>

        </main>

      </div>

    </div>
  );
}
