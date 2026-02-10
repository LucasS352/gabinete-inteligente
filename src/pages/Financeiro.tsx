import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Wallet,
  PiggyBank,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const resumo = [
  { label: "Receita do Mês", value: "R$ 45.800", change: "+8%", up: true, icon: Wallet },
  { label: "Despesas do Mês", value: "R$ 32.150", change: "+3%", up: true, icon: Receipt },
  { label: "Saldo Atual", value: "R$ 13.650", change: "+15%", up: true, icon: PiggyBank },
  { label: "Empenhos Pendentes", value: "R$ 8.200", change: "-12%", up: false, icon: FileText },
];

const despesasMes = [
  { mes: "Set", receita: 42000, despesa: 30000 },
  { mes: "Out", receita: 44000, despesa: 31500 },
  { mes: "Nov", receita: 43500, despesa: 29800 },
  { mes: "Dez", receita: 46000, despesa: 35000 },
  { mes: "Jan", receita: 45000, despesa: 33200 },
  { mes: "Fev", receita: 45800, despesa: 32150 },
];

const despesasCategoria = [
  { categoria: "Pessoal", valor: 15000 },
  { categoria: "Material", valor: 6500 },
  { categoria: "Serviços", valor: 4800 },
  { categoria: "Comunicação", valor: 3200 },
  { categoria: "Eventos", valor: 2650 },
];

const ultimasTransacoes = [
  { descricao: "Pagamento assessores", valor: -8500, data: "08/02/2026", tipo: "despesa" },
  { descricao: "Verba de gabinete", valor: 25000, data: "05/02/2026", tipo: "receita" },
  { descricao: "Material de escritório", valor: -1200, data: "04/02/2026", tipo: "despesa" },
  { descricao: "Impressão de materiais", valor: -2800, data: "03/02/2026", tipo: "despesa" },
  { descricao: "Ressarcimento CEAP", valor: 20800, data: "01/02/2026", tipo: "receita" },
];

const Financeiro = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Financeiro</h1>
        <p className="text-sm text-muted-foreground">Controle de receitas e despesas do gabinete</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resumo.map((item, i) => (
          <div key={item.label} className="card-hover rounded-xl border bg-card p-5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-2xl font-bold">{item.value}</span>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${item.up ? "text-success" : "text-destructive"}`}>
                {item.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Evolução */}
        <div className="col-span-2 rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Receita vs Despesa</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={despesasMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 45%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
              <Bar dataKey="receita" fill="hsl(213, 90%, 52%)" radius={[4, 4, 0, 0]} name="Receita" />
              <Bar dataKey="despesa" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Despesa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Despesas por categoria */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Despesas por Categoria</h3>
          <div className="space-y-3">
            {despesasCategoria.map((cat) => {
              const percent = Math.round((cat.valor / 32150) * 100);
              return (
                <div key={cat.categoria}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{cat.categoria}</span>
                    <span className="font-medium">R$ {cat.valor.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Últimas transações */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-display text-sm font-semibold">Últimas Transações</h3>
        </div>
        <div className="divide-y">
          {ultimasTransacoes.map((t, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${t.tipo === "receita" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {t.tipo === "receita" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.descricao}</p>
                  <p className="text-[10px] text-muted-foreground">{t.data}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${t.tipo === "receita" ? "text-success" : "text-destructive"}`}>
                {t.tipo === "receita" ? "+" : ""}R$ {Math.abs(t.valor).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
