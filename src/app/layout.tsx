export const metadata = {
  title: 'To Sql',
  description: 'Translate natural lenguage to sql queries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/change.png" />
      </head>
      <body id="my-body" style={{margin: 0, padding: 0}}>
          {children}
        </body>
    </html>
  )
}
