import { useState } from "react";
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Save,
  Upload,
} from "lucide-react";

const tabs = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "gabinete", label: "Gabinete", icon: Building },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "seguranca", label: "Segurança", icon: Shield },
];

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <div className="flex gap-6">
        {/* Tab nav */}
        <div className="w-56 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border bg-card p-6">
          {activeTab === "perfil" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-display text-lg font-semibold">Dados do Perfil</h2>

              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">VP</span>
                </div>
                <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />
                  Alterar Foto
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Nome Completo</label>
                  <input defaultValue="Vereador Paulo Silva" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">E-mail</label>
                  <input defaultValue="paulo@camara.gov.br" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Telefone</label>
                  <input defaultValue="(11) 3333-4444" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Partido</label>
                  <input defaultValue="PSD" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Cargo</label>
                  <input defaultValue="Vereador - Câmara Municipal" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </button>
            </div>
          )}

          {activeTab === "gabinete" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-display text-lg font-semibold">Dados do Gabinete</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Nome do Gabinete</label>
                  <input defaultValue="Gabinete Vereador Paulo Silva" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Legislatura</label>
                  <input defaultValue="2025-2028" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Endereço</label>
                  <input defaultValue="Câmara Municipal, Sala 205" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Cidade</label>
                  <input defaultValue="São Paulo" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">UF</label>
                  <input defaultValue="SP" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </button>
            </div>
          )}

          {activeTab === "notificacoes" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-display text-lg font-semibold">Preferências de Notificação</h2>
              <div className="space-y-4">
                {[
                  { label: "Novas demandas", desc: "Receber notificação quando uma nova demanda for cadastrada" },
                  { label: "Demandas urgentes", desc: "Alertas para demandas com prioridade urgente" },
                  { label: "Aniversariantes", desc: "Lembrete diário de aniversariantes" },
                  { label: "Prazos vencendo", desc: "Alertas de demandas com prazo próximo" },
                  { label: "Relatórios semanais", desc: "Resumo semanal por e-mail" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "seguranca" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-display text-lg font-semibold">Segurança</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Senha Atual</label>
                  <input type="password" placeholder="••••••••" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Nova Senha</label>
                  <input type="password" placeholder="••••••••" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Confirmar Nova Senha</label>
                  <input type="password" placeholder="••••••••" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Key className="h-4 w-4" />
                  Alterar Senha
                </button>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3">Sessões Ativas</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">Chrome • Windows</p>
                      <p className="text-xs text-muted-foreground">Última atividade: agora</p>
                    </div>
                    <span className="text-xs text-success font-medium">Atual</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">Safari • iPhone</p>
                      <p className="text-xs text-muted-foreground">Última atividade: 2h atrás</p>
                    </div>
                    <button className="text-xs text-destructive font-medium hover:underline">Encerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
