"use client"

import { useState } from "react"
import { Bell, BookOpen, Calendar, CheckCircle, Clock, MessageSquare, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "Kursus Baru Tersedia",
    message: "Kursus baru 'Teknologi Panel Surya Terkini' telah ditambahkan ke katalog.",
    type: "course",
    date: "2 jam yang lalu",
    read: false,
    link: "/courses/20",
  },
  {
    id: 2,
    title: "Pengingat Jadwal",
    message: "Webinar 'Inovasi dalam Energi Terbarukan' akan dimulai dalam 1 jam.",
    type: "schedule",
    date: "3 jam yang lalu",
    read: false,
    link: "/planner",
  },
  {
    id: 3,
    title: "Tugas Mendekati Tenggat",
    message: "Tugas 'Mengerjakan analisis rangkaian listrik' harus diselesaikan dalam 2 hari.",
    type: "task",
    date: "5 jam yang lalu",
    read: false,
    link: "/planner",
  },
  {
    id: 4,
    title: "Sertifikat Diterbitkan",
    message: "Selamat! Sertifikat 'Dasar Kelistrikan' Anda telah diterbitkan.",
    type: "certificate",
    date: "1 hari yang lalu",
    read: true,
    link: "/certificates",
  },
  {
    id: 5,
    title: "Komentar Baru pada Diskusi",
    message: "Budi Santoso mengomentari diskusi Anda 'Tantangan dalam Implementasi Panel Surya'.",
    type: "forum",
    date: "1 hari yang lalu",
    read: true,
    link: "/forum/3",
  },
  {
    id: 6,
    title: "Pencapaian Baru",
    message: "Anda telah mencapai 'Pembelajar Tekun' dengan menyelesaikan 5 kursus!",
    type: "achievement",
    date: "2 hari yang lalu",
    read: true,
    link: "/leaderboard",
  },
  {
    id: 7,
    title: "Pembaruan Sistem",
    message: "Platform pembelajaran telah diperbarui dengan fitur baru: Jalur Pembelajaran Personalisasi.",
    type: "system",
    date: "3 hari yang lalu",
    read: true,
    link: "/learning-path",
  },
  {
    id: 8,
    title: "Rekomendasi Kursus",
    message: "Berdasarkan minat Anda, kami merekomendasikan kursus 'Manajemen Proyek Energi'.",
    type: "recommendation",
    date: "4 hari yang lalu",
    read: true,
    link: "/courses/5",
  },
]

// Helper function to get notification icon
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "course":
      return <BookOpen className="h-5 w-5" />
    case "schedule":
      return <Calendar className="h-5 w-5" />
    case "task":
      return <Clock className="h-5 w-5" />
    case "certificate":
      return <CheckCircle className="h-5 w-5" />
    case "forum":
      return <MessageSquare className="h-5 w-5" />
    case "achievement":
      return <Badge className="h-5 w-5" />
    case "system":
      return <Settings className="h-5 w-5" />
    case "recommendation":
      return <Bell className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

// Helper function to get notification icon background color
const getNotificationIconBg = (type: string) => {
  switch (type) {
    case "course":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    case "schedule":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    case "task":
      return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
    case "certificate":
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    case "forum":
      return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
    case "achievement":
      return "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
    case "system":
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    case "recommendation":
      return "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  // Filter notifications based on active tab
  const filteredNotifications = notificationState.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationState((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotificationState((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Count unread notifications
  const unreadCount = notificationState.filter((notification) => !notification.read).length

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground">Kelola semua notifikasi Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Tandai Semua Dibaca
          </Button>
          <Button variant="outline" asChild>
            <Link href="/notifications/settings">Pengaturan</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                Semua
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Belum Dibaca</TabsTrigger>
              <TabsTrigger value="course">Kursus</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="forum">Forum</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === "all"
                      ? "Semua Notifikasi"
                      : activeTab === "unread"
                        ? "Notifikasi Belum Dibaca"
                        : `Notifikasi ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                  </CardTitle>
                  <CardDescription>
                    {filteredNotifications.length} notifikasi{" "}
                    {activeTab === "unread" ? "belum dibaca" : activeTab !== "all" ? `tipe ${activeTab}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-4 p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationIconBg(
                              notification.type,
                            )}`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{notification.title}</h3>
                              <span className="text-sm text-muted-foreground">{notification.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="link" className="p-0 h-auto" asChild>
                                <Link href={notification.link}>Lihat Detail</Link>
                              </Button>
                              {!notification.read && (
                                <Button
                                  variant="link"
                                  className="p-0 h-auto"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Tandai Dibaca
                                </Button>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Tidak ada notifikasi untuk ditampilkan</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Muat Lebih Banyak
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Kelola preferensi notifikasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notifikasi Push</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi push di browser</p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Frekuensi Notifikasi</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Pilih frekuensi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Waktu nyata</SelectItem>
                    <SelectItem value="daily">Ringkasan harian</SelectItem>
                    <SelectItem value="weekly">Ringkasan mingguan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/notifications/settings">Pengaturan Lanjutan</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
