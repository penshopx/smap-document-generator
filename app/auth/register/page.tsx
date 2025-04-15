import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Buat Akun Baru</h1>
          <p className="text-sm text-muted-foreground">Daftar untuk memulai perjalanan pembelajaran Anda</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
