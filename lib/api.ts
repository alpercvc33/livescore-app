const API_BASE_URL = "https://livescore-api.com/api-client"
const API_KEY = process.env.LIVESCORE_API_KEY
const API_SECRET = process.env.LIVESCORE_API_SECRET

export type League = {
  id: string
  name: string
  country: string
  logo?: string
}

export type Team = {
  id: string
  name: string
  logo?: string
}

export type Match = {
  id: string
  date: string
  time: string
  status: string
  minute: string
  homeTeam: Team
  awayTeam: Team
  score: {
    home: number
    away: number
  }
  league: League
}

export type News = {
  id: string
  title: string
  summary: string
  image: string
  date: string
  url: string
}

export type Player = {
  id: string
  name: string
  number: number
  position: string
  nationality: string
  age: number
  image?: string
}

export type TeamDetails = {
  id: string
  name: string
  logo?: string
  country: string
  founded: number
  venue: string
  coach: string
  players: Player[]
}

export type TeamStats = {
  matches: {
    played: number
    wins: number
    draws: number
    losses: number
  }
  goals: {
    for: number
    against: number
  }
  cleanSheets: number
  form: string[] // "W", "L", "D" for the last 5 matches
}

export type MatchEvent = {
  id: string
  type:
    | "goal"
    | "yellow-card"
    | "red-card"
    | "substitution"
    | "var"
    | "penalty"
    | "kick-off"
    | "half-time"
    | "full-time"
  minute: number
  team: "home" | "away"
  player?: Player
  assistBy?: Player
  inPlayer?: Player
  outPlayer?: Player
  description: string
}

export type MatchLineup = {
  team: Team
  formation: string
  startingXI: Player[]
  substitutes: Player[]
  coach: string
}

export type MatchStats = {
  possession: {
    home: number
    away: number
  }
  shots: {
    home: number
    away: number
  }
  shotsOnTarget: {
    home: number
    away: number
  }
  corners: {
    home: number
    away: number
  }
  fouls: {
    home: number
    away: number
  }
  yellowCards: {
    home: number
    away: number
  }
  redCards: {
    home: number
    away: number
  }
  offsides: {
    home: number
    away: number
  }
}

export type MatchDetails = {
  id: string
  date: string
  time: string
  status: string
  minute: string
  homeTeam: Team
  awayTeam: Team
  score: {
    home: number
    away: number
    halftime?: {
      home: number
      away: number
    }
  }
  league: League
  venue: string
  referee: string
  events: MatchEvent[]
  lineups: {
    home: MatchLineup
    away: MatchLineup
  }
  stats: MatchStats
  h2h: {
    matches: number
    homeWins: number
    awayWins: number
    draws: number
  }
}

export async function getLeagues(): Promise<League[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/leagues?key=${API_KEY}&secret=${API_SECRET}`)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch leagues")
    }

    return data.data.leagues.map((league: any) => ({
      id: league.id,
      name: league.name,
      country: league.country_name || "International",
      logo: `/placeholder.svg?height=24&width=24&text=${league.name.charAt(0)}`,
    }))
  } catch (error) {
    console.error("Error fetching leagues:", error)
    return []
  }
}

export async function getLiveMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/scores/live.json?key=${API_KEY}&secret=${API_SECRET}`)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch live matches")
    }

    return data.data.match.map((match: any) => ({
      id: match.id,
      date: match.date,
      time: match.time,
      status: match.status,
      minute: match.minute,
      homeTeam: {
        id: match.home_id,
        name: match.home_name,
        logo: `/placeholder.svg?height=24&width=24&text=${match.home_name.charAt(0)}`,
      },
      awayTeam: {
        id: match.away_id,
        name: match.away_name,
        logo: `/placeholder.svg?height=24&width=24&text=${match.away_name.charAt(0)}`,
      },
      score: {
        home: Number.parseInt(match.score.split("-")[0].trim()),
        away: Number.parseInt(match.score.split("-")[1].trim()),
      },
      league: {
        id: match.competition_id,
        name: match.competition_name,
        country: match.country_name || "International",
        logo: `/placeholder.svg?height=24&width=24&text=${match.competition_name.charAt(0)}`,
      },
    }))
  } catch (error) {
    console.error("Error fetching live matches:", error)
    return []
  }
}

export async function getMatchesByDate(date: string): Promise<Match[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/fixtures/matches.json?key=${API_KEY}&secret=${API_SECRET}&date=${date}`,
    )
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch matches by date")
    }

    return data.data.fixtures.map((match: any) => ({
      id: match.id,
      date: match.date,
      time: match.time,
      status: match.status,
      minute: match.minute || "",
      homeTeam: {
        id: match.home_id,
        name: match.home_name,
        logo: `/placeholder.svg?height=24&width=24&text=${match.home_name.charAt(0)}`,
      },
      awayTeam: {
        id: match.away_id,
        name: match.away_name,
        logo: `/placeholder.svg?height=24&width=24&text=${match.away_name.charAt(0)}`,
      },
      score: {
        home: Number.parseInt(match.score.split("-")[0].trim() || "0"),
        away: Number.parseInt(match.score.split("-")[1].trim() || "0"),
      },
      league: {
        id: match.competition_id,
        name: match.competition_name,
        country: match.country_name || "International",
        logo: `/placeholder.svg?height=24&width=24&text=${match.competition_name.charAt(0)}`,
      },
    }))
  } catch (error) {
    console.error("Error fetching matches by date:", error)
    return []
  }
}

// Mock function for news since the API doesn't provide news
export function getNews(): News[] {
  return [
    {
      id: "1",
      title: "Real Sociedad 1-4 FC Barcelona: It's all starting to click!",
      summary: "Barcelona's impressive away win shows Flick's system is working",
      image: "/placeholder.svg?height=80&width=120&text=FCB",
      date: new Date().toISOString(),
      url: "#",
    },
    {
      id: "2",
      title: "The squad for the trip to San Sebastian Xavi names...",
      summary: "Barcelona announces squad for upcoming away match",
      image: "/placeholder.svg?height=80&width=120&text=Squad",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      url: "#",
    },
    {
      id: "3",
      title: "Carlo Ancelotti in the running to be named UEFA Coach of the Year",
      summary: "Real Madrid manager among favorites for prestigious award",
      image: "/placeholder.svg?height=80&width=120&text=Carlo",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      url: "#",
    },
    {
      id: "4",
      title: "FC Barcelona leads in Golden Boy 2022 candidates",
      summary: "Multiple Barcelona youngsters nominated for award",
      image: "/placeholder.svg?height=80&width=120&text=Barca",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      url: "#",
    },
    {
      id: "5",
      title: "Mohamed Salah can become Liverpool's outright leading scorer",
      summary: "Egyptian star closing in on club record",
      image: "/placeholder.svg?height=80&width=120&text=Salah",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      url: "#",
    },
  ]
}

// Mock function for popular leagues
export function getPopularLeagues(): League[] {
  return [
    {
      id: "1",
      name: "La Liga",
      country: "Spain",
      logo: "/placeholder.svg?height=24&width=24&text=LL",
    },
    {
      id: "2",
      name: "Bundesliga",
      country: "Germany",
      logo: "/placeholder.svg?height=24&width=24&text=BL",
    },
    {
      id: "3",
      name: "Premier League",
      country: "England",
      logo: "/placeholder.svg?height=24&width=24&text=PL",
    },
    {
      id: "4",
      name: "Serie A",
      country: "Italy",
      logo: "/placeholder.svg?height=24&width=24&text=SA",
    },
    {
      id: "5",
      name: "Ligue 1",
      country: "France",
      logo: "/placeholder.svg?height=24&width=24&text=L1",
    },
    {
      id: "6",
      name: "UEFA Champions League",
      country: "Europe",
      logo: "/placeholder.svg?height=24&width=24&text=UCL",
    },
    {
      id: "7",
      name: "UEFA Europa League",
      country: "Europe",
      logo: "/placeholder.svg?height=24&width=24&text=UEL",
    },
    {
      id: "8",
      name: "Major League Soccer",
      country: "USA",
      logo: "/placeholder.svg?height=24&width=24&text=MLS",
    },
    {
      id: "9",
      name: "Brasileirão",
      country: "Brazil",
      logo: "/placeholder.svg?height=24&width=24&text=BR",
    },
    {
      id: "10",
      name: "Australian League",
      country: "Australia",
      logo: "/placeholder.svg?height=24&width=24&text=AL",
    },
  ]
}

// Mock function for countries
export function getCountries(): { id: string; name: string }[] {
  return [
    { id: "1", name: "Spain" },
    { id: "2", name: "Germany" },
    { id: "3", name: "England" },
    { id: "4", name: "Italy" },
    { id: "5", name: "France" },
    { id: "6", name: "Netherlands" },
    { id: "7", name: "Portugal" },
    { id: "8", name: "Brazil" },
    { id: "9", name: "Argentina" },
    { id: "10", name: "USA" },
  ]
}

// Mock function for matches by league
export function getMatchesByLeague(leagueId: string): Match[] {
  const leagues = getPopularLeagues()
  const league = leagues.find((l) => l.id === leagueId) || leagues[0]

  const matches: Match[] = []

  // Generate 3-5 random matches for this league
  const matchCount = Math.floor(Math.random() * 3) + 3

  for (let i = 0; i < matchCount; i++) {
    const isLive = Math.random() > 0.5
    const minute = isLive ? `${Math.floor(Math.random() * 90) + 1}'` : ""
    const status = isLive ? "IN PLAY" : Math.random() > 0.5 ? "FINISHED" : "NOT STARTED"

    matches.push({
      id: `${leagueId}-${i}`,
      date: new Date().toISOString().split("T")[0],
      time: `${Math.floor(Math.random() * 12) + 12}:${Math.floor(Math.random() * 6) * 10}`,
      status,
      minute,
      homeTeam: {
        id: `home-${leagueId}-${i}`,
        name: `Home Team ${i + 1}`,
        logo: `/placeholder.svg?height=24&width=24&text=H${i + 1}`,
      },
      awayTeam: {
        id: `away-${leagueId}-${i}`,
        name: `Away Team ${i + 1}`,
        logo: `/placeholder.svg?height=24&width=24&text=A${i + 1}`,
      },
      score: {
        home: Math.floor(Math.random() * 4),
        away: Math.floor(Math.random() * 4),
      },
      league,
    })
  }

  return matches
}

// Get team details
export async function getTeamDetails(teamId: string): Promise<TeamDetails> {
  try {
    // In a real app, we would fetch from the API
    // For now, we'll use mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock team details
    return {
      id: teamId,
      name: `Team ${teamId}`,
      logo: `/placeholder.svg?height=120&width=120&text=Team`,
      country: "England",
      founded: 1892,
      venue: "Stadium Name",
      coach: "John Smith",
      players: generateMockPlayers(20),
    }
  } catch (error) {
    console.error("Error fetching team details:", error)
    throw error
  }
}

// Get team statistics
export async function getTeamStats(teamId: string): Promise<TeamStats> {
  try {
    // In a real app, we would fetch from the API
    // For now, we'll use mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock team statistics
    return {
      matches: {
        played: 38,
        wins: 22,
        draws: 10,
        losses: 6,
      },
      goals: {
        for: 68,
        against: 32,
      },
      cleanSheets: 15,
      form: ["W", "W", "D", "L", "W"],
    }
  } catch (error) {
    console.error("Error fetching team statistics:", error)
    throw error
  }
}

// Get upcoming matches for a team
export async function getTeamUpcomingMatches(teamId: string): Promise<Match[]> {
  try {
    // In a real app, we would fetch from the API
    // For now, we'll use mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate 5 upcoming matches
    const matches: Match[] = []
    for (let i = 0; i < 5; i++) {
      const isHome = i % 2 === 0
      const date = new Date()
      date.setDate(date.getDate() + i + 1)

      matches.push({
        id: `upcoming-${teamId}-${i}`,
        date: date.toISOString().split("T")[0],
        time: `${Math.floor(Math.random() * 12) + 12}:${Math.floor(Math.random() * 6) * 10}`,
        status: "NOT STARTED",
        minute: "",
        homeTeam: {
          id: isHome ? teamId : `opponent-${i}`,
          name: isHome ? `Team ${teamId}` : `Opponent ${i + 1}`,
          logo: isHome
            ? `/placeholder.svg?height=24&width=24&text=T${teamId}`
            : `/placeholder.svg?height=24&width=24&text=O${i + 1}`,
        },
        awayTeam: {
          id: isHome ? `opponent-${i}` : teamId,
          name: isHome ? `Opponent ${i + 1}` : `Team ${teamId}`,
          logo: isHome
            ? `/placeholder.svg?height=24&width=24&text=O${i + 1}`
            : `/placeholder.svg?height=24&width=24&text=T${teamId}`,
        },
        score: {
          home: 0,
          away: 0,
        },
        league: {
          id: `${i + 1}`,
          name: `League ${i + 1}`,
          country: "England",
          logo: `/placeholder.svg?height=24&width=24&text=L${i + 1}`,
        },
      })
    }

    return matches
  } catch (error) {
    console.error("Error fetching team upcoming matches:", error)
    return []
  }
}

// Get recent matches for a team
export async function getTeamRecentMatches(teamId: string): Promise<Match[]> {
  try {
    // In a real app, we would fetch from the API
    // For now, we'll use mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate 5 recent matches
    const matches: Match[] = []
    for (let i = 0; i < 5; i++) {
      const isHome = i % 2 === 0
      const date = new Date()
      date.setDate(date.getDate() - i - 1)

      const homeScore = Math.floor(Math.random() * 4)
      const awayScore = Math.floor(Math.random() * 4)

      matches.push({
        id: `recent-${teamId}-${i}`,
        date: date.toISOString().split("T")[0],
        time: `${Math.floor(Math.random() * 12) + 12}:${Math.floor(Math.random() * 6) * 10}`,
        status: "FINISHED",
        minute: "90",
        homeTeam: {
          id: isHome ? teamId : `opponent-${i}`,
          name: isHome ? `Team ${teamId}` : `Opponent ${i + 1}`,
          logo: isHome
            ? `/placeholder.svg?height=24&width=24&text=T${teamId}`
            : `/placeholder.svg?height=24&width=24&text=O${i + 1}`,
        },
        awayTeam: {
          id: isHome ? `opponent-${i}` : teamId,
          name: isHome ? `Opponent ${i + 1}` : `Team ${teamId}`,
          logo: isHome
            ? `/placeholder.svg?height=24&width=24&text=O${i + 1}`
            : `/placeholder.svg?height=24&width=24&text=T${teamId}`,
        },
        score: {
          home: homeScore,
          away: awayScore,
        },
        league: {
          id: `${i + 1}`,
          name: `League ${i + 1}`,
          country: "England",
          logo: `/placeholder.svg?height=24&width=24&text=L${i + 1}`,
        },
      })
    }

    return matches
  } catch (error) {
    console.error("Error fetching team recent matches:", error)
    return []
  }
}

// Get match details
export async function getMatchDetails(matchId: string): Promise<MatchDetails> {
  try {
    // In a real app, we would fetch from the API
    // For now, we'll use mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    const isLive = Math.random() > 0.5
    const minute = isLive ? Math.floor(Math.random() * 90) + 1 : 90
    const status = isLive ? "IN PLAY" : "FINISHED"

    const homeScore = Math.floor(Math.random() * 4)
    const awayScore = Math.floor(Math.random() * 4)

    const homePlayers = generateMockPlayers(18)
    const awayPlayers = generateMockPlayers(18)

    // Generate events
    const events: MatchEvent[] = []

    // Kick-off
    events.push({
      id: `event-kickoff`,
      type: "kick-off",
      minute: 0,
      team: "home",
      description: "Kick-off",
    })

    // Goals
    for (let i = 0; i < homeScore; i++) {
      const goalMinute = Math.floor(Math.random() * 90) + 1
      const scorer = homePlayers[Math.floor(Math.random() * 11)]
      const assister = homePlayers[Math.floor(Math.random() * 11)]

      events.push({
        id: `event-goal-home-${i}`,
        type: "goal",
        minute: goalMinute,
        team: "home",
        player: scorer,
        assistBy: assister,
        description: `Goal! ${scorer.name} scores for the home team. Assisted by ${assister.name}.`,
      })
    }

    for (let i = 0; i < awayScore; i++) {
      const goalMinute = Math.floor(Math.random() * 90) + 1
      const scorer = awayPlayers[Math.floor(Math.random() * 11)]
      const assister = awayPlayers[Math.floor(Math.random() * 11)]

      events.push({
        id: `event-goal-away-${i}`,
        type: "goal",
        minute: goalMinute,
        team: "away",
        player: scorer,
        assistBy: assister,
        description: `Goal! ${scorer.name} scores for the away team. Assisted by ${assister.name}.`,
      })
    }

    // Yellow cards
    const yellowCardsHome = Math.floor(Math.random() * 4)
    const yellowCardsAway = Math.floor(Math.random() * 4)

    for (let i = 0; i < yellowCardsHome; i++) {
      const cardMinute = Math.floor(Math.random() * 90) + 1
      const player = homePlayers[Math.floor(Math.random() * 11)]

      events.push({
        id: `event-yellow-home-${i}`,
        type: "yellow-card",
        minute: cardMinute,
        team: "home",
        player,
        description: `Yellow card for ${player.name}.`,
      })
    }

    for (let i = 0; i < yellowCardsAway; i++) {
      const cardMinute = Math.floor(Math.random() * 90) + 1
      const player = awayPlayers[Math.floor(Math.random() * 11)]

      events.push({
        id: `event-yellow-away-${i}`,
        type: "yellow-card",
        minute: cardMinute,
        team: "away",
        player,
        description: `Yellow card for ${player.name}.`,
      })
    }

    // Red cards
    const redCardsHome = Math.floor(Math.random() * 2)
    const redCardsAway = Math.floor(Math.random() * 2)

    for (let i = 0; i < redCardsHome; i++) {
      const cardMinute = Math.floor(Math.random() * 90) + 1
      const player = homePlayers[Math.floor(Math.random() * 11)]

      events.push({
        id: `event-red-home-${i}`,
        type: "red-card",
        minute: cardMinute,
        team: "home",
        player,
        description: `Red card for ${player.name}.`,
      })
    }

    for (let i = 0; i < redCardsAway; i++) {
      const cardMinute = Math.floor(Math.random() * 90) + 1
      const player = awayPlayers[Math.floor(Math.random() * 11)]

      events.push({
        id: `event-red-away-${i}`,
        type: "red-card",
        minute: cardMinute,
        team: "away",
        player,
        description: `Red card for ${player.name}.`,
      })
    }

    // Substitutions
    const subsHome = Math.floor(Math.random() * 3) + 1
    const subsAway = Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < subsHome; i++) {
      const subMinute = Math.floor(Math.random() * 90) + 1
      const outPlayer = homePlayers[Math.floor(Math.random() * 11)]
      const inPlayer = homePlayers[11 + i]

      events.push({
        id: `event-sub-home-${i}`,
        type: "substitution",
        minute: subMinute,
        team: "home",
        inPlayer,
        outPlayer,
        description: `Substitution for the home team. ${inPlayer.name} replaces ${outPlayer.name}.`,
      })
    }

    for (let i = 0; i < subsAway; i++) {
      const subMinute = Math.floor(Math.random() * 90) + 1
      const outPlayer = awayPlayers[Math.floor(Math.random() * 11)]
      const inPlayer = awayPlayers[11 + i]

      events.push({
        id: `event-sub-away-${i}`,
        type: "substitution",
        minute: subMinute,
        team: "away",
        inPlayer,
        outPlayer,
        description: `Substitution for the away team. ${inPlayer.name} replaces ${outPlayer.name}.`,
      })
    }

    // Half-time
    events.push({
      id: `event-halftime`,
      type: "half-time",
      minute: 45,
      team: "home",
      description: "Half-time",
    })

    // Full-time (if not live)
    if (!isLive) {
      events.push({
        id: `event-fulltime`,
        type: "full-time",
        minute: 90,
        team: "home",
        description: "Full-time",
      })
    }

    // Sort events by minute
    events.sort((a, b) => a.minute - b.minute)

    return {
      id: matchId,
      date: new Date().toISOString().split("T")[0],
      time: `${Math.floor(Math.random() * 12) + 12}:${Math.floor(Math.random() * 6) * 10}`,
      status,
      minute: isLive ? `${minute}'` : "90'",
      homeTeam: {
        id: `home-team`,
        name: `Home Team`,
        logo: `/placeholder.svg?height=64&width=64&text=HOME`,
      },
      awayTeam: {
        id: `away-team`,
        name: `Away Team`,
        logo: `/placeholder.svg?height=64&width=64&text=AWAY`,
      },
      score: {
        home: homeScore,
        away: awayScore,
        halftime: {
          home: Math.min(homeScore, 2),
          away: Math.min(awayScore, 1),
        },
      },
      league: {
        id: "1",
        name: "Premier League",
        country: "England",
        logo: `/placeholder.svg?height=24&width=24&text=PL`,
      },
      venue: "Stadium Name",
      referee: "Referee Name",
      events,
      lineups: {
        home: {
          team: {
            id: "home-team",
            name: "Home Team",
            logo: `/placeholder.svg?height=64&width=64&text=HOME`,
          },
          formation: "4-3-3",
          startingXI: homePlayers.slice(0, 11),
          substitutes: homePlayers.slice(11),
          coach: "Home Coach",
        },
        away: {
          team: {
            id: "away-team",
            name: "Away Team",
            logo: `/placeholder.svg?height=64&width=64&text=AWAY`,
          },
          formation: "4-2-3-1",
          startingXI: awayPlayers.slice(0, 11),
          substitutes: awayPlayers.slice(11),
          coach: "Away Coach",
        },
      },
      stats: {
        possession: {
          home: 55,
          away: 45,
        },
        shots: {
          home: 15,
          away: 10,
        },
        shotsOnTarget: {
          home: 7,
          away: 4,
        },
        corners: {
          home: 6,
          away: 4,
        },
        fouls: {
          home: 10,
          away: 12,
        },
        yellowCards: {
          home: yellowCardsHome,
          away: yellowCardsAway,
        },
        redCards: {
          home: redCardsHome,
          away: redCardsAway,
        },
        offsides: {
          home: 3,
          away: 2,
        },
      },
      h2h: {
        matches: 10,
        homeWins: 5,
        awayWins: 3,
        draws: 2,
      },
    }
  } catch (error) {
    console.error("Error fetching match details:", error)
    throw error
  }
}

// Helper function to generate mock players
function generateMockPlayers(count: number): Player[] {
  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"]
  const nationalities = ["England", "Spain", "France", "Germany", "Italy", "Brazil", "Argentina"]

  return Array.from({ length: count }, (_, i) => ({
    id: `player-${i + 1}`,
    name: `Player ${i + 1}`,
    number: i + 1,
    position: positions[i % positions.length],
    nationality: nationalities[i % nationalities.length],
    age: 20 + Math.floor(Math.random() * 15),
    image: `/placeholder.svg?height=60&width=60&text=P${i + 1}`,
  }))
}
