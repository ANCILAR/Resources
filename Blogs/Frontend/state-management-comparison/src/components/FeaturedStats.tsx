import React from 'react';

interface FeaturedStatsProps {
  count: number;
}

export const FeaturedStats: React.FC<FeaturedStatsProps> = ({ count }) => {
  return (
    <div className="text-right font-semibold text-green-600 mb-4">
      Featured Products: {count}
    </div>
  );
};
