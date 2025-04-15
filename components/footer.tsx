import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Learning</h3>
            <p className="text-sm text-muted-foreground">
              Platform pembelajaran untuk industri konstruksi, ketenagalistrikan, pertambangan, dan energi terbarukan.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                  Kursus
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-muted-foreground hover:text-foreground">
                  Planner
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground hover:text-foreground">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/learning-path" className="text-muted-foreground hover:text-foreground">
                  Jalur Pembelajaran
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-muted-foreground hover:text-foreground">
                  Analitik
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="/help#faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/contact" className="text-muted-foreground hover:text-foreground">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Sumber Daya
                </Link>
              </li>
              <li>
                <Link href="/mobile" className="text-muted-foreground hover:text-foreground">
                  Aplikasi Mobile
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-muted-foreground hover:text-foreground">
                  Pengaturan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@learning.id</li>
              <li className="text-muted-foreground">Telepon: +62 21 1234 5678</li>
              <li className="text-muted-foreground">Alamat: Jl. Pendidikan No. 123, Jakarta</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Learning. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
