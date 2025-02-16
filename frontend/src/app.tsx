import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { AppSidebar } from "@/components/app-sidebar";
import { ClientPanel } from "@/components/client-panel";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SocketProvider } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AgentPanel } from "@/features/agent-panel/agent-panel";
import { useStore } from "@/useStore";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex gap-4">
        <Button onClick={() => navigate("/agent")}>{t("admin")}</Button>
        <Button onClick={() => navigate("/client")}>{t("client")}</Button>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  const { sidebarOpen, updateSidebarOpen } = useStore();

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/agent"
          element={
            <SocketProvider>
              <Layout>
                <AgentPanel />
              </Layout>
            </SocketProvider>
          }
        />
        <Route
          path="/client"
          element={
            <SocketProvider>
              <ClientPanel />
            </SocketProvider>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
