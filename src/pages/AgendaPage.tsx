import { useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Video,
  Megaphone,
  UserCheck,
} from "lucide-react";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

interface Compromisso {
  id: number;
  titulo: string;
  horario: string;
  duracao: string;
  tipo: "reuniao" | "visita" | "audiencia" | "atendimento";
  local?: string;
  dia: number;
}

interface Tarefa {
  id: number;
  titulo: string;
  responsavel: string;
  concluida: boolean;
}

const tipoConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  reuniao: { label: "Reunião", color: "bg-info text-info-foreground", icon: Video },
  visita: { label: "Visita", color: "bg-warning text-warning-foreground", icon: MapPin },
  audiencia: { label: "Audiência Pública", color: "bg-success text-success-foreground", icon: Megaphone },
  atendimento: { label: "Atendimento", color: "bg-primary text-primary-foreground", icon: UserCheck },
};

const mockCompromissos: Compromisso[] = [
  { id: 1, titulo: "Reunião com Secretário de Saúde", horario: "09:00", duracao: "1h", tipo: "reuniao", local: "Gabinete", dia: 9 },
  { id: 2, titulo: "Visita ao Bairro Vila Nova", horario: "11:00", duracao: "2h", tipo: "visita", local: "Vila Nova", dia: 9 },
  { id: 3, titulo: "Audiência Pública - Educação", horario: "14:00", duracao: "2h", tipo: "audiencia", local: "Câmara Municipal", dia: 10 },
  { id: 4, titulo: "Atendimento ao Cidadão", horario: "16:00", duracao: "2h", tipo: "atendimento", local: "Gabinete", dia: 10 },
  { id: 5, titulo: "Reunião da Comissão de Saúde", horario: "09:00", duracao: "1h30", tipo: "reuniao", local: "Câmara Municipal", dia: 11 },
  { id: 6, titulo: "Visita à Escola Municipal", horario: "14:00", duracao: "1h", tipo: "visita", local: "Jardim América", dia: 12 },
  { id: 7, titulo: "Reunião com Lideranças", horario: "10:00", duracao: "1h", tipo: "reuniao", local: "Gabinete", dia: 13 },
  { id: 8, titulo: "Audiência - Segurança Pública", horario: "15:00", duracao: "2h", tipo: "audiencia", local: "Câmara Municipal", dia: 14 },
];

const mockEquipe = [
  { nome: "João Assessor", cargo: "Assessor Parlamentar", status: "disponivel" },
  { nome: "Ana Paula", cargo: "Chefe de Gabinete", status: "em-campo" },
  { nome: "Carlos Mendes", cargo: "Assessor de Comunicação", status: "disponivel" },
  { nome: "Maria Clara", cargo: "Assessora Jurídica", status: "reuniao" },
];

const mockTarefas: Tarefa[] = [
  { id: 1, titulo: "Preparar ofício para Secretaria de Obras", responsavel: "João Assessor", concluida: false },
  { id: 2, titulo: "Agendar reunião com presidente da associação", responsavel: "Ana Paula", concluida: false },
  { id: 3, titulo: "Publicar nota sobre audiência pública", responsavel: "Carlos Mendes", concluida: true },
  { id: 4, titulo: "Revisar requerimento nº 045/2026", responsavel: "Maria Clara", concluida: true },
  { id: 5, titulo: "Confirmar presença evento beneficente", responsavel: "João Assessor", concluida: false },
];

const statusColors: Record<string, string> = {
  disponivel: "bg-success",
  "em-campo": "bg-warning",
  reuniao: "bg-info",
};

const AgendaPage = () => {
  const [selectedDay, setSelectedDay] = useState(10);
  const [tarefas, setTarefas] = useState(mockTarefas);

  const currentMonth = 1; // February 2026
  const currentYear = 2026;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const dayCompromissos = mockCompromissos.filter((c) => c.dia === selectedDay);

  const toggleTarefa = (id: number) => {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Agenda e Equipe</h1>
          <p className="text-sm text-muted-foreground">
            {meses[currentMonth]} de {currentYear}
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Compromisso
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="col-span-2 space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h3 className="font-display text-sm font-semibold">
                {meses[currentMonth]} {currentYear}
              </h3>
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {diasSemana.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const hasEvents = mockCompromissos.some((c) => c.dia === day);
                const isSelected = day === selectedDay;
                const isToday = day === 10;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(day)}
                    className={`relative rounded-lg p-2 text-sm transition-all hover:bg-muted ${
                      isSelected ? "bg-primary text-primary-foreground font-semibold" : isToday ? "bg-primary/10 font-medium" : ""
                    }`}
                  >
                    {day}
                    {hasEvents && !isSelected && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day detail */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-display text-sm font-semibold mb-4">
              Compromissos — {selectedDay} de {meses[currentMonth]}
            </h3>
            {dayCompromissos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum compromisso para este dia
              </p>
            ) : (
              <div className="space-y-3">
                {dayCompromissos.map((c) => {
                  const config = tipoConfig[c.tipo];
                  const Icon = config.icon;
                  return (
                    <div key={c.id} className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/30 transition-colors">
                      <div className={`rounded-lg p-2 ${config.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{c.titulo}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {c.horario} ({c.duracao})
                          </span>
                          {c.local && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {c.local}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Equipe */}
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-semibold">Equipe</h3>
            </div>
            <div className="space-y-3">
              {mockEquipe.map((m) => (
                <div key={m.nome} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {m.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${statusColors[m.status]}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.nome}</p>
                    <p className="text-[10px] text-muted-foreground">{m.cargo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tarefas */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-display text-sm font-semibold mb-4">Tarefas da Equipe</h3>
            <div className="space-y-2">
              {tarefas.map((t) => (
                <label
                  key={t.id}
                  className={`flex items-start gap-3 rounded-lg p-2.5 cursor-pointer hover:bg-muted/50 transition-colors ${
                    t.concluida ? "opacity-60" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={t.concluida}
                    onChange={() => toggleTarefa(t.id)}
                    className="mt-0.5 h-4 w-4 rounded border-2 border-border accent-primary"
                  />
                  <div>
                    <p className={`text-sm ${t.concluida ? "line-through text-muted-foreground" : "font-medium"}`}>
                      {t.titulo}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{t.responsavel}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
