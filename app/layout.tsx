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
      <head>
        <title>NPTEL Exam Prep</title>
        <meta name="theme-color" content="#ff0000"></meta>
      </head>
      <body className="bg-gray-100 font-mono transition-colors duration-1000 ease-in-out dark:bg-gray-900 dark:text-white">
        <div className="flex h-screen flex-1 flex-col justify-between">
          <div>
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
