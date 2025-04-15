"use client"

import { useState } from "react"
import { updateUserSettings } from "@/actions/profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await updateUserSettings(formData)

      if (result.error) {
        toast({
          title: "Gagal memperbarui pengaturan",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Pengaturan diperbarui",
          description: "Preferensi Anda telah berhasil disimpan.",
        })
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal memperbarui pengaturan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Preferensi Tampilan</CardTitle>
            <CardDescription>Sesuaikan pengalaman pembelajaran Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select name="theme" defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Terang</SelectItem>
                  <SelectItem value="dark">Gelap</SelectItem>
                  <SelectItem value="system">Sistem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Bahasa</Label>
              <Select name="language" defaultValue="id">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Aksesibilitas</Label>
              <RadioGroup name="accessibility" defaultValue="default">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="accessibility-default" />
                  <Label htmlFor="accessibility-default">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-contrast" id="accessibility-high-contrast" />
                  <Label htmlFor="accessibility-high-contrast">Kontras Tinggi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large-text" id="accessibility-large-text" />
                  <Label htmlFor="accessibility-large-text">Teks Besar</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Preferensi"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>Kelola preferensi notifikasi Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Notifikasi Email</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Pengingat Kursus</div>
                    <div className="text-sm text-muted-foreground">
                      Terima pengingat tentang kursus yang sedang berlangsung
                    </div>
                  </div>
                  <Switch name="email_notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Jadwal Acara</div>
                    <div className="text-sm text-muted-foreground">
                      Terima pemberitahuan tentang acara yang akan datang
                    </div>
                  </div>
                  <Switch name="event_notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Pembaruan Kursus</div>
                    <div className="text-sm text-muted-foreground">Terima pemberitahuan saat kursus diperbarui</div>
                  </div>
                  <Switch name="course_update_notifications" defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Notifikasi Push</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Pengingat Kursus</div>
                    <div className="text-sm text-muted-foreground">
                      Terima pengingat tentang kursus yang sedang berlangsung
                    </div>
                  </div>
                  <Switch name="push_notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Jadwal Acara</div>
                    <div className="text-sm text-muted-foreground">
                      Terima pemberitahuan tentang acara yang akan datang
                    </div>
                  </div>
                  <Switch name="push_event_notifications" defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Pemasaran</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Newsletter</div>
                    <div className="text-sm text-muted-foreground">
                      Terima newsletter bulanan tentang kursus dan acara baru
                    </div>
                  </div>
                  <Switch name="marketing_emails" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Preferensi"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
