import "./globals.css";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Background } from "@/components/Background";
import { MiniPlayerBar } from "@/components/MiniPlayerBar";

export const metadata: Metadata = {
  title: "Calm Studio — Beta",
  description: "Music-player style prototype for curated hypnosis + coaching + sound.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Background>
          <TopBar />
          {children}
          <MiniPlayerBar />
        </Background>
      </body>
    </html>
  );
}
