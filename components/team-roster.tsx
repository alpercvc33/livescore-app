"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Player } from "@/lib/api"

export function TeamRoster({ players }: { players: Player[] }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"]

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Team Roster</h2>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search players..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {positions.map((position) => {
          const positionPlayers = filteredPlayers.filter((player) => player.position === position)

          if (positionPlayers.length === 0) return null

          return (
            <div key={position}>
              <h3 className="mb-3 text-lg font-semibold">{position}s</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {positionPlayers.map((player) => (
                  <div key={player.id} className="flex items-center gap-3 rounded-lg border p-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-muted">
                      <img
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate font-medium">{player.name}</p>
                        <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                          {player.number}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{player.nationality}</span>
                        <span>•</span>
                        <span>{player.age} years</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
