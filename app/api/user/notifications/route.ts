import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getNotificationPrefs, updateNotificationPrefs } from "@/lib/user"
import { NotificationPrefsSchema } from "@/schemas/auth"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const prefs = await getNotificationPrefs(session.user.id)
    return NextResponse.json({ prefs })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedFields = NotificationPrefsSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
    }

    const prefs = await updateNotificationPrefs(session.user.id, validatedFields.data)
    return NextResponse.json({ success: true, prefs })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
