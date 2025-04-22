"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Loader2, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPopularLeagues } from "@/lib/api"
import type { Team } from "@/lib/api"

type FavoriteTeam = {
  id: string
  teamId: string
  userId: string
  createdAt: string
}

export function FavoriteTeams() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteTeam[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/user/favorites")
        const data = await response.json()

        if (response.ok) {
          setFavorites(data.favorites)
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()

    // Mock teams data
    const leagues = getPopularLeagues()
    const mockTeams: Team[] = []

    leagues.forEach((league) => {
      for (let i = 1; i <= 5; i++) {
        mockTeams.push({
          id: `team-${league.id}-${i}`,
          name: `${league.name} Team ${i}`,
          logo: `/placeholder.svg?height=40&width=40&text=${league.name.charAt(0)}${i}`,
        })
      }
    })

    setTeams(mockTeams)
  }, [])

  const addFavorite = async (teamId: string) => {
    try {
      setIsAdding(true)
      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId }),
      })

      const data = await response.json()

      if (response.ok) {
        setFavorites([...favorites, data.favorite])
        router.refresh()
      }
    } catch (error) {
      console.error("Error adding favorite:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const removeFavorite = async (teamId: string) => {
    try {
      setIsRemoving(teamId)
      const response = await fetch(`/api/user/favorites?teamId=${teamId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.teamId !== teamId))
        router.refresh()
      }
    } catch (error) {
      console.error("Error removing favorite:", error)
    } finally {
      setIsRemoving(null)
    }
  }

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const favoriteTeamIds = favorites.map((fav) => fav.teamId)
  const favoriteTeams = teams.filter((team) => favoriteTeamIds.includes(team.id))

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Favorite Teams</h2>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Your Favorites</h3>
        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : favoriteTeams.length === 0 ? (
          <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
            <Heart className="mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">You haven't added any favorite teams yet</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteTeams.map((team) => (
              <div key={team.id} className="flex items-center justify-between rounded-lg border p-4">
                <Link href={`/teams/${team.id}`} className="flex items-center gap-3 hover:underline">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-muted">
                    <img src={team.logo || "/placeholder.svg"} alt={team.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="font-medium">{team.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFavorite(team.id)}
                  disabled={isRemoving === team.id}
                >
                  {isRemoving === team.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium">Add Teams</h3>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeams
            .filter((team) => !favoriteTeamIds.includes(team.id))
            .slice(0, 9)
            .map((team) => (
              <div key={team.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-muted">
                    <img src={team.logo || "/placeholder.svg"} alt={team.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="font-medium">{team.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => addFavorite(team.id)}
                  disabled={isAdding}
                  className="text-brand-red hover:text-brand-red/80"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
