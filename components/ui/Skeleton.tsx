interface SkeletonLoaderProps {
  count?: number;
  type?: "card" | "table";
}

export default function Skeleton({
  count = 1,
  type = "card",
}: SkeletonLoaderProps) {
  if (type === "table") {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-6 animate-pulse"
        >
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
