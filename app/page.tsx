"use client"

import { useState, useEffect } from "react"
import { AppBanner } from "@/components/app-banner"
import { MatchFilters } from "@/components/match-filters"
import { LeagueSection } from "@/components/league-section"
import { getMatchesByLeague, getPopularLeagues, type Match, type League } from "@/lib/api"
import { format } from "date-fns"

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [matches, setMatches] = useState<Match[]>([])
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, we would fetch from the API
        // For now, we'll use our mock data
        const leaguesData = getPopularLeagues()
        setLeagues(leaguesData)

        let matchesData: Match[] = []

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Get matches for each league
        leaguesData.forEach((league) => {
          const leagueMatches = getMatchesByLeague(league.id)
          matchesData = [...matchesData, ...leagueMatches]
        })

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
  }, [selectedDate, activeFilter])

  // Filter matches based on active filter
  const filteredMatches = matches.filter((match) => {
    if (activeFilter === "all") return true
    if (activeFilter === "live") return match.status === "IN PLAY"
    if (activeFilter === "finished") return match.status === "FINISHED"
    return true
  })

  // Group matches by league
  const matchesByLeague = filteredMatches.reduce<Record<string, Match[]>>((acc, match) => {
    const leagueId = match.league.id
    if (!acc[leagueId]) {
      acc[leagueId] = []
    }
    acc[leagueId].push(match)
    return acc
  }, {})

  return (
    <div className="container mx-auto max-w-4xl py-4">
      <AppBanner />

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
        Object.entries(matchesByLeague).map(([leagueId, leagueMatches]) => {
          const league = leagues.find((l) => l.id === leagueId) || leagueMatches[0].league
          return <LeagueSection key={leagueId} league={league} matches={leagueMatches} />
        })
      )}
    </div>
  )
}
