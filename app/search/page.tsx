"use client"

import type React from "react"

import { useState } from "react"
import { Book, Calendar, Clock, Filter, SearchIcon, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Mock search results
const searchResults = {
  courses: [
    {
      id: 1,
      title: "Dasar-Dasar Kelistrikan",
      description: "Pelajari konsep dasar kelistrikan, komponen, dan aplikasinya dalam industri.",
      level: "Pemula",
      duration: "4 jam",
      instructor: "Dr. Budi Santoso",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Pengenalan Energi Terbarukan",
      description: "Eksplorasi berbagai sumber energi terbarukan dan implementasinya di Indonesia.",
      level: "Pemula",
      duration: "3 jam",
      instructor: "Dr. Rina Wijaya",
      image: "/placeholder.svg?height=100&width=200",
    },
  ],
  instructors: [
    {
      id: 1,
      name: "Dr. Budi Santoso",
      specialization: "Kelistrikan",
      courses: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Ir. Hadi Santoso",
      specialization: "Keselamatan Kerja Pertambangan",
      courses: 3,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  events: [
    {
      id: 1,
      title: "Webinar: Inovasi dalam Energi Terbarukan",
      date: "15 Juni 2023",
      time: "10:00 - 12:00",
      type: "webinar",
    },
    {
      id: 4,
      title: "Diskusi Panel: Masa Depan Konstruksi di Indonesia",
      date: "22 Juni 2023",
      time: "14:00 - 16:30",
      type: "discussion",
    },
  ],
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    level: "all",
    duration: "all",
    category: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search API call
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Pencarian</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kursus, instruktur, atau acara..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Cari</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </form>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="level" className="mb-2 block">
                  Level
                </Label>
                <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Level</SelectItem>
                    <SelectItem value="beginner">Pemula</SelectItem>
                    <SelectItem value="intermediate">Menengah</SelectItem>
                    <SelectItem value="advanced">Lanjutan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration" className="mb-2 block">
                  Durasi
                </Label>
                <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih durasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Durasi</SelectItem>
                    <SelectItem value="short">Kurang dari 3 jam</SelectItem>
                    <SelectItem value="medium">3-6 jam</SelectItem>
                    <SelectItem value="long">Lebih dari 6 jam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category" className="mb-2 block">
                  Kategori
                </Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="electricity">Kelistrikan</SelectItem>
                    <SelectItem value="mining">Pertambangan</SelectItem>
                    <SelectItem value="renewable">Energi Terbarukan</SelectItem>
                    <SelectItem value="construction">Konstruksi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                Reset
              </Button>
              <Button>Terapkan Filter</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="courses">Kursus</TabsTrigger>
          <TabsTrigger value="instructors">Instruktur</TabsTrigger>
          <TabsTrigger value="events">Acara</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Kursus</h2>
                <Button variant="link" asChild>
                  <Link href="#" onClick={() => setActiveTab("courses")}>
                    Lihat Semua
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover md:rounded-l-lg"
                          />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Book className="h-4 w-4" />
                              <span>{course.level}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{course.instructor}</span>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/courses/${course.id}`}>Lihat Kursus</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Instruktur</h2>
                <Button variant="link" asChild>
                  <Link href="#" onClick={() => setActiveTab("instructors")}>
                    Lihat Semua
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.instructors.map((instructor) => (
                  <Card key={instructor.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src={instructor.image || "/placeholder.svg"}
                            alt={instructor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{instructor.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{instructor.specialization}</p>
                          <p className="text-sm">{instructor.courses} kursus</p>
                          <Button variant="link" className="p-0" asChild>
                            <Link href="#">Lihat Profil</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Acara</h2>
                <Button variant="link" asChild>
                  <Link href="#" onClick={() => setActiveTab("events")}>
                    Lihat Semua
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.events.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</Badge>
                          </div>
                          <h3 className="font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <Button>Daftar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover md:rounded-l-lg"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <h3 className="font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Book className="h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{course.instructor}</span>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/courses/${course.id}`}>Lihat Kursus</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="instructors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.instructors.map((instructor) => (
              <Card key={instructor.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={instructor.image || "/placeholder.svg"}
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{instructor.specialization}</p>
                    <p className="text-sm mb-4">{instructor.courses} kursus</p>
                    <Button variant="outline" asChild>
                      <Link href="#">Lihat Profil</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <Button>Daftar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
