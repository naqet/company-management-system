import { Roboto, Poppins } from "@next/font/google";
import "../../styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
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
  return (
    <html lang="en" className={`dark ${roboto.variable} ${poppins.variable}`}>
      <body>
        <main className="grid place-items-center h-screen">{children}</main>
      </body>
    </html>
  );
}
