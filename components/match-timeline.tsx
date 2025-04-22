"use client"

import { useState } from "react"
import type { MatchEvent } from "@/lib/api"
import {
  Goal,
  Clock,
  AlertTriangle,
  RefreshCw,
  BellIcon as Whistle,
  PauseCircle,
  CheckCircle,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export function MatchTimeline({ events }: { events: MatchEvent[] }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = events.filter(
    (event) =>
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.player?.name && event.player.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Match Timeline</h2>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-border">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="relative">
              <div className="absolute -left-6 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-background">
                {getEventIcon(event.type)}
              </div>
              <div
                className={`rounded-md border p-3 ${
                  event.team === "home" ? "border-l-4 border-l-blue-500" : "border-r-4 border-r-red-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">{event.minute}'</span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {event.team === "home" ? "Home Team" : "Away Team"}
                  </span>
                </div>
                <p className="mt-1">{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">No events found</div>
        )}
      </div>
    </div>
  )
}

function getEventIcon(type: MatchEvent["type"]) {
  switch (type) {
    case "goal":
      return <Goal className="h-3 w-3 text-green-500" />
    case "yellow-card":
      return <AlertTriangle className="h-3 w-3 text-amber-500" />
    case "red-card":
      return <AlertTriangle className="h-3 w-3 text-red-500" />
    case "substitution":
      return <RefreshCw className="h-3 w-3 text-blue-500" />
    case "var":
      return <Search className="h-3 w-3 text-purple-500" />
    case "penalty":
      return <Goal className="h-3 w-3 text-orange-500" />
    case "kick-off":
      return <Whistle className="h-3 w-3 text-muted-foreground" />
    case "half-time":
      return <PauseCircle className="h-3 w-3 text-muted-foreground" />
    case "full-time":
      return <CheckCircle className="h-3 w-3 text-muted-foreground" />
    default:
      return <Clock className="h-3 w-3 text-muted-foreground" />
  }
}
