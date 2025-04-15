import { getUserProfile } from "@/actions/profile"
import { ProfileForm } from "@/components/profile/profile-form"
import { SettingsForm } from "@/components/profile/settings-form"
import { SecurityForm } from "@/components/profile/security-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const { data: profile, error } = await getUserProfile()

  if (error) {
    redirect("/auth/login")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi dan pengaturan akun Anda</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:max-w-3xl">
          <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
          <TabsTrigger value="account">Keamanan</TabsTrigger>
          <TabsTrigger value="preferences">Preferensi</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <ProfileForm profile={profile} />
        </TabsContent>

        <TabsContent value="account">
          <SecurityForm />
        </TabsContent>

        <TabsContent value="preferences">
          <SettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
