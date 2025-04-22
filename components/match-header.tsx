import Link from "next/link"
import { Calendar, MapPin, User } from "lucide-react"
import type { MatchDetails } from "@/lib/api"
import { formatDate } from "@/lib/utils"

export function MatchHeader({ match }: { match: MatchDetails }) {
  const isLive = match.status === "IN PLAY"
  const isFinished = match.status === "FINISHED"

  return (
    <div className="mb-6 rounded-lg border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
            <img
              src={match.league.logo || "/placeholder.svg"}
              alt={match.league.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Link href={`/leagues/${match.league.id}`} className="text-sm font-medium hover:underline">
              {match.league.name}
            </Link>
            <p className="text-xs text-muted-foreground">{match.league.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDate(match.date, "dd MMM yyyy")} • {match.time}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{match.venue}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{match.referee}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <div className="flex flex-1 flex-col items-center text-center">
          <Link href={`/teams/${match.homeTeam.id}`} className="group">
            <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full overflow-hidden bg-muted transition-transform group-hover:scale-105">
              <img
                src={match.homeTeam.logo || "/placeholder.svg"}
                alt={match.homeTeam.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold group-hover:underline">{match.homeTeam.name}</h2>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          {isLive && (
            <span className="mb-2 animate-pulse rounded bg-brand-red px-2 py-1 text-xs font-medium text-white">
              LIVE {match.minute}
            </span>
          )}
          {isFinished && <span className="mb-2 text-xs font-medium text-muted-foreground">FULL TIME</span>}
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{match.score.home}</span>
            <span className="text-xl">-</span>
            <span className="text-4xl font-bold">{match.score.away}</span>
          </div>
          {match.score.halftime && (
            <span className="mt-1 text-xs text-muted-foreground">
              HT: {match.score.halftime.home} - {match.score.halftime.away}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center text-center">
          <Link href={`/teams/${match.awayTeam.id}`} className="group">
            <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full overflow-hidden bg-muted transition-transform group-hover:scale-105">
              <img
                src={match.awayTeam.logo || "/placeholder.svg"}
                alt={match.awayTeam.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold group-hover:underline">{match.awayTeam.name}</h2>
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium">H2H:</span>
          <span className="text-muted-foreground">{match.h2h.matches} matches</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-green-500">{match.h2h.homeWins}</span>
          <span className="text-muted-foreground">wins</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-amber-500">{match.h2h.draws}</span>
          <span className="text-muted-foreground">draws</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-red-500">{match.h2h.awayWins}</span>
          <span className="text-muted-foreground">wins</span>
        </div>
      </div>
    </div>
  )
}
