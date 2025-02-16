import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { AppSidebar } from "@/components/app-sidebar";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SocketProvider } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AgentPanel } from "@/features/agent-panel/agent-panel";
import { Navbar } from "@/features/widget/components/navbar";
import { Widget } from "@/features/widget/components/widget";
import { Landing } from "@/landing";
import { ThemeProvider } from "@/theme-provider";
import { useLayoutStore } from "@/useLayoutStore";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const Layout = ({ children }: { children: ReactNode }) => {
  const { sidebarOpen, updateSidebarOpen } = useLayoutStore();

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={updateSidebarOpen}>
      <AppSidebar />
      <main className="w-full h-[calc(100vh-64px)] m-8">
        {/* <SidebarTrigger /> */}
        <AppBreadcrumbs />
        <div className="rounded-xl size-full">{children}</div>
      </main>
    </SidebarProvider>
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
