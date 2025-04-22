"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchHeader } from "@/components/match-header"
import { MatchLineups } from "@/components/match-lineups"
import { MatchStatistics } from "@/components/match-stats"
import { MatchTimeline } from "@/components/match-timeline"
import { getMatchDetails, type MatchDetails } from "@/lib/api"
import { useLiveData } from "@/hooks/use-live-data"

export default function MatchPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("timeline")

  const {
    data: match,
    loading,
    error,
  } = useLiveData<MatchDetails>(
    () => getMatchDetails(params.id),
    30000, // Refresh every 30 seconds
    [params.id],
  )

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-4">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error || !match) {
    return (
      <div className="container mx-auto max-w-4xl py-4">
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold">Match not found</h3>
          <p className="mt-2 text-muted-foreground">The match you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-4">
      <MatchHeader match={match} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="lineups">Lineups</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          <MatchTimeline events={match.events} />
        </TabsContent>

        <TabsContent value="lineups" className="mt-6">
          <MatchLineups home={match.lineups.home} away={match.lineups.away} />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <MatchStatistics stats={match.stats} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
