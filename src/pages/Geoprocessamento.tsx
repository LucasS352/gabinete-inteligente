import { useState } from "react";
import {
  MapPin,
  Flag,
  Filter,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BairroData {
  id: number;
  nome: string;
  demandas: number;
  urgentes: number;
  categorias: { nome: string; qtd: number }[];
  coordenadas: { top: string; left: string };
}

const bairros: BairroData[] = [
  { id: 1, nome: "Centro", demandas: 45, urgentes: 8, categorias: [{ nome: "Saúde", qtd: 15 }, { nome: "Infraestrutura", qtd: 18 }, { nome: "Educação", qtd: 12 }], coordenadas: { top: "40%", left: "48%" } },
  { id: 2, nome: "Vila Nova", demandas: 38, urgentes: 5, categorias: [{ nome: "Saúde", qtd: 12 }, { nome: "Segurança", qtd: 14 }, { nome: "Educação", qtd: 12 }], coordenadas: { top: "25%", left: "65%" } },
  { id: 3, nome: "Jardim América", demandas: 32, urgentes: 3, categorias: [{ nome: "Infraestrutura", qtd: 20 }, { nome: "Saúde", qtd: 7 }, { nome: "Cultura", qtd: 5 }], coordenadas: { top: "55%", left: "30%" } },
  { id: 4, nome: "São José", demandas: 28, urgentes: 6, categorias: [{ nome: "Educação", qtd: 15 }, { nome: "Saúde", qtd: 8 }, { nome: "Segurança", qtd: 5 }], coordenadas: { top: "30%", left: "25%" } },
  { id: 5, nome: "Boa Vista", demandas: 22, urgentes: 2, categorias: [{ nome: "Infraestrutura", qtd: 12 }, { nome: "Assistência Social", qtd: 6 }, { nome: "Saúde", qtd: 4 }], coordenadas: { top: "65%", left: "70%" } },
  { id: 6, nome: "Parque Industrial", demandas: 18, urgentes: 1, categorias: [{ nome: "Infraestrutura", qtd: 10 }, { nome: "Segurança", qtd: 5 }, { nome: "Saúde", qtd: 3 }], coordenadas: { top: "18%", left: "42%" } },
  { id: 7, nome: "Lago Azul", demandas: 15, urgentes: 4, categorias: [{ nome: "Saúde", qtd: 8 }, { nome: "Educação", qtd: 4 }, { nome: "Assistência Social", qtd: 3 }], coordenadas: { top: "72%", left: "52%" } },
  { id: 8, nome: "Monte Verde", demandas: 12, urgentes: 0, categorias: [{ nome: "Infraestrutura", qtd: 6 }, { nome: "Cultura", qtd: 4 }, { nome: "Esporte", qtd: 2 }], coordenadas: { top: "48%", left: "80%" } },
];

const chartData = bairros
  .sort((a, b) => b.demandas - a.demandas)
  .map((b) => ({ nome: b.nome, demandas: b.demandas, urgentes: b.urgentes }));

const getFlagColor = (demandas: number) => {
  if (demandas >= 40) return "text-destructive";
  if (demandas >= 25) return "text-warning";
  return "text-success";
};

const getFlagSize = (demandas: number) => {
  if (demandas >= 40) return "h-7 w-7";
  if (demandas >= 25) return "h-6 w-6";
  return "h-5 w-5";
};

const Geoprocessamento = () => {
  const [selectedBairro, setSelectedBairro] = useState<BairroData | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);

  const categorias = [...new Set(bairros.flatMap((b) => b.categorias.map((c) => c.nome)))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Geoprocessamento</h1>
          <p className="text-sm text-muted-foreground">
            Mapeamento de demandas por região
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Flag className="h-3.5 w-3.5 text-destructive" /> Alta
            <Flag className="h-3.5 w-3.5 text-warning" /> Média
            <Flag className="h-3.5 w-3.5 text-success" /> Baixa
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Categoria:</span>
        <button
          onClick={() => setFiltroCategoria(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !filtroCategoria ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtroCategoria === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Map area */}
        <div className="col-span-2 rounded-xl border bg-card overflow-hidden">
          <div className="relative h-[500px] bg-muted/30 overflow-hidden">
            {/* Grid lines for map feel */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div key={`h${i}`} className="absolute w-full border-b border-foreground/20" style={{ top: `${(i + 1) * 10}%` }} />
              ))}
              {[...Array(10)].map((_, i) => (
                <div key={`v${i}`} className="absolute h-full border-r border-foreground/20" style={{ left: `${(i + 1) * 10}%` }} />
              ))}
            </div>

            {/* Street-like lines */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeWidth="2" />
              <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="currentColor" strokeWidth="2" />
              <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="currentColor" strokeWidth="1" />
              <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="currentColor" strokeWidth="1" />
              <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="currentColor" strokeWidth="1" />
              <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="currentColor" strokeWidth="1" />
              <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="currentColor" strokeWidth="1" />
              <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Bairro flags */}
            {bairros.map((bairro) => (
              <button
                key={bairro.id}
                className={`absolute group transition-all duration-200 hover:scale-125 z-10 ${
                  selectedBairro?.id === bairro.id ? "scale-125 z-20" : ""
                }`}
                style={{ top: bairro.coordenadas.top, left: bairro.coordenadas.left, transform: "translate(-50%, -50%)" }}
                onClick={() => setSelectedBairro(bairro)}
              >
                <div className="relative">
                  <MapPin className={`${getFlagSize(bairro.demandas)} ${getFlagColor(bairro.demandas)} drop-shadow-md`} fill="currentColor" fillOpacity={0.2} />
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-foreground text-background flex items-center justify-center">
                    <span className="text-[9px] font-bold">{bairro.demandas}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30">
                    <div className="rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-lg">
                      {bairro.nome}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Map label */}
            <div className="absolute bottom-3 left-3 rounded-lg bg-card/80 backdrop-blur-sm border px-3 py-1.5">
              <span className="text-[10px] text-muted-foreground">Mapa Esquemático • {bairros.length} bairros mapeados</span>
            </div>
          </div>
        </div>

        {/* Sidebar panel */}
        <div className="space-y-4">
          {/* Selected bairro detail */}
          {selectedBairro ? (
            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className={`h-5 w-5 ${getFlagColor(selectedBairro.demandas)}`} />
                <h3 className="font-display text-lg font-bold">{selectedBairro.nome}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-2xl font-bold">{selectedBairro.demandas}</p>
                  <p className="text-[10px] text-muted-foreground">Total</p>
                </div>
                <div className="rounded-lg bg-destructive/10 p-3 text-center">
                  <p className="text-2xl font-bold text-destructive">{selectedBairro.urgentes}</p>
                  <p className="text-[10px] text-muted-foreground">Urgentes</p>
                </div>
              </div>

              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Por Categoria</h4>
              <div className="space-y-2">
                {selectedBairro.categorias.map((cat) => (
                  <div key={cat.nome} className="flex items-center justify-between">
                    <span className="text-sm">{cat.nome}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${(cat.qtd / selectedBairro.demandas) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-6 text-right">{cat.qtd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-5 text-center">
              <MapPin className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                Clique em um marcador no mapa para ver os detalhes do bairro
              </p>
            </div>
          )}

          {/* Ranking */}
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-semibold">Ranking por Bairro</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis dataKey="nome" type="category" tick={{ fontSize: 10 }} stroke="hsl(215, 15%, 45%)" width={90} />
                <Tooltip />
                <Bar dataKey="demandas" fill="hsl(213, 90%, 52%)" radius={[0, 4, 4, 0]} name="Total" />
                <Bar dataKey="urgentes" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} name="Urgentes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geoprocessamento;
