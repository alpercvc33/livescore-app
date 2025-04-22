import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { RegisterSchema } from "@/schemas/auth"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedFields = RegisterSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
    }

    const { email, password, name } = validatedFields.data
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Create default notification preferences
    await prisma.notificationPrefs.create({
      data: {
        userId: user.id,
        matchStart: true,
        goals: true,
        halfTime: true,
        fullTime: true,
        redCards: false,
        favoriteTeamsOnly: true,
      },
    })

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
