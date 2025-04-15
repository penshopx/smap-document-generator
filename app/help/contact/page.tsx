"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast({
      title: "Tiket Dukungan Terkirim",
      description: "Tim kami akan menghubungi Anda dalam 24 jam kerja.",
    })

    // Reset form
    event.currentTarget.reset()
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Hubungi Kami</h1>
        <p className="text-muted-foreground max-w-2xl">
          Ada pertanyaan atau masalah? Tim dukungan kami siap membantu Anda. Pilih metode kontak yang paling nyaman
          untuk Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Email</CardTitle>
            <CardDescription>support@learning.id</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Kirim email kepada kami untuk pertanyaan umum atau dukungan teknis.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:support@learning.id">Kirim Email</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Telepon</CardTitle>
            <CardDescription>+62 21 1234 5678</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Tersedia Senin-Jumat, 08:00-17:00 WIB untuk bantuan langsung.
            </p>
            <Button variant="outline" asChild>
              <a href="tel:+6281234567890">Hubungi Kami</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Bantuan Langsung</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Dapatkan bantuan instan dari tim dukungan kami melalui live chat.
            </p>
            <Button variant="outline" asChild>
              <a href="/chat">Mulai Chat</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Kirim Tiket Dukungan</CardTitle>
            <CardDescription>
              Jelaskan masalah atau pertanyaan Anda dan tim kami akan menghubungi Anda segera.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subjek</Label>
                <Input id="subject" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Akun & Profil</SelectItem>
                    <SelectItem value="courses">Kursus & Pembelajaran</SelectItem>
                    <SelectItem value="technical">Masalah Teknis</SelectItem>
                    <SelectItem value="payment">Pembayaran & Langganan</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioritas</Label>
                <RadioGroup defaultValue="normal" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="priority-low" />
                    <Label htmlFor="priority-low">Rendah</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="priority-normal" />
                    <Label htmlFor="priority-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="priority-high" />
                    <Label htmlFor="priority-high">Tinggi</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea id="message" rows={5} required />
                <p className="text-xs text-muted-foreground">
                  Jelaskan masalah Anda secara detail. Sertakan tangkapan layar jika diperlukan.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Lampiran (opsional)</Label>
                <Input id="attachment" type="file" />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim Tiket Dukungan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
