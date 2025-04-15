"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  ChevronRight,
  Clock,
  Filter,
  MessageCircle,
  PenSquare,
  Search,
  Tag,
  ThumbsUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Mock data for forum categories
const categories = [
  {
    id: 1,
    name: "Kelistrikan",
    description: "Diskusi tentang konsep dan aplikasi kelistrikan",
    topics: 24,
    posts: 128,
    icon: "⚡",
  },
  {
    id: 2,
    name: "Pertambangan",
    description: "Forum untuk diskusi tentang teknik dan keselamatan pertambangan",
    topics: 18,
    posts: 94,
    icon: "⛏️",
  },
  {
    id: 3,
    name: "Energi Terbarukan",
    description: "Diskusi tentang sumber energi terbarukan dan implementasinya",
    topics: 32,
    posts: 215,
    icon: "🌱",
  },
  {
    id: 4,
    name: "Konstruksi",
    description: "Forum untuk berbagi pengetahuan tentang teknik konstruksi",
    topics: 15,
    posts: 76,
    icon: "🏗️",
  },
  {
    id: 5,
    name: "Tanya Jawab Umum",
    description: "Ajukan pertanyaan umum tentang kursus dan pembelajaran",
    topics: 45,
    posts: 320,
    icon: "❓",
  },
  {
    id: 6,
    name: "Pengumuman",
    description: "Pengumuman resmi dan informasi penting dari tim",
    topics: 8,
    posts: 42,
    icon: "📢",
  },
]

// Mock data for forum discussions
const discussions = [
  {
    id: 1,
    title: "Cara menghitung resistansi dalam rangkaian paralel?",
    category: "Kelistrikan",
    author: {
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2 jam yang lalu",
    replies: 5,
    views: 42,
    likes: 3,
    isPinned: false,
    isHot: true,
    tags: ["rangkaian", "resistansi", "dasar"],
    lastReply: {
      author: "Dr. Rina Wijaya",
      date: "15 menit yang lalu",
    },
  },
  {
    id: 2,
    title: "Pengumuman: Webinar Keselamatan Kerja di Pertambangan",
    category: "Pengumuman",
    author: {
      name: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "1 hari yang lalu",
    replies: 2,
    views: 156,
    likes: 12,
    isPinned: true,
    isHot: false,
    tags: ["webinar", "keselamatan", "pertambangan"],
    lastReply: {
      author: "Hadi Prasetyo",
      date: "5 jam yang lalu",
    },
  },
  {
    id: 3,
    title: "Perbandingan efisiensi panel surya monocrystalline vs polycrystalline",
    category: "Energi Terbarukan",
    author: {
      name: "Dewi Lestari",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "3 hari yang lalu",
    replies: 8,
    views: 94,
    likes: 7,
    isPinned: false,
    isHot: true,
    tags: ["panel surya", "efisiensi", "perbandingan"],
    lastReply: {
      author: "Agus Setiawan",
      date: "1 hari yang lalu",
    },
  },
  {
    id: 4,
    title: "Tips menghadapi ujian sertifikasi kelistrikan",
    category: "Kelistrikan",
    author: {
      name: "Siti Rahayu",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "5 hari yang lalu",
    replies: 12,
    views: 210,
    likes: 18,
    isPinned: false,
    isHot: false,
    tags: ["sertifikasi", "ujian", "tips"],
    lastReply: {
      author: "Budi Santoso",
      date: "2 hari yang lalu",
    },
  },
  {
    id: 5,
    title: "Metode konstruksi ramah lingkungan untuk bangunan komersial",
    category: "Konstruksi",
    author: {
      name: "Joko Widodo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "1 minggu yang lalu",
    replies: 6,
    views: 87,
    likes: 9,
    isPinned: false,
    isHot: false,
    tags: ["konstruksi", "ramah lingkungan", "komersial"],
    lastReply: {
      author: "Dr. Rina Wijaya",
      date: "3 hari yang lalu",
    },
  },
  {
    id: 6,
    title: "Pengumuman: Pembaruan Materi Kursus Dasar Kelistrikan",
    category: "Pengumuman",
    author: {
      name: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "1 minggu yang lalu",
    replies: 3,
    views: 128,
    likes: 15,
    isPinned: true,
    isHot: false,
    tags: ["pembaruan", "kursus", "kelistrikan"],
    lastReply: {
      author: "Dewi Lestari",
      date: "4 hari yang lalu",
    },
  },
  {
    id: 7,
    title: "Diskusi: Masa depan energi terbarukan di Indonesia",
    category: "Energi Terbarukan",
    author: {
      name: "Dr. Rina Wijaya",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2 minggu yang lalu",
    replies: 15,
    views: 245,
    likes: 22,
    isPinned: false,
    isHot: true,
    tags: ["masa depan", "indonesia", "diskusi"],
    lastReply: {
      author: "Siti Rahayu",
      date: "1 hari yang lalu",
    },
  },
  {
    id: 8,
    title: "Tantangan dalam implementasi protokol keselamatan di tambang kecil",
    category: "Pertambangan",
    author: {
      name: "Hadi Prasetyo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2 minggu yang lalu",
    replies: 7,
    views: 112,
    likes: 5,
    isPinned: false,
    isHot: false,
    tags: ["keselamatan", "tambang kecil", "implementasi"],
    lastReply: {
      author: "Joko Widodo",
      date: "5 hari yang lalu",
    },
  },
]

// Mock data for popular tags
const popularTags = [
  { name: "kelistrikan", count: 24 },
  { name: "pertambangan", count: 18 },
  { name: "energi terbarukan", count: 32 },
  { name: "konstruksi", count: 15 },
  { name: "sertifikasi", count: 12 },
  { name: "keselamatan", count: 28 },
  { name: "panel surya", count: 16 },
  { name: "efisiensi", count: 9 },
  { name: "rangkaian", count: 14 },
  { name: "webinar", count: 7 },
]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search API call
    console.log("Searching for:", searchQuery)
  }

  const filterDiscussions = () => {
    let filtered = [...discussions]

    // Filter by tab
    if (activeTab === "pinned") {
      filtered = filtered.filter((discussion) => discussion.isPinned)
    } else if (activeTab === "hot") {
      filtered = filtered.filter((discussion) => discussion.isHot)
    } else if (activeTab === "unanswered") {
      filtered = filtered.filter((discussion) => discussion.replies === 0)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((discussion) => discussion.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (discussion) =>
          discussion.title.toLowerCase().includes(query) ||
          discussion.category.toLowerCase().includes(query) ||
          discussion.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Sort
    if (sortBy === "recent") {
      // Already sorted by date in the mock data
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.views - a.views)
    } else if (sortBy === "most_replies") {
      filtered.sort((a, b) => b.replies - a.replies)
    } else if (sortBy === "most_likes") {
      filtered.sort((a, b) => b.likes - a.likes)
    }

    return filtered
  }

  const filteredDiscussions = filterDiscussions()

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Forum Diskusi</h1>
          <p className="text-muted-foreground">
            Diskusikan topik pembelajaran, ajukan pertanyaan, dan bagikan pengetahuan
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/forum/new">
              <PenSquare className="h-4 w-4 mr-2" />
              Buat Diskusi Baru
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari diskusi..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              <div className="flex gap-2">
                <div className="w-full md:w-[180px]">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-[150px]">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Terbaru</SelectItem>
                      <SelectItem value="popular">Terpopuler</SelectItem>
                      <SelectItem value="most_replies">Balasan Terbanyak</SelectItem>
                      <SelectItem value="most_likes">Suka Terbanyak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pinned">Disematkan</TabsTrigger>
              <TabsTrigger value="hot">Populer</TabsTrigger>
              <TabsTrigger value="unanswered">Belum Dijawab</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {filteredDiscussions.length > 0 ? (
                  filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className={discussion.isPinned ? "border-primary/20" : ""}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="hidden sm:flex h-10 w-10">
                            <AvatarImage
                              src={discussion.author.avatar || "/placeholder.svg"}
                              alt={discussion.author.name}
                            />
                            <AvatarFallback>
                              {discussion.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {discussion.isPinned && (
                                <Badge variant="outline" className="text-primary border-primary">
                                  Disematkan
                                </Badge>
                              )}
                              {discussion.isHot && (
                                <Badge
                                  variant="secondary"
                                  className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
                                >
                                  Populer
                                </Badge>
                              )}
                              <Badge variant="outline">{discussion.category}</Badge>
                            </div>
                            <Link href={`/forum/${discussion.id}`} className="hover:underline">
                              <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                            </Link>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {discussion.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <span>Oleh {discussion.author.name}</span>
                              <span>{discussion.date}</span>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{discussion.replies} balasan</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{discussion.likes} suka</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{discussion.views} dilihat</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="px-6 py-3 bg-muted/50 flex justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Balasan terakhir oleh </span>
                          <span className="font-medium">{discussion.lastReply.author}</span>
                          <span className="text-muted-foreground"> {discussion.lastReply.date}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/forum/${discussion.id}`}>
                            Lihat Diskusi
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">Tidak Ada Diskusi</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Tidak ada diskusi yang sesuai dengan filter Anda. Coba ubah filter atau buat diskusi baru.
                    </p>
                    <Button asChild>
                      <Link href="/forum/new">
                        <PenSquare className="h-4 w-4 mr-2" />
                        Buat Diskusi Baru
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Kategori Forum</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/forum/category/${category.id}`}
                    className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-2xl">{category.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{category.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{category.topics} topik</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{category.posts} post</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Statistik Forum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Diskusi</p>
                  <div className="text-2xl font-bold">142</div>
                </div>
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Balasan</p>
                  <div className="text-2xl font-bold">873</div>
                </div>
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pengguna Aktif</p>
                  <div className="text-2xl font-bold">58</div>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Diskusi Terbaru</p>
                <div className="text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 inline mr-1" />
                  <span>15 menit yang lalu</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tag Populer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link key={tag.name} href={`/forum/tag/${tag.name}`}>
                    <Badge variant="secondary" className="cursor-pointer">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.name} ({tag.count})
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
