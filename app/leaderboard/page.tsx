"use client"

import { useState } from "react"
import { Award, Calendar, Crown, Medal, Star, Trophy, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for leaderboard
const leaderboardData = {
  weekly: [
    {
      id: 1,
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 850,
      completedCourses: 2,
      hoursLearned: 12,
      rank: 1,
    },
    {
      id: 2,
      name: "Rina Wijaya",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 720,
      completedCourses: 1,
      hoursLearned: 10,
      rank: 2,
    },
    {
      id: 3,
      name: "Hadi Prasetyo",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 680,
      completedCourses: 1,
      hoursLearned: 9,
      rank: 3,
    },
    {
      id: 4,
      name: "Dewi Lestari",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 590,
      completedCourses: 1,
      hoursLearned: 8,
      rank: 4,
    },
    {
      id: 5,
      name: "Agus Setiawan",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 520,
      completedCourses: 0,
      hoursLearned: 7,
      rank: 5,
    },
  ],
  monthly: [
    {
      id: 2,
      name: "Rina Wijaya",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 3250,
      completedCourses: 4,
      hoursLearned: 42,
      rank: 1,
    },
    {
      id: 1,
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2980,
      completedCourses: 3,
      hoursLearned: 38,
      rank: 2,
    },
    {
      id: 6,
      name: "Siti Rahayu",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2740,
      completedCourses: 3,
      hoursLearned: 35,
      rank: 3,
    },
    {
      id: 3,
      name: "Hadi Prasetyo",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2510,
      completedCourses: 2,
      hoursLearned: 32,
      rank: 4,
    },
    {
      id: 4,
      name: "Dewi Lestari",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2350,
      completedCourses: 2,
      hoursLearned: 30,
      rank: 5,
    },
  ],
  allTime: [
    {
      id: 6,
      name: "Siti Rahayu",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 12450,
      completedCourses: 15,
      hoursLearned: 168,
      rank: 1,
    },
    {
      id: 2,
      name: "Rina Wijaya",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 10820,
      completedCourses: 12,
      hoursLearned: 145,
      rank: 2,
    },
    {
      id: 1,
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 9640,
      completedCourses: 10,
      hoursLearned: 132,
      rank: 3,
    },
    {
      id: 7,
      name: "Joko Widodo",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 8750,
      completedCourses: 9,
      hoursLearned: 120,
      rank: 4,
    },
    {
      id: 3,
      name: "Hadi Prasetyo",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 7980,
      completedCourses: 8,
      hoursLearned: 110,
      rank: 5,
    },
  ],
}

// Mock data for achievements
const achievements = [
  {
    id: 1,
    title: "Pemula Bersemangat",
    description: "Selesaikan kursus pertama Anda",
    icon: Star,
    progress: 100,
    completed: true,
    points: 100,
    date: "15 Januari 2023",
  },
  {
    id: 2,
    title: "Pembelajar Konsisten",
    description: "Belajar selama 7 hari berturut-turut",
    icon: Calendar,
    progress: 100,
    completed: true,
    points: 200,
    date: "22 Januari 2023",
  },
  {
    id: 3,
    title: "Ahli Kelistrikan",
    description: "Selesaikan semua kursus dalam kategori Kelistrikan",
    icon: Award,
    progress: 75,
    completed: false,
    points: 500,
    date: null,
  },
  {
    id: 4,
    title: "Kolaborator",
    description: "Berpartisipasi dalam 5 diskusi grup",
    icon: Users,
    progress: 60,
    completed: false,
    points: 300,
    date: null,
  },
  {
    id: 5,
    title: "Pembelajar Tekun",
    description: "Akumulasi 50 jam belajar",
    icon: Trophy,
    progress: 56,
    completed: false,
    points: 400,
    date: null,
  },
  {
    id: 6,
    title: "Kolektor Sertifikat",
    description: "Dapatkan 3 sertifikat",
    icon: Medal,
    progress: 100,
    completed: true,
    points: 300,
    date: "3 Maret 2023",
  },
]

// Mock data for user stats
const userStats = {
  rank: 3,
  points: 9640,
  completedCourses: 10,
  hoursLearned: 132,
  achievements: 3,
  streak: 12,
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("weekly")
  const [currentUser] = useState(1) // Assuming user ID 1 is the current user

  const getCurrentUserRank = () => {
    const data = leaderboardData[timeframe as keyof typeof leaderboardData]
    const user = data.find((u) => u.id === currentUser)
    return user ? user.rank : "N/A"
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Crown className="h-3 w-3 mr-1" />1
        </Badge>
      )
    if (rank === 2)
      return (
        <Badge className="bg-gray-400 hover:bg-gray-500">
          <Crown className="h-3 w-3 mr-1" />2
        </Badge>
      )
    if (rank === 3)
      return (
        <Badge className="bg-amber-700 hover:bg-amber-800">
          <Crown className="h-3 w-3 mr-1" />3
        </Badge>
      )
    return <Badge variant="outline">{rank}</Badge>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Papan Peringkat & Pencapaian</h1>
          <p className="text-muted-foreground">Lihat peringkat Anda dan kumpulkan pencapaian untuk mendapatkan poin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Papan Peringkat</CardTitle>
                <Tabs defaultValue="weekly" value={timeframe} onValueChange={setTimeframe}>
                  <TabsList>
                    <TabsTrigger value="weekly">Mingguan</TabsTrigger>
                    <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                    <TabsTrigger value="allTime">Sepanjang Waktu</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                Peringkat Anda: {getCurrentUserRank()} dari{" "}
                {leaderboardData[timeframe as keyof typeof leaderboardData].length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leaderboardData[timeframe as keyof typeof leaderboardData].map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${user.id === currentUser ? "bg-muted" : ""}`}
                  >
                    <div className="flex-shrink-0">{getRankBadge(user.rank)}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{user.completedCourses} kursus</span>
                        <span>•</span>
                        <span>{user.hoursLearned} jam</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">poin</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="#">Lihat Semua Peringkat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Statistik Saya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Peringkat Keseluruhan</p>
                  <div className="text-2xl font-bold">{userStats.rank}</div>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Poin</p>
                  <div className="text-2xl font-bold">{userStats.points.toLocaleString()}</div>
                </div>
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Kursus Selesai</p>
                  <div className="text-2xl font-bold">{userStats.completedCourses}</div>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Jam Belajar</p>
                  <div className="text-2xl font-bold">{userStats.hoursLearned}</div>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pencapaian</p>
                  <div className="text-2xl font-bold">
                    {userStats.achievements}/{achievements.length}
                  </div>
                </div>
                <Medal className="h-8 w-8 text-amber-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Streak Belajar</p>
                  <div className="text-2xl font-bold">{userStats.streak} hari</div>
                </div>
                <Calendar className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Level Saya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Level 10</p>
                  <p className="text-xs text-muted-foreground">Pembelajar Mahir</p>
                </div>
                <Badge variant="outline" className="text-lg">
                  10
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>9,640 / 10,000 XP</span>
                  <span>Level 11</span>
                </div>
                <Progress value={96.4} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Butuh 360 XP lagi untuk mencapai Level 11: Pembelajar Ahli
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">Pencapaian</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={achievement.completed ? "" : "opacity-75"}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-full p-3 ${
                    achievement.completed
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progres</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{achievement.points} poin</span>
                    </div>
                    {achievement.completed ? (
                      <Badge variant="outline" className="text-green-600">
                        Selesai {achievement.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Dalam Progres</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
