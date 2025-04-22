import Link from "next/link"
import type { Match } from "@/lib/api"
import { formatDate } from "@/lib/utils"

export function TeamRecentMatches({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold">Recent Results</h2>
        <p className="text-muted-foreground">No recent matches found.</p>
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Recent Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2 text-sm font-medium text-muted-foreground">Date</th>
              <th className="pb-2 text-sm font-medium text-muted-foreground">Competition</th>
              <th className="pb-2 text-center text-sm font-medium text-muted-foreground">Match</th>
              <th className="pb-2 text-center text-sm font-medium text-muted-foreground">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {matches.map((match) => {
              const isHomeTeam =
                match.homeTeam.id === matches[0].homeTeam.id || match.homeTeam.id === matches[0].awayTeam.id
              const teamScore = isHomeTeam ? match.score.home : match.score.away
              const opponentScore = isHomeTeam ? match.score.away : match.score.home
              const result = teamScore > opponentScore ? "W" : teamScore < opponentScore ? "L" : "D"
              const resultClass = result === "W" ? "bg-green-600" : result === "L" ? "bg-red-600" : "bg-amber-600"

              return (
                <tr key={match.id} className="hover:bg-muted/50">
                  <td className="py-3 text-sm">{formatDate(match.date, "dd MMM yyyy")}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full overflow-hidden bg-muted">
                        <img
                          src={match.league.logo || "/placeholder.svg"}
                          alt={match.league.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{match.league.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <Link href={`/matches/${match.id}`} className="inline-block hover:underline">
                      <span>
                        {match.homeTeam.name} vs {match.awayTeam.name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white ${resultClass}`}
                      >
                        {result}
                      </div>
                      <span>
                        {match.score.home} - {match.score.away}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
