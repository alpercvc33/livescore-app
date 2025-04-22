import type { MatchStats } from "@/lib/api"
import { Progress } from "@/components/ui/progress"

export function MatchStatistics({ stats }: { stats: MatchStats }) {
  return (
    <div className="mb-8 rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold">Match Statistics</h2>

      <div className="space-y-6">
        <StatItem label="Possession" homeValue={stats.possession.home} awayValue={stats.possession.away} unit="%" />

        <StatItem label="Shots" homeValue={stats.shots.home} awayValue={stats.shots.away} />

        <StatItem label="Shots on Target" homeValue={stats.shotsOnTarget.home} awayValue={stats.shotsOnTarget.away} />

        <StatItem label="Corners" homeValue={stats.corners.home} awayValue={stats.corners.away} />

        <StatItem label="Fouls" homeValue={stats.fouls.home} awayValue={stats.fouls.away} />

        <StatItem label="Yellow Cards" homeValue={stats.yellowCards.home} awayValue={stats.yellowCards.away} />

        <StatItem label="Red Cards" homeValue={stats.redCards.home} awayValue={stats.redCards.away} />

        <StatItem label="Offsides" homeValue={stats.offsides.home} awayValue={stats.offsides.away} />
      </div>
    </div>
  )
}

function StatItem({
  label,
  homeValue,
  awayValue,
  unit = "",
}: {
  label: string
  homeValue: number
  awayValue: number
  unit?: string
}) {
  const total = homeValue + awayValue
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium">
          {homeValue}
          {unit}
        </span>
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {awayValue}
          {unit}
        </span>
      </div>
      <div className="flex gap-1">
        <Progress value={homePercentage} className="h-2" />
        <Progress value={awayPercentage} className="h-2" />
      </div>
    </div>
  )
}
