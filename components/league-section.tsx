import { ChevronRight } from "lucide-react"
import type { Match, League } from "@/lib/api"
import { MatchCard } from "@/components/match-card"
import Link from "next/link"

export function LeagueSection({
  league,
  matches,
}: {
  league: League
  matches: Match[]
}) {
  if (matches.length === 0) return null

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
            <img src={league.logo || "/placeholder.svg"} alt={league.name} className="h-full w-full object-cover" />
          </div>
          <h2 className="text-lg font-bold">{league.name}</h2>
          <span className="text-sm text-muted-foreground">{league.country}</span>
        </div>
        <Link
          href={`/leagues/${league.id}`}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <span>View All</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div>
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}
