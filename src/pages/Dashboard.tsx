import {
  LayoutDashboard,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cake,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpis = [
  { label: "Atendimentos Concluídos", value: "342", change: "+12%", up: true, color: "kpi-1", icon: CheckCircle2 },
  { label: "Pendentes", value: "58", change: "-5%", up: false, color: "kpi-2", icon: Clock },
  { label: "Demandas Urgentes", value: "12", change: "+3", up: true, color: "kpi-3", icon: AlertTriangle },
  { label: "Eleitores Cadastrados", value: "4.850", change: "+180", up: true, color: "kpi-4", icon: Users },
];

const demandasMes = [
  { mes: "Jul", total: 42, concluidas: 35 },
  { mes: "Ago", total: 55, concluidas: 48 },
  { mes: "Set", total: 38, concluidas: 30 },
  { mes: "Out", total: 62, concluidas: 50 },
  { mes: "Nov", total: 48, concluidas: 40 },
  { mes: "Dez", total: 70, concluidas: 55 },
  { mes: "Jan", total: 58, concluidas: 45 },
  { mes: "Fev", total: 65, concluidas: 52 },
];

const categorias = [
  { name: "Saúde", value: 35, color: "#3b82f6" },
  { name: "Infraestrutura", value: 28, color: "#f59e0b" },
  { name: "Educação", value: 20, color: "#10b981" },
  { name: "Segurança", value: 12, color: "#ef4444" },
  { name: "Outros", value: 5, color: "#8b5cf6" },
];

const bairrosDemandas = [
  { bairro: "Centro", demandas: 45 },
  { bairro: "Jardim América", demandas: 38 },
  { bairro: "Vila Nova", demandas: 32 },
  { bairro: "São José", demandas: 28 },
  { bairro: "Boa Vista", demandas: 22 },
];

const aniversariantes = [
  { nome: "Maria Silva", bairro: "Centro" },
  { nome: "José Santos", bairro: "Vila Nova" },
  { nome: "Ana Oliveira", bairro: "Jardim América" },
  { nome: "Carlos Souza", bairro: "São José" },
];

const compromissos = [
  { titulo: "Reunião com Secretário de Saúde", horario: "09:00", tipo: "reuniao" },
  { titulo: "Visita ao Bairro Vila Nova", horario: "11:00", tipo: "visita" },
  { titulo: "Audiência Pública - Educação", horario: "14:00", tipo: "audiencia" },
  { titulo: "Atendimento ao Cidadão", horario: "16:00", tipo: "atendimento" },
];

const tipoColors: Record<string, string> = {
  reuniao: "bg-info",
  visita: "bg-warning",
  audiencia: "bg-success",
  atendimento: "bg-primary",
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral do mandato • {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className="card-hover kpi-glow rounded-xl border bg-card p-5 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </span>
              <div className={`rounded-lg p-2 bg-${kpi.color}/10`}>
                <kpi.icon className={`h-4 w-4 text-${kpi.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-3xl font-bold animate-count-up">
                {kpi.value}
              </span>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Demandas por mês */}
        <div className="col-span-2 rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Demandas por Mês</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={demandasMes}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(213, 90%, 52%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(213, 90%, 52%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradConcluidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(215, 20%, 88%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area type="monotone" dataKey="total" stroke="hsl(213, 90%, 52%)" fill="url(#gradTotal)" strokeWidth={2} name="Total" />
              <Area type="monotone" dataKey="concluidas" stroke="hsl(152, 60%, 42%)" fill="url(#gradConcluidas)" strokeWidth={2} name="Concluídas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Categorias */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Por Categoria</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categorias} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {categorias.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {categorias.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}</span>
                </div>
                <span className="font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top bairros */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Top Bairros</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bairrosDemandas} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 45%)" />
              <YAxis dataKey="bairro" type="category" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 45%)" width={100} />
              <Bar dataKey="demandas" fill="hsl(213, 90%, 52%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Aniversariantes */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cake className="h-4 w-4 text-warning" />
            <h3 className="font-display text-sm font-semibold">Aniversariantes do Dia</h3>
          </div>
          <div className="space-y-3">
            {aniversariantes.map((a) => (
              <div key={a.nome} className="flex items-center gap-3 rounded-lg p-2.5 bg-muted/50 hover:bg-muted transition-colors">
                <div className="h-9 w-9 rounded-full bg-warning/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-warning">
                    {a.nome.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{a.nome}</p>
                  <p className="text-xs text-muted-foreground">{a.bairro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos compromissos */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold">Próximos Compromissos</h3>
          </div>
          <div className="space-y-3">
            {compromissos.map((c) => (
              <div key={c.titulo} className="flex items-start gap-3 rounded-lg p-2.5 bg-muted/50 hover:bg-muted transition-colors">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${tipoColors[c.tipo]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.titulo}</p>
                  <p className="text-xs text-muted-foreground">{c.horario}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
