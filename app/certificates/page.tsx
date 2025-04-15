import { Download, ExternalLink, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for certificates
const certificates = [
  {
    id: 1,
    title: "Dasar-Dasar Kelistrikan",
    issueDate: "15 Januari 2023",
    expiryDate: "15 Januari 2026",
    credentialId: "CERT-EL-2023-001",
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Keselamatan Kerja di Pertambangan",
    issueDate: "3 Maret 2023",
    expiryDate: "3 Maret 2025",
    credentialId: "CERT-MN-2023-042",
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Pengenalan Energi Terbarukan",
    issueDate: "22 April 2022",
    expiryDate: "22 April 2024",
    credentialId: "CERT-RE-2022-118",
    status: "expiring",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Manajemen Proyek Konstruksi",
    issueDate: "10 Juni 2021",
    expiryDate: "10 Juni 2023",
    credentialId: "CERT-CN-2021-076",
    status: "expired",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Helper function to get certificate status badge
const getCertificateStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="success">Aktif</Badge>
    case "expiring":
      return <Badge variant="warning">Segera Berakhir</Badge>
    case "expired":
      return <Badge variant="destructive">Kedaluwarsa</Badge>
    default:
      return <Badge variant="outline">Tidak Diketahui</Badge>
  }
}

export default function CertificatesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Sertifikat Saya</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Cari sertifikat..." className="w-full md:w-[250px] pl-8" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="expiring">Segera Berakhir</TabsTrigger>
          <TabsTrigger value="expired">Kedaluwarsa</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
                <div className="aspect-[3/2] relative">
                  <img
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">{getCertificateStatusBadge(certificate.status)}</div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{certificate.title}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium">ID Kredensial:</span> {certificate.credentialId}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Tanggal Terbit:</span> {certificate.issueDate}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Berlaku Hingga:</span> {certificate.expiryDate}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Unduh
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Lihat
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates
              .filter((cert) => cert.status === "active")
              .map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <img
                      src={certificate.image || "/placeholder.svg"}
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">{getCertificateStatusBadge(certificate.status)}</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{certificate.title}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">ID Kredensial:</span> {certificate.credentialId}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Tanggal Terbit:</span> {certificate.issueDate}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Berlaku Hingga:</span> {certificate.expiryDate}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Lihat
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="expiring">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates
              .filter((cert) => cert.status === "expiring")
              .map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <img
                      src={certificate.image || "/placeholder.svg"}
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">{getCertificateStatusBadge(certificate.status)}</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{certificate.title}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">ID Kredensial:</span> {certificate.credentialId}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Tanggal Terbit:</span> {certificate.issueDate}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Berlaku Hingga:</span> {certificate.expiryDate}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Lihat
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="expired">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates
              .filter((cert) => cert.status === "expired")
              .map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <img
                      src={certificate.image || "/placeholder.svg"}
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">{getCertificateStatusBadge(certificate.status)}</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{certificate.title}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">ID Kredensial:</span> {certificate.credentialId}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Tanggal Terbit:</span> {certificate.issueDate}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Berlaku Hingga:</span> {certificate.expiryDate}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Lihat
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
