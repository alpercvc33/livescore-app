"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

type NotificationPrefs = {
  id: string
  userId: string
  matchStart: boolean
  goals: boolean
  halfTime: boolean
  fullTime: boolean
  redCards: boolean
  favoriteTeamsOnly: boolean
}

export function NotificationSettings() {
  const router = useRouter()
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const response = await fetch("/api/user/notifications")
        const data = await response.json()

        if (response.ok) {
          setPrefs(data.prefs)
        }
      } catch (error) {
        console.error("Error fetching notification preferences:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrefs()
  }, [])

  const handleToggle = (field: keyof NotificationPrefs) => {
    if (!prefs) return

    setPrefs({
      ...prefs,
      [field]: !prefs[field],
    })
  }

  const handleSave = async () => {
    if (!prefs) return

    try {
      setError(null)
      setSuccess(null)
      setIsSaving(true)

      const response = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchStart: prefs.matchStart,
          goals: prefs.goals,
          halfTime: prefs.halfTime,
          fullTime: prefs.fullTime,
          redCards: prefs.redCards,
          favoriteTeamsOnly: prefs.favoriteTeamsOnly,
        }),
      })

      if (!response.ok) {
        setError("Failed to save notification preferences")
        return
      }

      setSuccess("Notification preferences saved successfully")
      router.refresh()
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold">Notification Settings</h2>
        <div className="flex h-24 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!prefs) {
    return (
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold">Notification Settings</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load notification preferences</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Notification Settings</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 border-green-500 bg-green-500/10 text-green-500">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Match Events</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="matchStart" className="flex-1">
                Match Start
                <p className="text-sm text-muted-foreground">Get notified when matches start</p>
              </Label>
              <Switch id="matchStart" checked={prefs.matchStart} onCheckedChange={() => handleToggle("matchStart")} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="goals" className="flex-1">
                Goals
                <p className="text-sm text-muted-foreground">Get notified when goals are scored</p>
              </Label>
              <Switch id="goals" checked={prefs.goals} onCheckedChange={() => handleToggle("goals")} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="halfTime" className="flex-1">
                Half Time
                <p className="text-sm text-muted-foreground">Get notified at half time</p>
              </Label>
              <Switch id="halfTime" checked={prefs.halfTime} onCheckedChange={() => handleToggle("halfTime")} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="fullTime" className="flex-1">
                Full Time
                <p className="text-sm text-muted-foreground">Get notified when matches end</p>
              </Label>
              <Switch id="fullTime" checked={prefs.fullTime} onCheckedChange={() => handleToggle("fullTime")} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="redCards" className="flex-1">
                Red Cards
                <p className="text-sm text-muted-foreground">Get notified when red cards are shown</p>
              </Label>
              <Switch id="redCards" checked={prefs.redCards} onCheckedChange={() => handleToggle("redCards")} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Filter</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="favoriteTeamsOnly" className="flex-1">
              Favorite Teams Only
              <p className="text-sm text-muted-foreground">Only receive notifications for your favorite teams</p>
            </Label>
            <Switch
              id="favoriteTeamsOnly"
              checked={prefs.favoriteTeamsOnly}
              onCheckedChange={() => handleToggle("favoriteTeamsOnly")}
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
