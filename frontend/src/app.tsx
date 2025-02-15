import { AgentPanel } from "@/components/agent-panel";
import { AppSidebar } from "@/components/app-sidebar";
import { ClientPanel } from "@/components/client-panel";
import { SocketProvider } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <Button onClick={() => navigate("/agent")}>Join as Agent</Button>
      <Button onClick={() => navigate("/client")}>Join as Client</Button>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
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
