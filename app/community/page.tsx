import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, MessageSquare, Search, Users } from "lucide-react"

export default function CommunityPage() {
  // Sample data for community members
  const communityMembers = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Insinyur Konstruksi",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: 12,
      connections: 87,
      isConnected: false,
    },
    {
      id: 2,
      name: "Siti Rahayu",
      role: "Teknisi Ketenagalistrikan",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: 8,
      connections: 64,
      isConnected: true,
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      role: "Spesialis Pertambangan",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: 15,
      connections: 112,
      isConnected: false,
    },
    {
      id: 4,
      name: "Dewi Lestari",
      role: "Konsultan Energi Terbarukan",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: 10,
      connections: 93,
      isConnected: true,
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      role: "Insinyur Kelistrikan",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: 7,
      connections: 45,
      isConnected: false,
    },
    {
      id: 6,
      name: "Rina Wulandari",
      role: "Manajer Proyek Konstruksi",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: 14,
      connections: 128,
      isConnected: false,
    },
  ]

  // Sample data for community groups
  const communityGroups = [
    {
      id: 1,
      name: "Konstruksi Bangunan Tinggi",
      members: 245,
      posts: 1230,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Teknisi Kelistrikan Indonesia",
      members: 187,
      posts: 876,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Pertambangan Berkelanjutan",
      members: 134,
      posts: 654,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Energi Terbarukan untuk Masa Depan",
      members: 312,
      posts: 1540,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Komunitas</h1>
          <p className="text-muted-foreground mt-1">
            Terhubung dengan sesama pembelajar dan bergabung dengan grup diskusi
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari anggota atau grup..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="members" className="mb-6">
        <TabsList>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Anggota
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Grup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communityMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Kursus</p>
                      <p className="font-medium">{member.courses}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Koneksi</p>
                      <p className="font-medium">{member.connections}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant={member.isConnected ? "outline" : "default"} className="w-full">
                    {member.isConnected ? "Terhubung" : "Hubungkan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="groups" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {communityGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-40 md:h-auto bg-muted">
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-6">
                    <CardTitle className="mb-2">{group.name}</CardTitle>
                    <div className="flex gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Anggota</p>
                        <p className="font-medium">{group.members}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Postingan</p>
                        <p className="font-medium">{group.posts}</p>
                      </div>
                    </div>
                    <Button>Gabung Grup</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Rekomendasi Koneksi</CardTitle>
          <CardDescription>Berdasarkan minat dan kursus Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {communityMembers.slice(0, 3).map((member) => (
              <div key={`rec-${member.id}`} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Hubungkan
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
