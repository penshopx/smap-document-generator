"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Globe, Key, Languages, Lock, User, UserCog } from "lucide-react"

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
          <p className="text-muted-foreground mt-1">Kelola akun dan preferensi Anda</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden md:inline">Akun</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifikasi</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Keamanan</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Bahasa</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Kelola informasi profil Anda yang akan ditampilkan kepada pengguna lain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Ubah Foto
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Profesional di bidang konstruksi dengan pengalaman 5 tahun."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Jabatan</Label>
                    <Input id="job-title" defaultValue="Insinyur Konstruksi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Perusahaan</Label>
                    <Input id="company" defaultValue="PT Konstruksi Maju" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input id="location" defaultValue="Jakarta, Indonesia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://johndoe.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bidang Keahlian</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="skill-construction" defaultChecked />
                    <Label htmlFor="skill-construction">Konstruksi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="skill-electrical" defaultChecked />
                    <Label htmlFor="skill-electrical">Ketenagalistrikan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="skill-mining" />
                    <Label htmlFor="skill-mining">Pertambangan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="skill-renewable" />
                    <Label htmlFor="skill-renewable">Energi Terbarukan</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Akun</CardTitle>
              <CardDescription>Kelola pengaturan akun dan preferensi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" defaultValue="+62 812 3456 7890" />
              </div>
              <div className="space-y-2">
                <Label>Preferensi Tema</Label>
                <RadioGroup defaultValue="system">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Terang</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Gelap</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">Sistem</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Preferensi Pembelajaran</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="pref-video" defaultChecked />
                    <Label htmlFor="pref-video">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="pref-reading" defaultChecked />
                    <Label htmlFor="pref-reading">Bacaan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="pref-interactive" defaultChecked />
                    <Label htmlFor="pref-interactive">Interaktif</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="pref-quiz" defaultChecked />
                    <Label htmlFor="pref-quiz">Kuis</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifikasi</CardTitle>
              <CardDescription>Kelola preferensi notifikasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notifikasi Email</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-courses">Pembaruan Kursus</Label>
                    <Switch id="email-courses" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-deadlines">Tenggat Waktu</Label>
                    <Switch id="email-deadlines" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-announcements">Pengumuman</Label>
                    <Switch id="email-announcements" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-forum">Aktivitas Forum</Label>
                    <Switch id="email-forum" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-certificates">Sertifikat Baru</Label>
                    <Switch id="email-certificates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-promotions">Promosi</Label>
                    <Switch id="email-promotions" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notifikasi Aplikasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-courses">Pembaruan Kursus</Label>
                    <Switch id="app-courses" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-deadlines">Tenggat Waktu</Label>
                    <Switch id="app-deadlines" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-announcements">Pengumuman</Label>
                    <Switch id="app-announcements" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-forum">Aktivitas Forum</Label>
                    <Switch id="app-forum" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-certificates">Sertifikat Baru</Label>
                    <Switch id="app-certificates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-promotions">Promosi</Label>
                    <Switch id="app-promotions" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Frekuensi Notifikasi Email</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Pilih frekuensi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Langsung</SelectItem>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan</CardTitle>
              <CardDescription>Kelola pengaturan keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Ubah Kata Sandi</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Kata Sandi Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="mt-2">
                  <Key className="h-4 w-4 mr-2" />
                  Perbarui Kata Sandi
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Verifikasi Dua Faktor</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p>Verifikasi Dua Faktor</p>
                    <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan tambahan untuk akun Anda</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Sesi Aktif</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Chrome di Windows</p>
                      <p className="text-sm text-muted-foreground">Jakarta, Indonesia • Aktif</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Keluar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Safari di iPhone</p>
                      <p className="text-sm text-muted-foreground">Jakarta, Indonesia • 2 jam lalu</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Keluar
                    </Button>
                  </div>
                </div>
                <Button variant="outline">Keluar dari Semua Sesi</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Bahasa</CardTitle>
              <CardDescription>Kelola preferensi bahasa Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="interface-language">Bahasa Antarmuka</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="interface-language" className="w-full md:w-[300px]">
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-language">Bahasa Konten</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="content-language" className="w-full md:w-[300px]">
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="both">Kedua Bahasa</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">Bahasa yang digunakan untuk konten pembelajaran</p>
              </div>

              <div className="space-y-2">
                <Label>Preferensi Terjemahan</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-translate" defaultChecked />
                  <Label htmlFor="auto-translate">Terjemahkan konten secara otomatis</Label>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Languages className="h-4 w-4" />
                <span>Terjemahan didukung oleh AI untuk akurasi yang lebih baik</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
