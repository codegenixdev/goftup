import { Layout } from "@/components/layout";
import { SocketProvider } from "@/components/socket-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Admin } from "@/features/admin/components/page";
import { LandingDemo } from "@/features/widget/components/landing-demo";
import { Widget } from "@/features/widget/components/widget";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const App = () => {
  const { t } = useTranslation();
  useEffect(() => {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  return (
    <SocketProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/"
                element={
                  <>
                    <LandingDemo />
                    <Widget />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </SocketProvider>
  );
};

export { App };
