"use client"

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"
import { getNews, type News } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

export function TrendingNews() {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    setNews(getNews())
  }, [])

  return (
    <div className="hidden w-[320px] border-l lg:block">
      <div className="p-4">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          Trending News
          <span className="text-brand-red">🔥</span>
        </h2>
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="group relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-[120px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-2 font-medium leading-tight">{item.title}</h3>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
