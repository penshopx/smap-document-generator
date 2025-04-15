import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, CheckCircle, ChevronRight, Download, Smartphone } from "lucide-react"

export default function MobilePage() {
  // Features of the mobile app
  const features = [
    {
      title: "Akses Offline",
      description: "Unduh kursus dan pelajari kapan saja tanpa koneksi internet",
    },
    {
      title: "Notifikasi Real-time",
      description: "Dapatkan pemberitahuan tentang tenggat waktu dan pembaruan kursus",
    },
    {
      title: "Sinkronisasi Lintas Perangkat",
      description: "Lanjutkan belajar dari perangkat mana saja dengan sinkronisasi otomatis",
    },
    {
      title: "Mode Hemat Data",
      description: "Kurangi penggunaan data saat streaming video pembelajaran",
    },
    {
      title: "Pembelajaran Mikro",
      description: "Akses materi pembelajaran singkat yang dapat diselesaikan dalam 5-10 menit",
    },
    {
      title: "Integrasi Kalender",
      description: "Sinkronkan jadwal pembelajaran dengan kalender perangkat Anda",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Belajar di Mana Saja dengan Aplikasi Mobile Kami</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Akses semua kursus, jadwal, dan materi pembelajaran dari perangkat mobile Anda. Belajar jadi lebih fleksibel
            dan nyaman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download untuk Android
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Apple className="h-5 w-5" />
              Download untuk iOS
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Smartphone className="h-4 w-4" />
            <span>Tersedia untuk Android 8.0+ dan iOS 13.0+</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-[500px] border-8 border-gray-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="absolute top-0 w-32 h-6 bg-gray-800 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
            <div className="w-full h-full bg-gray-100 overflow-hidden">
              <img
                src="/placeholder.svg?height=500&width=300"
                alt="Mobile App Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Aplikasi Mobile</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-6">Preview Aplikasi</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Lihat tampilan dan pengalaman aplikasi mobile kami sebelum mengunduhnya
        </p>

        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="courses">Kursus</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-[500px] border-8 border-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute top-0 w-32 h-6 bg-gray-800 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
              <TabsContent value="dashboard" className="m-0 h-full">
                <img
                  src="/placeholder.svg?height=500&width=300&text=Dashboard"
                  alt="Dashboard Preview"
                  className="w-full h-full object-cover"
                />
              </TabsContent>
              <TabsContent value="courses" className="m-0 h-full">
                <img
                  src="/placeholder.svg?height=500&width=300&text=Courses"
                  alt="Courses Preview"
                  className="w-full h-full object-cover"
                />
              </TabsContent>
              <TabsContent value="schedule" className="m-0 h-full">
                <img
                  src="/placeholder.svg?height=500&width=300&text=Schedule"
                  alt="Schedule Preview"
                  className="w-full h-full object-cover"
                />
              </TabsContent>
              <TabsContent value="profile" className="m-0 h-full">
                <img
                  src="/placeholder.svg?height=500&width=300&text=Profile"
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>

      <div className="my-16 bg-muted rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Unduh Sekarang</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mulai pengalaman belajar yang lebih fleksibel dengan aplikasi mobile kami. Tersedia untuk Android dan iOS.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Download untuk Android
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Apple className="h-5 w-5" />
            Download untuk iOS
          </Button>
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Umum</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="font-bold text-lg mb-2">Apakah aplikasi ini gratis?</h3>
            <p className="text-muted-foreground">
              Ya, aplikasi dapat diunduh secara gratis. Namun, beberapa konten premium mungkin memerlukan langganan.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Bagaimana cara mengunduh kursus untuk akses offline?</h3>
            <p className="text-muted-foreground">
              Cukup buka halaman kursus dan klik tombol "Unduh" untuk menyimpannya ke perangkat Anda.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Apakah sertifikat dapat diakses melalui aplikasi?</h3>
            <p className="text-muted-foreground">
              Ya, semua sertifikat yang Anda peroleh dapat diakses dan dibagikan langsung dari aplikasi.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Berapa banyak ruang penyimpanan yang dibutuhkan?</h3>
            <p className="text-muted-foreground">
              Aplikasi membutuhkan sekitar 50MB untuk instalasi. Ruang tambahan diperlukan untuk konten yang diunduh.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button variant="link" className="gap-1">
            Lihat semua FAQ <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
