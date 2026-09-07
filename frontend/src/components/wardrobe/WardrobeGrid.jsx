import { motion } from "framer-motion";

import ClothingCard from "./ClothingCard";
import EmptyWardrobe from "./EmptyWardrobe";

function WardrobeSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-64 bg-gray-200" />

          {/* Content skeleton */}
          <div className="p-5">

            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-5 w-28 bg-gray-200 rounded-lg" />
                <div className="h-4 w-20 bg-gray-100 rounded-lg" />
              </div>

              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </div>

            <div className="flex gap-2 mt-5">
              <div className="h-7 w-16 bg-gray-100 rounded-full" />
              <div className="h-7 w-20 bg-gray-100 rounded-full" />
              <div className="h-7 w-20 bg-gray-100 rounded-full" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <div className="w-9 h-9 bg-gray-100 rounded-xl" />
              <div className="w-9 h-9 bg-gray-100 rounded-xl" />
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default function WardrobeGrid({
  clothes,
  loading,
  onDelete,
  refreshWardrobe,
}) {
  if (loading) {
    return <WardrobeSkeleton />;
  }

  if (clothes.length === 0) {
    return <EmptyWardrobe />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {clothes.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.03,
            ease: "easeOut",
          }}
        >
          <ClothingCard
            item={item}
            onDelete={onDelete}
            refreshWardrobe={refreshWardrobe}
          />
        </motion.div>
      ))}

    </div>
  );
}