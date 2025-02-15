import { AgentPanel } from "@/components/agent-panel";
import { AppSidebar } from "@/components/app-sidebar";
import { ClientPanel } from "@/components/client-panel";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SocketProvider } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useStore } from "@/useStore";
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, updateSidebarOpen } = useStore();

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={updateSidebarOpen}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <SocketProvider>{children}</SocketProvider>
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
            <Layout>
              <AgentPanel />
            </Layout>
          }
        />
        <Route
          path="/client"
          element={
            <Layout>
              <ClientPanel />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
