"use client"

import { useState, useEffect } from "react"
import { MatchFilters } from "@/components/match-filters"
import { MatchCard } from "@/components/match-card"
import { getMatchesByLeague, getPopularLeagues, type Match, type League } from "@/lib/api"
import { format } from "date-fns"

export default function LeaguePage({ params }: { params: { id: string } }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [matches, setMatches] = useState<Match[]>([])
  const [league, setLeague] = useState<League | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, we would fetch from the API
        // For now, we'll use our mock data
        const leaguesData = getPopularLeagues()
        const currentLeague = leaguesData.find((l) => l.id === params.id) || null
        setLeague(currentLeague)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Get matches for this league
        const matchesData = getMatchesByLeague(params.id)
        setMatches(matchesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up auto-refresh for live data every 30 seconds
    const intervalId = setInterval(() => {
      if (activeFilter === "live") {
        fetchData()
      }
    }, 30000)

    return () => clearInterval(intervalId)
  }, [params.id, selectedDate, activeFilter])

  // Filter matches based on active filter
  const filteredMatches = matches.filter((match) => {
    if (activeFilter === "all") return true
    if (activeFilter === "live") return match.status === "IN PLAY"
    if (activeFilter === "finished") return match.status === "FINISHED"
    return true
  })

  return (
    <div className="container mx-auto max-w-4xl py-4">
      {league && (
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden bg-muted">
            <img src={league.logo || "/placeholder.svg"} alt={league.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{league.name}</h1>
            <p className="text-muted-foreground">{league.country}</p>
          </div>
        </div>
      )}

      <MatchFilters onFilterChange={setActiveFilter} onDateChange={setSelectedDate} />

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold">No matches found</h3>
          <p className="mt-2 text-muted-foreground">Try changing your filters or selecting a different date</p>
        </div>
      ) : (
        <div>
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  )
}
