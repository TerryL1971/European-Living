import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import type { Destination } from "../data/destinations";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden shadow-md bg-[#f4f5f0] border border-[#9da586]/30 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <img
        src={destination.image}
        alt={destination.name}
        className="h-48 w-full object-cover"
      />
      <CardContent className="p-4 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#131312] mb-2">
            {destination.name}
          </h3>
          <p className="text-sm text-[#131312]/70 mb-4 line-clamp-3">
            {destination.description}
          </p>
        </div>
        <Link
          to={`/destinations/${destination.id}`}
          className="inline-block rounded-lg bg-[#9da586] text-[#f7f7ec] font-medium py-2 px-4 text-center hover:bg-[#131312] transition-colors"
        >
          Explore {destination.shortName || destination.name}
        </Link>
      </CardContent>
    </Card>
  );
}
