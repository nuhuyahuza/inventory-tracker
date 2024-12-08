import { Header } from "./Header"
import { Footer } from "./Footer"

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Header className="sticky top-0 z-50" />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex">
          {children}
        </main>
      </div>
      <Footer className="z-40" />
    </div>
  )
} 