import "../styles/globals.css";
import Footer from "./Footer";
import Header from "./Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="font-mono bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-1000 ease-in-out">
        <div className="flex flex-col h-screen justify-between">
          <div className="flex-grow">
            <Header />
            <div className="container sm:px-16 md:px-32 lg:px-64">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
