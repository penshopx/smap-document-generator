"use client"

import type React from "react"

import { useState } from "react"
import { Camera, CreditCard, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock user data
const userData = {
  name: "Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "+62 812 3456 7890",
  bio: "Profesional di bidang kelistrikan dengan pengalaman 5 tahun di industri energi.",
  jobTitle: "Teknisi Senior",
  company: "PT Energi Indonesia",
  location: "Jakarta, Indonesia",
  language: "id",
  notifications: {
    email: true,
    push: true,
    sms: false,
    newsletter: true,
  },
  preferences: {
    theme: "system",
    accessibility: "default",
  },
}

export default function ProfilePage() {
  const [user, setUser] = useState(userData)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profil diperbarui",
        description: "Perubahan profil Anda telah berhasil disimpan.",
      })
    }, 1000)
  }

  const handleNotificationChange = (key: keyof typeof user.notifications, value: boolean) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [key]: value,
      },
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi dan pengaturan akun Anda</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:max-w-3xl">
          <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
          <TabsTrigger value="account">Akun</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="preferences">Preferensi</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Foto Profil</CardTitle>
                <CardDescription>Foto ini akan ditampilkan di profil dan sertifikat Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Upload foto baru</span>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Ubah foto profil</h3>
                    <p className="text-sm text-muted-foreground">
                      Unggah foto dengan ukuran maksimal 1MB. Format yang didukung: JPG, PNG, atau GIF.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Unggah Foto
                      </Button>
                      <Button variant="ghost" size="sm">
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>Perbarui informasi pribadi Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Lokasi</Label>
                      <Input
                        id="location"
                        value={user.location}
                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Jabatan</Label>
                      <Input
                        id="jobTitle"
                        value={user.jobTitle}
                        onChange={(e) => setUser({ ...user, jobTitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Perusahaan</Label>
                      <Input
                        id="company"
                        value={user.company}
                        onChange={(e) => setUser({ ...user, company: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan Akun</CardTitle>
                <CardDescription>Kelola kata sandi dan keamanan akun Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
              <CardFooter>
                <Button>Perbarui Kata Sandi</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Autentikasi Dua Faktor</CardTitle>
                <CardDescription>Tingkatkan keamanan akun Anda dengan autentikasi dua faktor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Autentikasi Dua Faktor</div>
                    <div className="text-sm text-muted-foreground">
                      Tambahkan lapisan keamanan tambahan untuk akun Anda
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Autentikasi Aplikasi</div>
                    <div className="text-sm text-muted-foreground">
                      Gunakan aplikasi autentikator seperti Google Authenticator
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Autentikasi SMS</div>
                    <div className="text-sm text-muted-foreground">Terima kode verifikasi melalui pesan teks (SMS)</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Konfigurasi 2FA</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
                <CardDescription>Kelola metode pembayaran untuk kursus berbayar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Visa •••• 4242</div>
                      <div className="text-sm text-muted-foreground">Kedaluwarsa: 12/2025</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Tambah Metode Pembayaran</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sesi Aktif</CardTitle>
                <CardDescription>Kelola perangkat yang saat ini masuk ke akun Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Chrome di Windows</p>
                      <div className="text-sm text-muted-foreground">Jakarta, Indonesia • Saat ini aktif</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Keluar
                    </Button>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Safari di iPhone</p>
                      <div className="text-sm text-muted-foreground">Jakarta, Indonesia • 2 jam yang lalu</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Keluar
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-destructive">
                  Keluar dari Semua Perangkat
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
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
                    <Switch
                      checked={user.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Jadwal Acara</div>
                      <div className="text-sm text-muted-foreground">
                        Terima pemberitahuan tentang acara yang akan datang
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Pembaruan Kursus</div>
                      <div className="text-sm text-muted-foreground">Terima pemberitahuan saat kursus diperbarui</div>
                    </div>
                    <Switch checked={true} />
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
                    <Switch
                      checked={user.notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Jadwal Acara</div>
                      <div className="text-sm text-muted-foreground">
                        Terima pemberitahuan tentang acara yang akan datang
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notifikasi SMS</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Pengingat Acara</div>
                      <div className="text-sm text-muted-foreground">
                        Terima pengingat SMS untuk acara yang akan datang
                      </div>
                    </div>
                    <Switch
                      checked={user.notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
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
                    <Switch
                      checked={user.notifications.newsletter}
                      onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Preferensi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Preferensi Tampilan</CardTitle>
                <CardDescription>Sesuaikan pengalaman pembelajaran Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select defaultValue={user.preferences.theme}>
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
                  <Select defaultValue={user.language}>
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
                  <RadioGroup defaultValue={user.preferences.accessibility}>
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
                <Button>Simpan Preferensi</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferensi Pembelajaran</CardTitle>
                <CardDescription>Sesuaikan pengalaman pembelajaran Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="learning-pace">Kecepatan Belajar</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kecepatan belajar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Lambat</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="fast">Cepat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bidang Minat</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="interest-electricity" className="rounded" defaultChecked />
                      <Label htmlFor="interest-electricity">Kelistrikan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="interest-mining" className="rounded" defaultChecked />
                      <Label htmlFor="interest-mining">Pertambangan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="interest-renewable" className="rounded" defaultChecked />
                      <Label htmlFor="interest-renewable">Energi Terbarukan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="interest-construction" className="rounded" />
                      <Label htmlFor="interest-construction">Konstruksi</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferensi Konten</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Putar Video Otomatis</div>
                        <div className="text-sm text-muted-foreground">
                          Putar video secara otomatis saat membuka kursus
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Terjemahan Otomatis</div>
                        <div className="text-sm text-muted-foreground">
                          Aktifkan terjemahan otomatis untuk konten dalam bahasa asing
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Unduh Konten untuk Offline</div>
                        <div className="text-sm text-muted-foreground">
                          Izinkan mengunduh konten untuk akses offline
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Simpan Preferensi</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
