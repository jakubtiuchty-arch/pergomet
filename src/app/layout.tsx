import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Alukomfort - Nowoczesne Pergole Metalowe | Sprzedaż i Montaż',
  description: 'Alukomfort - Nowoczesne pergole metalowe dla Twojego domu. Sprzedaż i profesjonalny montaż pergol aluminiowych i stalowych.',
  keywords: 'pergole, pergole metalowe, pergole aluminiowe, pergole ogrodowe, taras, montaż pergol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
