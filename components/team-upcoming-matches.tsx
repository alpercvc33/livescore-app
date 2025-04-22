import Link from "next/link"
import { Calendar } from "lucide-react"
import type { Match } from "@/lib/api"
import { formatDate } from "@/lib/utils"

export function TeamUpcomingMatches({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold">Upcoming Matches</h2>
        <p className="text-muted-foreground">No upcoming matches scheduled.</p>
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Upcoming Matches</h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/matches/${match.id}`}
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:border-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-muted">
                <img
                  src={match.league.logo || "/placeholder.svg"}
                  alt={match.league.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{match.league.name}</p>
                <p className="text-sm text-muted-foreground">{match.league.country}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
                    <img
                      src={match.homeTeam.logo || "/placeholder.svg"}
                      alt={match.homeTeam.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{match.homeTeam.name}</span>
                </div>
                <span className="text-sm">vs</span>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
                    <img
                      src={match.awayTeam.logo || "/placeholder.svg"}
                      alt={match.awayTeam.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{match.awayTeam.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(match.date, "dd MMM yyyy")}</span>
              <span>•</span>
              <span>{match.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
