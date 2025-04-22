import { BarChart3, TrendingUp } from "lucide-react"
import type { TeamStats } from "@/lib/api"
import { Progress } from "@/components/ui/progress"

export function TeamStats({ stats }: { stats: TeamStats }) {
  const totalPoints = stats.matches.wins * 3 + stats.matches.draws
  const maxPoints = stats.matches.played * 3
  const pointsPercentage = (totalPoints / maxPoints) * 100

  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Team Statistics</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <BarChart3 className="h-5 w-5" />
            <span>Match Statistics</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Matches Played</span>
                <span className="font-medium">{stats.matches.played}</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Wins</span>
                <span className="font-medium">{stats.matches.wins}</span>
              </div>
              <Progress value={(stats.matches.wins / stats.matches.played) * 100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Draws</span>
                <span className="font-medium">{stats.matches.draws}</span>
              </div>
              <Progress value={(stats.matches.draws / stats.matches.played) * 100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Losses</span>
                <span className="font-medium">{stats.matches.losses}</span>
              </div>
              <Progress value={(stats.matches.losses / stats.matches.played) * 100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Points</span>
                <span className="font-medium">
                  {totalPoints} / {maxPoints}
                </span>
              </div>
              <Progress value={pointsPercentage} className="h-2" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5" />
            <span>Performance</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Goals Scored</span>
                <span className="font-medium">{stats.goals.for}</span>
              </div>
              <Progress value={(stats.goals.for / (stats.goals.for + stats.goals.against)) * 100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Goals Conceded</span>
                <span className="font-medium">{stats.goals.against}</span>
              </div>
              <Progress value={(stats.goals.against / (stats.goals.for + stats.goals.against)) * 100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Clean Sheets</span>
                <span className="font-medium">{stats.cleanSheets}</span>
              </div>
              <Progress value={(stats.cleanSheets / stats.matches.played) * 100} className="h-2" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm">Recent Form</span>
              </div>
              <div className="flex gap-1">
                {stats.form.map((result, index) => (
                  <div
                    key={index}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      result === "W"
                        ? "bg-green-600 text-white"
                        : result === "D"
                          ? "bg-amber-600 text-white"
                          : "bg-red-600 text-white"
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
