import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface Demanda {
  id: number;
  cidadao: string;
  bairro: string;
  categoria: string;
  prioridade: "Urgente" | "Média" | "Baixa";
  descricao: string;
  data: string;
  status: "solicitada" | "andamento" | "concluida";
}

const mockDemandas: Demanda[] = [
  { id: 1, cidadao: "Maria da Silva", bairro: "Centro", categoria: "Saúde", prioridade: "Urgente", descricao: "Solicitação de consulta especializada", data: "08/02/2026", status: "solicitada" },
  { id: 2, cidadao: "José Santos", bairro: "Vila Nova", categoria: "Infraestrutura", prioridade: "Média", descricao: "Buraco na Rua das Flores", data: "07/02/2026", status: "solicitada" },
  { id: 3, cidadao: "Ana Oliveira", bairro: "Jardim América", categoria: "Educação", prioridade: "Baixa", descricao: "Vaga em creche municipal", data: "06/02/2026", status: "solicitada" },
  { id: 4, cidadao: "Carlos Souza", bairro: "São José", categoria: "Saúde", prioridade: "Urgente", descricao: "Falta de medicamentos no posto", data: "05/02/2026", status: "andamento" },
  { id: 5, cidadao: "Francisca Lima", bairro: "Boa Vista", categoria: "Segurança", prioridade: "Média", descricao: "Iluminação pública precária", data: "04/02/2026", status: "andamento" },
  { id: 6, cidadao: "Pedro Almeida", bairro: "Centro", categoria: "Infraestrutura", prioridade: "Urgente", descricao: "Alagamento na Av. Principal", data: "03/02/2026", status: "andamento" },
  { id: 7, cidadao: "Lúcia Ferreira", bairro: "Vila Nova", categoria: "Saúde", prioridade: "Baixa", descricao: "Campanha de vacinação", data: "02/02/2026", status: "concluida" },
  { id: 8, cidadao: "Roberto Costa", bairro: "São José", categoria: "Educação", prioridade: "Média", descricao: "Reforma da quadra esportiva", data: "01/02/2026", status: "concluida" },
  { id: 9, cidadao: "Teresa Martins", bairro: "Boa Vista", categoria: "Assistência Social", prioridade: "Urgente", descricao: "Cesta básica emergencial", data: "31/01/2026", status: "concluida" },
  { id: 10, cidadao: "Fernando Gomes", bairro: "Centro", categoria: "Infraestrutura", prioridade: "Baixa", descricao: "Poda de árvores", data: "30/01/2026", status: "concluida" },
];

const prioridadeBadge: Record<string, string> = {
  Urgente: "bg-destructive text-destructive-foreground",
  Média: "bg-warning text-warning-foreground",
  Baixa: "bg-success text-success-foreground",
};

const categoriaBadge: Record<string, string> = {
  "Saúde": "bg-info/10 text-info border border-info/20",
  "Educação": "bg-success/10 text-success border border-success/20",
  "Infraestrutura": "bg-warning/10 text-warning border border-warning/20",
  "Segurança": "bg-destructive/10 text-destructive border border-destructive/20",
  "Assistência Social": "bg-primary/10 text-primary border border-primary/20",
};

const columns = [
  { key: "solicitada" as const, label: "Solicitada", color: "bg-kanban-solicitada", icon: Clock },
  { key: "andamento" as const, label: "Em Andamento", color: "bg-kanban-andamento", icon: ArrowRight },
  { key: "concluida" as const, label: "Concluída", color: "bg-kanban-concluida", icon: CheckCircle2 },
];

const Demandas = () => {
  const [demandas, setDemandas] = useState(mockDemandas);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = demandas.filter(
    (d) =>
      d.cidadao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColumnDemandas = (status: Demanda["status"]) =>
    filtered.filter((d) => d.status === status);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Gestão de Demandas</h1>
          <p className="text-sm text-muted-foreground">
            {demandas.length} demandas registradas
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            <FileText className="h-4 w-4" />
            Gerar Ofício
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Nova Demanda
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar demanda..."
          className="h-10 w-full rounded-lg border bg-card pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 gap-5 lg:grid-cols-3 min-h-0">
        {columns.map((col) => {
          const items = getColumnDemandas(col.key);
          return (
            <div key={col.key} className="flex flex-col rounded-xl border bg-muted/30 overflow-hidden">
              {/* Column header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-semibold">{col.label}</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {items.length}
                  </span>
                </div>
                <button className="rounded-md p-1 hover:bg-muted transition-colors">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                {items.map((demanda, i) => (
                  <div
                    key={demanda.id}
                    className="kanban-card rounded-lg border bg-card p-4 animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{demanda.cidadao}</p>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <MapPin className="h-2.5 w-2.5" />
                            {demanda.bairro}
                          </div>
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${prioridadeBadge[demanda.prioridade]}`}>
                        {demanda.prioridade}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {demanda.descricao}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoriaBadge[demanda.categoria] || "bg-muted text-muted-foreground"}`}>
                        {demanda.categoria}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{demanda.data}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Demandas;
