"use client"

import { useState } from "react"
import { Heart, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { TeamDetails } from "@/lib/api"

export function TeamHeader({ team }: { team: TeamDetails }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if team is in favorites
  useState(() => {
    if (!session?.user) return

    const checkFavorite = async () => {
      try {
        const response = await fetch("/api/user/favorites")
        const data = await response.json()

        if (response.ok) {
          const favorites = data.favorites || []
          setIsFavorite(favorites.some((fav: any) => fav.teamId === team.id))
        }
      } catch (error) {
        console.error("Error checking favorite status:", error)
      }
    }

    checkFavorite()
  })

  const toggleFavorite = async () => {
    if (!session?.user) {
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`/api/user/favorites?teamId=${team.id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setIsFavorite(false)
        }
      } else {
        // Add to favorites
        const response = await fetch("/api/user/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId: team.id }),
        })

        if (response.ok) {
          setIsFavorite(true)
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-lg border bg-card p-6 sm:flex-row">
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full overflow-hidden bg-muted">
          <img src={team.logo || "/placeholder.svg"} alt={team.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{team.country}</span>
            <span>Founded: {team.founded}</span>
            <span>Stadium: {team.venue}</span>
            <span>Coach: {team.coach}</span>
          </div>
        </div>
      </div>
      <Button
        className={`flex items-center gap-2 ${
          isFavorite ? "bg-gray-700 hover:bg-gray-600" : "bg-brand-red hover:bg-brand-red/90"
        }`}
        onClick={toggleFavorite}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
        )}
        <span>{isFavorite ? "Following" : "Follow"}</span>
      </Button>
    </div>
  )
}
