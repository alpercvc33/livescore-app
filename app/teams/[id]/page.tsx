"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamHeader } from "@/components/team-header"
import { TeamRoster } from "@/components/team-roster"
import { TeamUpcomingMatches } from "@/components/team-upcoming-matches"
import { TeamStats } from "@/components/team-stats"
import { TeamRecentMatches } from "@/components/team-recent-matches"
import {
  getTeamDetails,
  getTeamStats,
  getTeamUpcomingMatches,
  getTeamRecentMatches,
  type TeamDetails,
  type TeamStats as TeamStatsType,
  type Match,
} from "@/lib/api"

export default function TeamPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<TeamDetails | null>(null)
  const [stats, setStats] = useState<TeamStatsType | null>(null)
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [recentMatches, setRecentMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [teamData, statsData, upcomingData, recentData] = await Promise.all([
          getTeamDetails(params.id),
          getTeamStats(params.id),
          getTeamUpcomingMatches(params.id),
          getTeamRecentMatches(params.id),
        ])

        setTeam(teamData)
        setStats(statsData)
        setUpcomingMatches(upcomingData)
        setRecentMatches(recentData)
      } catch (error) {
        console.error("Error fetching team data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-4">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="container mx-auto max-w-4xl py-4">
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold">Team not found</h3>
          <p className="mt-2 text-muted-foreground">The team you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-4">
      <TeamHeader team={team} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>{stats && <TeamStats stats={stats} />}</div>
            <div>
              <TeamUpcomingMatches matches={upcomingMatches.slice(0, 3)} />
              <TeamRecentMatches matches={recentMatches.slice(0, 3)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roster" className="mt-6">
          <TeamRoster players={team.players} />
        </TabsContent>

        <TabsContent value="matches" className="mt-6">
          <TeamUpcomingMatches matches={upcomingMatches} />
          <TeamRecentMatches matches={recentMatches} />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          {stats && <TeamStats stats={stats} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
