import { prisma } from "@/lib/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  } catch {
    return null
  }
}

export const getFavoriteTeams = async (userId: string) => {
  try {
    const favorites = await prisma.favoriteTeam.findMany({
      where: { userId },
    })

    return favorites
  } catch {
    return []
  }
}

export const addFavoriteTeam = async (userId: string, teamId: string) => {
  try {
    const favorite = await prisma.favoriteTeam.create({
      data: {
        userId,
        teamId,
      },
    })

    return favorite
  } catch {
    return null
  }
}

export const removeFavoriteTeam = async (userId: string, teamId: string) => {
  try {
    await prisma.favoriteTeam.deleteMany({
      where: {
        userId,
        teamId,
      },
    })

    return true
  } catch {
    return false
  }
}

export const getNotificationPrefs = async (userId: string) => {
  try {
    let prefs = await prisma.notificationPrefs.findUnique({
      where: { userId },
    })

    if (!prefs) {
      prefs = await prisma.notificationPrefs.create({
        data: {
          userId,
          matchStart: true,
          goals: true,
          halfTime: true,
          fullTime: true,
          redCards: false,
          favoriteTeamsOnly: true,
        },
      })
    }

    return prefs
  } catch {
    return null
  }
}

export const updateNotificationPrefs = async (userId: string, data: any) => {
  try {
    const prefs = await prisma.notificationPrefs.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    })

    return prefs
  } catch {
    return null
  }
}
