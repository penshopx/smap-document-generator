"use client"

import { useState } from "react"
import { ArrowRight, Award, BookOpen, CheckCircle, ChevronDown, ChevronUp, Clock, Search, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for skills
const skills = [
  {
    id: 1,
    name: "Dasar Kelistrikan",
    category: "Kelistrikan",
    level: "Pemula",
    progress: 85,
    courses: [
      { id: 1, title: "Dasar-Dasar Kelistrikan", completed: true },
      { id: 2, title: "Rangkaian Listrik Dasar", completed: true },
    ],
    assessments: [{ id: 1, title: "Ujian Dasar Kelistrikan", score: 85, maxScore: 100, date: "10 Mei 2023" }],
    certificates: [{ id: 1, title: "Sertifikat Dasar Kelistrikan", issueDate: "15 Mei 2023", expiry: "15 Mei 2025" }],
  },
  {
    id: 2,
    name: "Rangkaian Listrik",
    category: "Kelistrikan",
    level: "Menengah",
    progress: 60,
    courses: [
      { id: 2, title: "Rangkaian Listrik Dasar", completed: true },
      { id: 4, title: "Pengukuran Listrik", completed: false },
    ],
    assessments: [{ id: 2, title: "Ujian Rangkaian Listrik", score: 75, maxScore: 100, date: "20 Mei 2023" }],
    certificates: [],
  },
  {
    id: 3,
    name: "Keselamatan Kerja",
    category: "Keselamatan",
    level: "Pemula",
    progress: 100,
    courses: [{ id: 3, title: "Keselamatan Kerja di Bidang Kelistrikan", completed: true }],
    assessments: [{ id: 3, title: "Ujian Keselamatan Kerja", score: 90, maxScore: 100, date: "5 Juni 2023" }],
    certificates: [{ id: 2, title: "Sertifikat Keselamatan Kerja", issueDate: "10 Juni 2023", expiry: "10 Juni 2025" }],
  },
  {
    id: 4,
    name: "Energi Surya",
    category: "Energi Terbarukan",
    level: "Menengah",
    progress: 40,
    courses: [
      { id: 6, title: "Pengenalan Energi Terbarukan", completed: true },
      { id: 7, title: "Dasar Teknologi Panel Surya", completed: false },
    ],
    assessments: [],
    certificates: [],
  },
  {
    id: 5,
    name: "Energi Angin",
    category: "Energi Terbarukan",
    level: "Menengah",
    progress: 25,
    courses: [
      { id: 6, title: "Pengenalan Energi Terbarukan", completed: true },
      { id: 8, title: "Sistem Turbin Angin", completed: false },
    ],
    assessments: [],
    certificates: [],
  },
  {
    id: 6,
    name: "Manajemen Risiko",
    category: "Keselamatan",
    level: "Lanjutan",
    progress: 10,
    courses: [{ id: 14, title: "Manajemen Risiko Pertambangan", completed: false }],
    assessments: [],
    certificates: [],
  },
]

// Mock data for recommended skills
const recommendedSkills = [
  {
    id: 7,
    name: "Instalasi Listrik",
    category: "Kelistrikan",
    level: "Menengah",
    relevance: 95,
    courses: [
      { id: 5, title: "Instalasi Listrik Dasar", duration: "8 jam" },
      { id: 17, title: "Instalasi Listrik Lanjutan", duration: "10 jam" },
    ],
  },
  {
    id: 8,
    name: "Sistem Penyimpanan Energi",
    category: "Energi Terbarukan",
    level: "Menengah",
    relevance: 85,
    courses: [
      { id: 10, title: "Penyimpanan Energi dan Baterai", duration: "4 jam" },
      { id: 18, title: "Teknologi Baterai Modern", duration: "6 jam" },
    ],
  },
  {
    id: 9,
    name: "Otomasi Industri",
    category: "Otomasi",
    level: "Lanjutan",
    relevance: 75,
    courses: [
      { id: 19, title: "Pengantar Otomasi Industri", duration: "5 jam" },
      { id: 20, title: "Pemrograman PLC", duration: "8 jam" },
    ],
  },
]

// Mock data for skill categories
const skillCategories = [
  { id: 1, name: "Kelistrikan", count: 3 },
  { id: 2, name: "Energi Terbarukan", count: 2 },
  { id: 3, name: "Keselamatan", count: 2 },
  { id: 4, name: "Otomasi", count: 0 },
  { id: 5, name: "Konstruksi", count: 0 },
]

// Mock data for skill levels
const skillLevels = [
  { id: 1, name: "Pemula" },
  { id: 2, name: "Menengah" },
  { id: 3, name: "Lanjutan" },
]

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null)

  // Filter skills based on search query, category, and level
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || skill.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  // Toggle skill expansion
  const toggleSkillExpansion = (skillId: number) => {
    if (expandedSkill === skillId) {
      setExpandedSkill(null)
    } else {
      setExpandedSkill(skillId)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Penilaian Keterampilan</h1>
          <p className="text-muted-foreground">Pantau dan kembangkan keterampilan Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/courses">Jelajahi Kursus</Link>
          </Button>
          <Button asChild>
            <Link href="/learning-path">Jalur Pembelajaran</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-skills">
        <TabsList className="mb-6">
          <TabsTrigger value="my-skills">Keterampilan Saya</TabsTrigger>
          <TabsTrigger value="recommended">Rekomendasi</TabsTrigger>
          <TabsTrigger value="assessments">Penilaian</TabsTrigger>
        </TabsList>

        <TabsContent value="my-skills">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="search" className="text-sm font-medium">
                      Cari
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Cari keterampilan..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Kategori
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        {skillCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name} ({category.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="level" className="text-sm font-medium">
                      Level
                    </label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Pilih level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Level</SelectItem>
                        {skillLevels.map((level) => (
                          <SelectItem key={level.id} value={level.name}>
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Total Keterampilan</span>
                      <span className="font-medium">{skills.length}</span>
                    </div>
                    <Progress value={100} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Keterampilan Dikuasai</span>
                      <span className="font-medium">{skills.filter((s) => s.progress === 100).length}</span>
                    </div>
                    <Progress
                      value={(skills.filter((s) => s.progress === 100).length / skills.length) * 100}
                      className="h-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Keterampilan Sedang Dipelajari</span>
                      <span className="font-medium">
                        {skills.filter((s) => s.progress > 0 && s.progress < 100).length}
                      </span>
                    </div>
                    <Progress
                      value={(skills.filter((s) => s.progress > 0 && s.progress < 100).length / skills.length) * 100}
                      className="h-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sertifikat Diperoleh</span>
                      <span className="font-medium">
                        {skills.reduce((acc, skill) => acc + skill.certificates.length, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <div className="space-y-4">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <Collapsible
                      key={skill.id}
                      open={expandedSkill === skill.id}
                      onOpenChange={() => toggleSkillExpansion(skill.id)}
                    >
                      <Card>
                        <CardHeader className="p-4">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    skill.progress === 100
                                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                      : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                  }`}
                                >
                                  {skill.progress === 100 ? (
                                    <CheckCircle className="h-5 w-5" />
                                  ) : (
                                    <span className="font-medium">{skill.progress}%</span>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium">{skill.name}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Badge variant="outline">{skill.category}</Badge>
                                    <span>•</span>
                                    <span>{skill.level}</span>
                                  </div>
                                </div>
                              </div>
                              {expandedSkill === skill.id ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="p-4 pt-0 border-t">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Progress</h4>
                                <Progress value={skill.progress} className="h-2 mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  {skill.progress === 100
                                    ? "Anda telah menguasai keterampilan ini."
                                    : `Anda telah menyelesaikan ${skill.progress}% dari keterampilan ini.`}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Kursus Terkait</h4>
                                <div className="space-y-2">
                                  {skill.courses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        {course.completed ? (
                                          <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <Clock className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{course.title}</span>
                                      </div>
                                      <Badge variant={course.completed ? "success" : "outline"}>
                                        {course.completed ? "Selesai" : "Belum Selesai"}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {skill.assessments.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Penilaian</h4>
                                  <div className="space-y-2">
                                    {skill.assessments.map((assessment) => (
                                      <div key={assessment.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Award className="h-4 w-4 text-muted-foreground" />
                                          <span>{assessment.title}</span>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-medium">
                                            {assessment.score}/{assessment.maxScore}
                                          </div>
                                          <div className="text-xs text-muted-foreground">{assessment.date}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {skill.certificates.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Sertifikat</h4>
                                  <div className="space-y-2">
                                    {skill.certificates.map((certificate) => (
                                      <div key={certificate.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Award className="h-4 w-4 text-amber-500" />
                                          <span>{certificate.title}</span>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-xs text-muted-foreground">
                                            Diterbitkan: {certificate.issueDate}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            Berlaku hingga: {certificate.expiry}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button variant="outline" className="w-full" asChild>
                              <Link href={`/skills/${skill.id}`}>
                                Lihat Detail Keterampilan
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground mb-4">Tidak ada keterampilan yang sesuai dengan filter.</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                          setSelectedLevel("all")
                        }}
                      >
                        Reset Filter
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedSkills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{skill.name}</CardTitle>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                      <span className="text-primary font-bold">{skill.relevance}%</span>
                    </div>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{skill.category}</Badge>
                      <span>•</span>
                      <span>{skill.level}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Mengapa Direkomendasikan</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span>Kesesuaian dengan profil Anda: {skill.relevance}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>Melengkapi keterampilan yang sudah Anda miliki</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Kursus Terkait</h4>
                      <div className="space-y-2">
                        {skill.courses.map((course) => (
                          <div key={course.id} className="flex items-center justify-between">
                            <span>{course.title}</span>
                            <span className="text-sm text-muted-foreground">{course.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/skills/${skill.id}`}>Lihat Detail</Link>
                  </Button>
                  <Button>Tambahkan ke Jalur</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Penilaian Tersedia</CardTitle>
                <CardDescription>Ujian dan penilaian yang dapat Anda ambil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Ujian Pengukuran Listrik</h3>
                        <p className="text-sm text-muted-foreground">
                          Menguji pemahaman Anda tentang pengukuran dan alat ukur listrik
                        </p>
                      </div>
                      <Badge>Baru</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>60 menit</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>25 pertanyaan</span>
                      </div>
                    </div>
                    <Button className="w-full">Mulai Ujian</Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Penilaian Teknologi Panel Surya</h3>
                        <p className="text-sm text-muted-foreground">
                          Evaluasi pengetahuan Anda tentang teknologi panel surya dan aplikasinya
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>45 menit</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>20 pertanyaan</span>
                      </div>
                    </div>
                    <Button className="w-full">Mulai Ujian</Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Ujian Keselamatan Pertambangan</h3>
                        <p className="text-sm text-muted-foreground">
                          Menguji pemahaman Anda tentang protokol keselamatan di lingkungan pertambangan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>90 menit</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>30 pertanyaan</span>
                      </div>
                    </div>
                    <Button className="w-full">Mulai Ujian</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Riwayat Penilaian</CardTitle>
                <CardDescription>Hasil penilaian yang telah Anda selesaikan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Ujian Dasar Kelistrikan</h3>
                        <p className="text-sm text-muted-foreground">Selesai pada 10 Mei 2023</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">85/100</div>
                        <Badge variant="success">Lulus</Badge>
                      </div>
                    </div>
                    <Progress value={85} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span>Skor Anda</span>
                      <span>Skor minimum: 70</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Ujian Rangkaian Listrik</h3>
                        <p className="text-sm text-muted-foreground">Selesai pada 20 Mei 2023</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">75/100</div>
                        <Badge variant="success">Lulus</Badge>
                      </div>
                    </div>
                    <Progress value={75} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span>Skor Anda</span>
                      <span>Skor minimum: 70</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Ujian Keselamatan Kerja</h3>
                        <p className="text-sm text-muted-foreground">Selesai pada 5 Juni 2023</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">90/100</div>
                        <Badge variant="success">Lulus</Badge>
                      </div>
                    </div>
                    <Progress value={90} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span>Skor Anda</span>
                      <span>Skor minimum: 75</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Lihat Semua Riwayat
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
