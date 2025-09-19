import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import Providers from "./providers"; // SessionProvider wrapper

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        {/* ✅ Wrap everything in Providers so Sidebar + main get Session context */}
        <Providers>
          <div className="flex overflow-x-hidden min-h-screen">
            <Sidebar /> {/* client component */}
            <main className="flex-1 container mx-auto py-8">{children}</main>
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
