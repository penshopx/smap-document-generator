"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookmarkPlus, Flag, MessageCircle, Share2, ThumbsUp, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for a specific discussion
const getDiscussion = (id: string) => {
  return {
    id: Number(id),
    title: "Cara menghitung resistansi dalam rangkaian paralel?",
    content:
      "Saya sedang belajar tentang rangkaian listrik dan mengalami kesulitan dalam memahami cara menghitung resistansi total dalam rangkaian paralel. Saya sudah mencoba menggunakan rumus 1/Rtotal = 1/R1 + 1/R2 + ... + 1/Rn, tetapi hasil perhitungan saya selalu berbeda dengan jawaban di buku. Apakah ada langkah-langkah khusus atau tips untuk memastikan perhitungan yang benar? Terima kasih sebelumnya untuk bantuan yang diberikan.",
    category: "Kelistrikan",
    author: {
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Peserta",
      joinDate: "Januari 2023",
      posts: 12,
    },
    date: "2 jam yang lalu",
    views: 42,
    likes: 3,
    isPinned: false,
    isHot: true,
    tags: ["rangkaian", "resistansi", "dasar"],
    replies: [
      {
        id: 1,
        content:
          "Halo Budi, untuk menghitung resistansi total dalam rangkaian paralel, rumus yang Anda gunakan sudah benar: 1/Rtotal = 1/R1 + 1/R2 + ... + 1/Rn. Pastikan Anda melakukan perhitungan dengan langkah-langkah berikut:\n\n1. Hitung jumlah 1/R untuk setiap resistor\n2. Jumlahkan semua nilai tersebut\n3. Ambil kebalikan (1/x) dari hasil penjumlahan untuk mendapatkan Rtotal\n\nContoh: Jika R1 = 10Ω dan R2 = 20Ω, maka:\n1/Rtotal = 1/10 + 1/20 = 0.1 + 0.05 = 0.15\nRtotal = 1/0.15 = 6.67Ω\n\nCoba periksa kembali perhitungan Anda dengan langkah-langkah ini.",
        author: {
          name: "Dr. Rina Wijaya",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Instruktur",
          joinDate: "Maret 2022",
          posts: 156,
        },
        date: "1 jam yang lalu",
        likes: 5,
        isVerified: true,
      },
      {
        id: 2,
        content:
          "Saya juga pernah mengalami kesulitan yang sama. Selain tips dari Dr. Rina, saya biasanya menggunakan kalkulator ilmiah untuk menghindari kesalahan perhitungan, terutama ketika bekerja dengan pecahan. Juga, ingat bahwa resistansi total dalam rangkaian paralel selalu lebih kecil dari resistor terkecil dalam rangkaian tersebut, jadi itu bisa menjadi cara cepat untuk memeriksa apakah jawaban Anda masuk akal.",
        author: {
          name: "Dewi Lestari",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Peserta",
          joinDate: "April 2023",
          posts: 28,
        },
        date: "45 menit yang lalu",
        likes: 2,
        isVerified: false,
      },
      {
        id: 3,
        content:
          "Terima kasih Dr. Rina dan Dewi atas penjelasannya. Saya sudah mencoba lagi dengan langkah-langkah yang diberikan dan sekarang hasilnya sesuai dengan jawaban di buku. Saya memang melakukan kesalahan saat mengambil kebalikan di langkah terakhir. Tip untuk memeriksa bahwa resistansi total harus lebih kecil dari resistor terkecil juga sangat membantu!",
        author: {
          name: "Budi Santoso",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Peserta",
          joinDate: "Januari 2023",
          posts: 12,
        },
        date: "30 menit yang lalu",
        likes: 1,
        isVerified: false,
      },
      {
        id: 4,
        content:
          "Untuk visualisasi yang lebih baik, Anda bisa membayangkan rangkaian paralel seperti jalur air yang bercabang. Semakin banyak jalur (resistor), semakin mudah air (arus) mengalir, sehingga resistansi total menurun. Ini berbeda dengan rangkaian seri di mana resistansi bertambah dengan setiap resistor tambahan. Saya harap analogi ini membantu pemahaman konseptual Anda.",
        author: {
          name: "Agus Setiawan",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Asisten Instruktur",
          joinDate: "Juni 2022",
          posts: 87,
        },
        date: "15 menit yang lalu",
        likes: 3,
        isVerified: true,
      },
    ],
  }
}

// Mock data for related discussions
const relatedDiscussions = [
  {
    id: 101,
    title: "Perbedaan rangkaian seri dan paralel dalam aplikasi praktis",
    replies: 8,
    views: 76,
  },
  {
    id: 102,
    title: "Cara mengukur resistansi dengan multimeter digital",
    replies: 5,
    views: 64,
  },
  {
    id: 103,
    title: "Pengaruh suhu terhadap nilai resistansi",
    replies: 12,
    views: 98,
  },
]

export default function DiscussionDetailPage({ params }: { params: { id: string } }) {
  const discussion = getDiscussion(params.id)
  const [replyContent, setReplyContent] = useState("")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return
    // In a real app, this would submit the reply to an API
    console.log("Submitting reply:", replyContent)
    setReplyContent("")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Forum
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline">{discussion.category}</Badge>
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl font-bold">{discussion.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <span>Dibuat {discussion.date}</span>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{discussion.replies.length} balasan</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{discussion.views} dilihat</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Salin Tautan</DropdownMenuItem>
                <DropdownMenuItem>Bagikan ke WhatsApp</DropdownMenuItem>
                <DropdownMenuItem>Bagikan ke Email</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="hidden md:block">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                    <AvatarFallback>
                      {discussion.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{discussion.author.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {discussion.author.posts} post{discussion.author.posts !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="md:hidden h-8 w-8">
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
                      <div>
                        <p className="font-medium">{discussion.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Bergabung {discussion.author.joinDate} • {discussion.date}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Salin Teks</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Laporkan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p>{discussion.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className={likedPosts.includes(0) ? "bg-primary/10" : ""}
                      onClick={() => handleLike(0)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Suka ({likedPosts.includes(0) ? discussion.likes + 1 : discussion.likes})
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Balas
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mb-4">Balasan ({discussion.replies.length})</h2>

          {discussion.replies.map((reply, index) => (
            <Card key={reply.id} className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="hidden md:block">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                      <AvatarFallback>
                        {reply.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium">{reply.author.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {reply.author.posts} post{reply.author.posts !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="md:hidden h-8 w-8">
                          <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                          <AvatarFallback>
                            {reply.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{reply.author.name}</p>
                            {reply.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                Terverifikasi
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Bergabung {reply.author.joinDate} • {reply.date}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            •••
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Salin Teks</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Laporkan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
                      <p>{reply.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className={likedPosts.includes(reply.id) ? "bg-primary/10" : ""}
                        onClick={() => handleLike(reply.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Suka ({likedPosts.includes(reply.id) ? reply.likes + 1 : reply.likes})
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Balas
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <h3 className="font-medium">Tambahkan Balasan</h3>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tulis balasan Anda di sini..."
                className="min-h-[150px]"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Gunakan format Markdown untuk <strong>tebal</strong>, <em>miring</em>, dan lainnya.
              </p>
              <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
                Kirim Balasan
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <h3 className="font-medium">Tentang Penulis</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                  <AvatarFallback>
                    {discussion.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{discussion.author.name}</p>
                  <p className="text-sm text-muted-foreground">{discussion.author.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Bergabung:</span> {discussion.author.joinDate}
                </p>
                <p>
                  <span className="font-medium">Total Post:</span> {discussion.author.posts}
                </p>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full">
                Lihat Semua Post
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium">Diskusi Terkait</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {relatedDiscussions.map((related) => (
                  <Link
                    key={related.id}
                    href={`/forum/${related.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium mb-2 line-clamp-2">{related.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{related.replies} balasan</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{related.views} dilihat</span>
                      </div>
                    </div>
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
