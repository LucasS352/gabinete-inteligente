import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CRMEleitorado from "./pages/CRMEleitorado";
import Demandas from "./pages/Demandas";
import Geoprocessamento from "./pages/Geoprocessamento";
import AgendaPage from "./pages/AgendaPage";
import Comunicacao from "./pages/Comunicacao";
import Financeiro from "./pages/Financeiro";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/crm" element={<CRMEleitorado />} />
                  <Route path="/demandas" element={<Demandas />} />
                  <Route path="/geoprocessamento" element={<Geoprocessamento />} />
                  <Route path="/agenda" element={<AgendaPage />} />
                  <Route path="/comunicacao" element={<Comunicacao />} />
                  <Route path="/financeiro" element={<Financeiro />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
