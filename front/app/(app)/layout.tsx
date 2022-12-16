import { cookies } from "next/headers";
import { Roboto, Poppins } from "@next/font/google";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "300",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const lightMode = nextCookies.has("lightMode");
  return (
    <html
      lang="en"
      className={`${!lightMode && "dark"} ${roboto.variable} ${
        poppins.variable
      }`}
    >
      <body>
        <Header />
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
