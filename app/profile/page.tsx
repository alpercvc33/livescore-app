import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileHeader } from "@/components/user/profile-header"
import { FavoriteTeams } from "@/components/user/favorite-teams"
import { NotificationSettings } from "@/components/user/notification-settings"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="container mx-auto max-w-4xl py-4">
      <ProfileHeader user={session.user} />

      <Tabs defaultValue="favorites" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="favorites">Favorite Teams</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="mt-6">
          <FavoriteTeams />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
