import Providers from "../providers"

export const metadata = {
  title: 'User dashboard',
  description: 'Get your interview history here',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  )
}
