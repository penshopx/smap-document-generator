"use client"

import type React from "react"

import { useState } from "react"
import {
  BookOpen,
  Download,
  FileText,
  Filter,
  FolderOpen,
  ImageIcon,
  Search,
  Video,
  FileSpreadsheet,
  FileIcon as FilePdf,
  FileCode,
  FileArchive,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Helper function to get file icon based on type
const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FilePdf className="h-6 w-6 text-red-500" />
    case "doc":
    case "docx":
      return <FileText className="h-6 w-6 text-blue-500" />
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="h-6 w-6 text-green-500" />
    case "zip":
    case "rar":
      return <FileArchive className="h-6 w-6 text-amber-500" />
    case "code":
      return <FileCode className="h-6 w-6 text-purple-500" />
    case "image":
      return <ImageIcon className="h-6 w-6 text-pink-500" />
    case "video":
      return <Video className="h-6 w-6 text-cyan-500" />
    default:
      return <FileText className="h-6 w-6 text-gray-500" />
  }
}

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Panduan Dasar Kelistrikan",
    description: "Dokumen panduan lengkap tentang konsep dasar kelistrikan untuk pemula.",
    type: "pdf",
    size: "2.4 MB",
    category: "Kelistrikan",
    course: "Dasar-Dasar Kelistrikan",
    uploadDate: "15 Januari 2023",
    downloads: 128,
  },
  {
    id: 2,
    title: "Diagram Rangkaian Listrik",
    description: "Kumpulan diagram rangkaian listrik untuk praktik dan referensi.",
    type: "pdf",
    size: "1.8 MB",
    category: "Kelistrikan",
    course: "Dasar-Dasar Kelistrikan",
    uploadDate: "16 Januari 2023",
    downloads: 95,
  },
  {
    id: 3,
    title: "Video Tutorial Rangkaian Paralel",
    description: "Tutorial langkah demi langkah tentang cara membuat dan menganalisis rangkaian paralel.",
    type: "video",
    size: "45 MB",
    category: "Kelistrikan",
    course: "Dasar-Dasar Kelistrikan",
    uploadDate: "20 Januari 2023",
    downloads: 76,
  },
  {
    id: 4,
    title: "Protokol Keselamatan Pertambangan",
    description: "Dokumen standar keselamatan kerja di lingkungan pertambangan.",
    type: "pdf",
    size: "3.2 MB",
    category: "Pertambangan",
    course: "Keselamatan Kerja di Pertambangan",
    uploadDate: "5 Februari 2023",
    downloads: 112,
  },
  {
    id: 5,
    title: "Spreadsheet Analisis Risiko",
    description: "Template Excel untuk menganalisis risiko keselamatan di lokasi pertambangan.",
    type: "xlsx",
    size: "850 KB",
    category: "Pertambangan",
    course: "Keselamatan Kerja di Pertambangan",
    uploadDate: "8 Februari 2023",
    downloads: 87,
  },
  {
    id: 6,
    title: "Presentasi Energi Terbarukan",
    description: "Slide presentasi tentang berbagai jenis energi terbarukan dan aplikasinya.",
    type: "pdf",
    size: "4.5 MB",
    category: "Energi Terbarukan",
    course: "Pengenalan Energi Terbarukan",
    uploadDate: "12 Maret 2023",
    downloads: 65,
  },
  {
    id: 7,
    title: "Kode Simulasi Panel Surya",
    description: "Kode Python untuk mensimulasikan efisiensi panel surya dalam berbagai kondisi.",
    type: "code",
    size: "120 KB",
    category: "Energi Terbarukan",
    course: "Pengenalan Energi Terbarukan",
    uploadDate: "15 Maret 2023",
    downloads: 42,
  },
  {
    id: 8,
    title: "Gambar Teknik Konstruksi Modern",
    description: "Kumpulan gambar teknik untuk metode konstruksi modern.",
    type: "image",
    size: "15 MB",
    category: "Konstruksi",
    course: "Teknik Konstruksi Modern",
    uploadDate: "2 April 2023",
    downloads: 58,
  },
  {
    id: 9,
    title: "Template Manajemen Proyek",
    description: "Template dokumen untuk manajemen proyek energi dari perencanaan hingga implementasi.",
    type: "doc",
    size: "1.2 MB",
    category: "Energi",
    course: "Manajemen Proyek Energi",
    uploadDate: "10 April 2023",
    downloads: 73,
  },
  {
    id: 10,
    title: "Dataset Analisis Pertambangan",
    description: "Dataset sampel untuk latihan analisis data pertambangan.",
    type: "zip",
    size: "8.5 MB",
    category: "Pertambangan",
    course: "Analisis Data untuk Industri Pertambangan",
    uploadDate: "18 April 2023",
    downloads: 39,
  },
]

// Mock data for categories
const categories = [
  { id: "all", name: "Semua Kategori" },
  { id: "kelistrikan", name: "Kelistrikan" },
  { id: "pertambangan", name: "Pertambangan" },
  { id: "energi-terbarukan", name: "Energi Terbarukan" },
  { id: "konstruksi", name: 'Konstruksi" },si' },
  { id: "energi", name: "Energi" },
]

// Mock data for file types
const fileTypes = [
  { id: "all", name: "Semua Tipe" },
  { id: "pdf", name: "PDF" },
  { id: "doc", name: "Dokumen" },
  { id: "video", name: "Video" },
  { id: "image", name: "Gambar" },
  { id: "code", name: "Kode" },
  { id: "spreadsheet", name: "Spreadsheet" },
  { id: "archive", name: "Arsip" },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search API call
    console.log("Searching for:", searchQuery)
  }

  const filterResources = () => {
    let filtered = [...resources]

    // Filter by tab
    if (activeTab === "documents") {
      filtered = filtered.filter((resource) => ["pdf", "doc", "docx"].includes(resource.type))
    } else if (activeTab === "media") {
      filtered = filtered.filter((resource) => ["video", "image"].includes(resource.type))
    } else if (activeTab === "data") {
      filtered = filtered.filter((resource) => ["xlsx", "code", "zip"].includes(resource.type))
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((resource) => resource.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((resource) => resource.type === selectedType)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.course.toLowerCase().includes(query),
      )
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime())
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.downloads - a.downloads)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }

  const filteredResources = filterResources()

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Pustaka Sumber Daya</h1>
          <p className="text-muted-foreground">Akses materi pembelajaran, dokumen, dan sumber daya lainnya</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                <span>Folder Saya</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Unduhan Saya</DropdownMenuItem>
              <DropdownMenuItem>Favorit</DropdownMenuItem>
              <DropdownMenuItem>Terakhir Dilihat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            Materi Kursus Saya
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari sumber daya..."
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
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[150px]">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipe File" />
                </SelectTrigger>
                <SelectContent>
                  {fileTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
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
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                  <SelectItem value="popular">Terpopuler</SelectItem>
                  <SelectItem value="name">Nama</SelectItem>
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
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="data">Data & Kode</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">{getFileIcon(resource.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate" title={resource.title}>
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{resource.category}</Badge>
                          <Badge variant="secondary">{resource.type.toUpperCase()}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{resource.size}</span>
                          <span>{resource.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>{resource.downloads} unduhan</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Pratinjau
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Unduh
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Tidak Ada Sumber Daya</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Tidak ada sumber daya yang sesuai dengan filter Anda. Coba ubah filter atau cari dengan kata kunci
                  yang berbeda.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">{getFileIcon(resource.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate" title={resource.title}>
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{resource.category}</Badge>
                          <Badge variant="secondary">{resource.type.toUpperCase()}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{resource.size}</span>
                          <span>{resource.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>{resource.downloads} unduhan</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Pratinjau
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Unduh
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Tidak Ada Dokumen</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Tidak ada dokumen yang sesuai dengan filter Anda. Coba ubah filter atau cari dengan kata kunci yang
                  berbeda.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">{getFileIcon(resource.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate" title={resource.title}>
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{resource.category}</Badge>
                          <Badge variant="secondary">{resource.type.toUpperCase()}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{resource.size}</span>
                          <span>{resource.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>{resource.downloads} unduhan</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Pratinjau
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Unduh
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Tidak Ada Media</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Tidak ada media yang sesuai dengan filter Anda. Coba ubah filter atau cari dengan kata kunci yang
                  berbeda.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="data" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">{getFileIcon(resource.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate" title={resource.title}>
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{resource.category}</Badge>
                          <Badge variant="secondary">{resource.type.toUpperCase()}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{resource.size}</span>
                          <span>{resource.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>{resource.downloads} unduhan</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Pratinjau
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Unduh
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <FileCode className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Tidak Ada Data</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Tidak ada data atau kode yang sesuai dengan filter Anda. Coba ubah filter atau cari dengan kata kunci
                  yang berbeda.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
