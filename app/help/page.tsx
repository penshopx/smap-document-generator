import Link from "next/link"
import {
  BookOpen,
  FileQuestion,
  Headphones,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for FAQ
const faqCategories = [
  {
    id: "account",
    title: "Akun & Profil",
    questions: [
      {
        id: "1",
        question: "Bagaimana cara mengubah kata sandi saya?",
        answer:
          "Untuk mengubah kata sandi, kunjungi halaman Profil, pilih tab Akun, dan klik tombol 'Perbarui Kata Sandi'. Anda akan diminta memasukkan kata sandi lama dan kata sandi baru.",
      },
      {
        id: "2",
        question: "Bagaimana cara memperbarui informasi profil saya?",
        answer:
          "Kunjungi halaman Profil dan pilih tab Informasi Pribadi. Di sana Anda dapat mengedit nama, email, nomor telepon, dan informasi lainnya. Jangan lupa klik 'Simpan Perubahan' setelah selesai.",
      },
      {
        id: "3",
        question: "Bagaimana cara mengaktifkan autentikasi dua faktor?",
        answer:
          "Untuk mengaktifkan autentikasi dua faktor, kunjungi halaman Profil, pilih tab Akun, dan aktifkan opsi 'Autentikasi Dua Faktor'. Ikuti petunjuk untuk menyelesaikan pengaturan.",
      },
    ],
  },
  {
    id: "courses",
    title: "Kursus & Pembelajaran",
    questions: [
      {
        id: "4",
        question: "Bagaimana cara mendaftar ke kursus?",
        answer:
          "Untuk mendaftar ke kursus, kunjungi halaman Kursus, pilih kursus yang Anda minati, dan klik tombol 'Daftar' atau 'Mulai Belajar'. Jika kursus berbayar, Anda akan diarahkan ke halaman pembayaran.",
      },
      {
        id: "5",
        question: "Apakah saya bisa mengakses kursus secara offline?",
        answer:
          "Ya, sebagian besar kursus dapat diakses secara offline melalui aplikasi mobile kami. Anda perlu mengunduh konten kursus terlebih dahulu saat terhubung ke internet.",
      },
      {
        id: "6",
        question: "Bagaimana cara mendapatkan sertifikat?",
        answer:
          "Untuk mendapatkan sertifikat, Anda harus menyelesaikan semua modul kursus dan lulus ujian akhir dengan nilai minimal 70%. Setelah itu, sertifikat akan otomatis diterbitkan dan tersedia di halaman Sertifikat.",
      },
    ],
  },
  {
    id: "technical",
    title: "Masalah Teknis",
    questions: [
      {
        id: "7",
        question: "Video kursus tidak dapat diputar, apa yang harus saya lakukan?",
        answer:
          "Pastikan koneksi internet Anda stabil. Coba segarkan halaman atau gunakan browser yang berbeda. Jika masalah berlanjut, bersihkan cache browser Anda atau hubungi tim dukungan kami.",
      },
      {
        id: "8",
        question: "Aplikasi mobile crash saat dibuka, bagaimana solusinya?",
        answer:
          "Coba tutup aplikasi dan buka kembali. Jika masalah berlanjut, coba uninstall dan install ulang aplikasi. Pastikan Anda menggunakan versi terbaru dari aplikasi kami.",
      },
      {
        id: "9",
        question: "Bagaimana cara memperbaiki masalah audio pada video pembelajaran?",
        answer:
          "Periksa pengaturan volume perangkat dan browser Anda. Pastikan tidak ada aplikasi lain yang menggunakan audio. Coba gunakan headphone untuk memeriksa apakah masalah ada pada speaker perangkat Anda.",
      },
    ],
  },
  {
    id: "payment",
    title: "Pembayaran & Langganan",
    questions: [
      {
        id: "10",
        question: "Metode pembayaran apa saja yang diterima?",
        answer:
          "Kami menerima pembayaran melalui kartu kredit/debit (Visa, Mastercard, American Express), transfer bank, e-wallet (OVO, GoPay, DANA), dan virtual account.",
      },
      {
        id: "11",
        question: "Bagaimana cara membatalkan langganan?",
        answer:
          "Untuk membatalkan langganan, kunjungi halaman Profil, pilih tab Langganan, dan klik tombol 'Batalkan Langganan'. Ikuti petunjuk untuk menyelesaikan proses pembatalan.",
      },
      {
        id: "12",
        question: "Apakah ada kebijakan pengembalian dana?",
        answer:
          "Ya, kami menawarkan pengembalian dana penuh dalam 7 hari setelah pembelian jika Anda tidak puas dengan kursus. Setelah 7 hari, pengembalian dana akan dipertimbangkan kasus per kasus.",
      },
    ],
  },
]

// Mock data for help articles
const popularArticles = [
  {
    id: "1",
    title: "Panduan Memulai untuk Pengguna Baru",
    description: "Pelajari cara memulai perjalanan pembelajaran Anda di platform kami.",
    icon: BookOpen,
  },
  {
    id: "2",
    title: "Cara Mendapatkan Sertifikat",
    description: "Langkah-langkah untuk menyelesaikan kursus dan mendapatkan sertifikat.",
    icon: FileQuestion,
  },
  {
    id: "3",
    title: "Menggunakan Fitur Chat dengan AI Asisten",
    description: "Panduan lengkap untuk memanfaatkan AI Asisten dalam pembelajaran Anda.",
    icon: MessageSquare,
  },
  {
    id: "4",
    title: "Mengakses Kursus di Perangkat Mobile",
    description: "Cara menggunakan platform pembelajaran kami di smartphone dan tablet.",
    icon: Video,
  },
]

export default function HelpPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Pusat Bantuan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Temukan jawaban untuk pertanyaan umum atau hubungi tim dukungan kami untuk mendapatkan bantuan.
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Cari pertanyaan atau topik bantuan..." className="pl-10 h-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader className="text-center">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>FAQ</CardTitle>
            <CardDescription>Jawaban untuk pertanyaan umum</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <a href="#faq">Lihat FAQ</a>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Panduan</CardTitle>
            <CardDescription>Artikel dan tutorial bantuan</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/help/guides">Lihat Panduan</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Bicara dengan tim dukungan</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/chat">Mulai Chat</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Email</CardTitle>
            <CardDescription>Kirim tiket dukungan</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/help/contact">Hubungi Kami</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Artikel Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularArticles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <article.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/help/articles/${article.id}`}>Baca Selengkapnya</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div id="faq" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h2>
        <Tabs defaultValue="account">
          <TabsList className="mb-6">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <LifeBuoy className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Masih Membutuhkan Bantuan?</h2>
        <p className />
        <h2 className="text-2xl font-bold mb-2">Masih Membutuhkan Bantuan?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          Tim dukungan kami siap membantu Anda dengan pertanyaan atau masalah yang Anda hadapi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="flex items-center gap-2" asChild>
            <Link href="/help/contact">
              <Mail className="h-4 w-4" />
              Kirim Email
            </Link>
          </Button>
          <Button className="flex items-center gap-2" variant="outline" asChild>
            <Link href="tel:+6281234567890">
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </Link>
          </Button>
          <Button className="flex items-center gap-2" variant="outline" asChild>
            <Link href="/chat">
              <Headphones className="h-4 w-4" />
              Live Chat
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
