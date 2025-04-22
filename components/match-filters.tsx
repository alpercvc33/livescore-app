"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "odds", label: "Odds" },
  { id: "finished", label: "Finished" },
]

export function MatchFilters({
  onFilterChange,
  onDateChange,
}: {
  onFilterChange: (filter: string) => void
  onDateChange: (date: string) => void
}) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  const handleDateChange = (offset: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + offset)
    setSelectedDate(newDate)
    onDateChange(format(newDate, "yyyy-MM-dd"))
  }

  return (
    <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={cn("rounded-full", activeFilter === filter.id && "bg-brand-red hover:bg-brand-red/90")}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="flex items-center space-x-2 rounded-full border bg-background p-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDateChange(-1)}>
          &lt;
        </Button>
        <div className="flex items-center space-x-2 px-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{format(selectedDate, "EEE, dd MMM yyyy")}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDateChange(1)}>
          &gt;
        </Button>
      </div>
    </div>
  )
}
