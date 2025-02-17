import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Navbar />
      <div className="rounded-lg w-full h-[calc(100vh-64px)] px-4 py-4">
        {children}
      </div>
    </main>
  );
};

export { Layout };
