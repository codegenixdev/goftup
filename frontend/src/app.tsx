import { SocketProvider } from "@/components/socket-context";
import { AgentPanel } from "@/features/agent-panel/agent-panel";
import { Navbar } from "@/features/widget/components/navbar";
import { Widget } from "@/features/widget/components/widget";
import { Landing } from "@/landing";
import { ThemeProvider } from "@/theme-provider";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-[calc(100vh-64px)] container mx-auto m-6">
      {/* <Navbar /> */}
      <div className="rounded-xl size-full">{children}</div>
    </main>
  );
};

const App = () => {
  const { t } = useTranslation();

  useEffect(() => {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  return (
    <SocketProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin"
              element={
                <Layout>
                  <AgentPanel />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Landing />
                  <Widget />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SocketProvider>
  );
};

export { App };
