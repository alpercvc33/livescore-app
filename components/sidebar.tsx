"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Globe, Heart, Trophy, Users } from "lucide-react"
import { getPopularLeagues, getCountries } from "@/lib/api"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const [myTeamsOpen, setMyTeamsOpen] = useState(false)
  const [countriesOpen, setCountriesOpen] = useState(false)
  const [teamsOpen, setTeamsOpen] = useState(false)

  const leagues = getPopularLeagues()
  const countries = getCountries()

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white">
            <Trophy className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold">LiveScores</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Leagues</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {leagues.map((league) => (
                <SidebarMenuItem key={league.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/leagues/${league.id}`} className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full overflow-hidden bg-muted">
                        <img
                          src={league.logo || "/placeholder.svg"}
                          alt={league.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{league.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel onClick={() => setTeamsOpen(!teamsOpen)} className="cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Teams</span>
              </div>
              {teamsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </SidebarGroupLabel>
          {teamsOpen && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/teams/1">
                      <span>Team 1</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/teams/2">
                      <span>Team 2</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/teams/3">
                      <span>Team 3</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel onClick={() => setMyTeamsOpen(!myTeamsOpen)} className="cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>My Teams</span>
              </div>
              {myTeamsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </SidebarGroupLabel>
          {myTeamsOpen && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/my-teams">
                      <span>Add your favorite teams</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel onClick={() => setCountriesOpen(!countriesOpen)} className="cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Countries</span>
              </div>
              {countriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </SidebarGroupLabel>
          {countriesOpen && (
            <SidebarGroupContent>
              <SidebarMenu>
                {countries.map((country) => (
                  <SidebarMenuItem key={country.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/countries/${country.id}`}>
                        <span>{country.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  )
}
