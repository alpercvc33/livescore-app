import Link from "next/link"
import type { MatchLineup } from "@/lib/api"

export function MatchLineups({ home, away }: { home: MatchLineup; away: MatchLineup }) {
  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Lineups</h2>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
            <img
              src={home.team.logo || "/placeholder.svg"}
              alt={home.team.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Link href={`/teams/${home.team.id}`} className="font-medium hover:underline">
              {home.team.name}
            </Link>
            <p className="text-xs text-muted-foreground">Coach: {home.coach}</p>
          </div>
        </div>
        <div className="text-sm font-medium">Formation: {home.formation}</div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Starting XI</h3>
          <div className="space-y-2">
            {home.startingXI.map((player) => (
              <div key={player.id} className="flex items-center gap-2 rounded-md border p-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {player.number}
                </span>
                <span className="flex-1">{player.name}</span>
                <span className="text-xs text-muted-foreground">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Substitutes</h3>
          <div className="space-y-2">
            {home.substitutes.map((player) => (
              <div key={player.id} className="flex items-center gap-2 rounded-md border p-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {player.number}
                </span>
                <span className="flex-1">{player.name}</span>
                <span className="text-xs text-muted-foreground">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-6 border-t"></div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-muted">
            <img
              src={away.team.logo || "/placeholder.svg"}
              alt={away.team.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Link href={`/teams/${away.team.id}`} className="font-medium hover:underline">
              {away.team.name}
            </Link>
            <p className="text-xs text-muted-foreground">Coach: {away.coach}</p>
          </div>
        </div>
        <div className="text-sm font-medium">Formation: {away.formation}</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Starting XI</h3>
          <div className="space-y-2">
            {away.startingXI.map((player) => (
              <div key={player.id} className="flex items-center gap-2 rounded-md border p-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {player.number}
                </span>
                <span className="flex-1">{player.name}</span>
                <span className="text-xs text-muted-foreground">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Substitutes</h3>
          <div className="space-y-2">
            {away.substitutes.map((player) => (
              <div key={player.id} className="flex items-center gap-2 rounded-md border p-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {player.number}
                </span>
                <span className="flex-1">{player.name}</span>
                <span className="text-xs text-muted-foreground">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
