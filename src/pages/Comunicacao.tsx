import { useState } from "react";
import {
  MessageSquare,
  Send,
  Plus,
  Users,
  Tag,
  BarChart3,
  CheckCircle2,
  Clock,
  Eye,
  FileEdit,
  Trash2,
  Search,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Campanha {
  id: number;
  titulo: string;
  status: "enviada" | "agendada" | "rascunho";
  destinatarios: number;
  entregues: number;
  lidas: number;
  data: string;
  tags: string[];
}

const mockCampanhas: Campanha[] = [
  { id: 1, titulo: "Convite Audiência Pública - Educação", status: "enviada", destinatarios: 1250, entregues: 1180, lidas: 890, data: "08/02/2026", tags: ["Educação", "Centro"] },
  { id: 2, titulo: "Prestação de Contas - Janeiro", status: "enviada", destinatarios: 3200, entregues: 3050, lidas: 2100, data: "05/02/2026", tags: ["Geral"] },
  { id: 3, titulo: "Mutirão de Saúde - Boa Vista", status: "agendada", destinatarios: 800, entregues: 0, lidas: 0, data: "15/02/2026", tags: ["Saúde", "Boa Vista"] },
  { id: 4, titulo: "Inauguração Quadra Esportiva", status: "agendada", destinatarios: 1500, entregues: 0, lidas: 0, data: "20/02/2026", tags: ["Esporte", "São José"] },
  { id: 5, titulo: "Boletim Semanal do Mandato", status: "rascunho", destinatarios: 0, entregues: 0, lidas: 0, data: "-", tags: ["Geral"] },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Send }> = {
  enviada: { label: "Enviada", color: "bg-success/10 text-success", icon: CheckCircle2 },
  agendada: { label: "Agendada", color: "bg-info/10 text-info", icon: Clock },
  rascunho: { label: "Rascunho", color: "bg-muted text-muted-foreground", icon: FileEdit },
};

const statsGlobal = [
  { label: "Mensagens Enviadas", value: "55.280" },
  { label: "Taxa de Entrega", value: "94.5%" },
  { label: "Taxa de Leitura", value: "68.2%" },
  { label: "Contatos Ativos", value: "4.850" },
];

const segmentacaoData = [
  { name: "Saúde", value: 1200, color: "#3b82f6" },
  { name: "Educação", value: 980, color: "#10b981" },
  { name: "Infraestrutura", value: 850, color: "#f59e0b" },
  { name: "Geral", value: 1820, color: "#8b5cf6" },
];

const Comunicacao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);

  const filtered = mockCampanhas.filter((c) => {
    const matchSearch = c.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !filtroStatus || c.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Comunicação</h1>
          <p className="text-sm text-muted-foreground">
            Disparos e campanhas via WhatsApp
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Nova Campanha
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsGlobal.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4 card-hover">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="font-display text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Campaign list */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar campanha..."
                className="h-10 w-full rounded-lg border bg-card pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex gap-1">
              {Object.entries(statusConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setFiltroStatus(filtroStatus === key ? null : key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    filtroStatus === key ? "bg-primary text-primary-foreground" : config.color
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((campanha) => {
              const config = statusConfig[campanha.status];
              const Icon = config.icon;
              const taxaEntrega = campanha.destinatarios > 0 ? Math.round((campanha.entregues / campanha.destinatarios) * 100) : 0;
              const taxaLeitura = campanha.entregues > 0 ? Math.round((campanha.lidas / campanha.entregues) * 100) : 0;

              return (
                <div key={campanha.id} className="rounded-xl border bg-card p-4 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-lg p-2 ${config.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{campanha.titulo}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{campanha.data}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                        <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    {campanha.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {campanha.status === "enviada" && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <p className="text-lg font-bold">{campanha.destinatarios.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">Destinatários</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-success">{taxaEntrega}%</p>
                        <p className="text-[10px] text-muted-foreground">Entregues</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-info">{taxaLeitura}%</p>
                        <p className="text-[10px] text-muted-foreground">Lidas</p>
                      </div>
                    </div>
                  )}

                  {campanha.status === "agendada" && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{campanha.destinatarios.toLocaleString()} destinatários selecionados</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-semibold">Segmentação por Tag</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={segmentacaoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {segmentacaoData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {segmentacaoData.map((seg) => (
                <div key={seg.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span>{seg.name}</span>
                  </div>
                  <span className="font-medium">{seg.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-display text-sm font-semibold mb-3">Dicas</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Segmente por tags para maior engajamento</p>
              <p>• Envie em horários de maior leitura (8h-10h)</p>
              <p>• Use mensagens personalizadas com nome</p>
              <p>• Acompanhe as taxas de abertura</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comunicacao;
