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
    <main>
      <Navbar />
      <div className="rounded-lg w-full h-[calc(100vh-80px)] px-4">
        {children}
      </div>
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
                <Layout>
                  <Landing />
                  <Widget />
                </Layout>
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
