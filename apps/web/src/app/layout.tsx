export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Inter, sans-serif", margin: 0, background: "#0a0d14", color: "#f8fbff" }}>{children}</body>
    </html>
  );
}
