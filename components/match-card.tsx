import Link from "next/link"
import type { Match } from "@/lib/api"
import { MessageCircle, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "IN PLAY"

  return (
    <div className="group relative mb-2 flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-all hover:border-muted-foreground">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </Button>
        <div className="flex min-w-0 flex-1 items-center">
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <Link href={`/teams/${match.homeTeam.id}`} className="flex items-center hover:underline">
                <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
                  <img
                    src={match.homeTeam.logo || "/placeholder.svg"}
                    alt={match.homeTeam.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="ml-2 truncate">{match.homeTeam.name}</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link href={`/teams/${match.awayTeam.id}`} className="flex items-center hover:underline">
                <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
                  <img
                    src={match.awayTeam.logo || "/placeholder.svg"}
                    alt={match.awayTeam.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="ml-2 truncate">{match.awayTeam.name}</span>
              </Link>
            </div>
          </div>
          <Link href={`/matches/${match.id}`} className="ml-4 flex flex-col items-center hover:opacity-80">
            {isLive && (
              <span className="mb-1 rounded bg-brand-red px-1.5 py-0.5 text-xs font-medium text-white">
                {match.minute}
              </span>
            )}
            <div className="text-lg font-bold">
              {match.score.home} - {match.score.away}
            </div>
          </Link>
        </div>
      </div>
      <div className="flex space-x-2">
        <Link href={`/matches/${match.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/matches/${match.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Monitor className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
