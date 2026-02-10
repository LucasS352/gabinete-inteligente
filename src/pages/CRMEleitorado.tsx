import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Tag,
  ChevronLeft,
  ChevronRight,
  Users,
  X,
} from "lucide-react";

interface Eleitor {
  id: number;
  nome: string;
  bairro: string;
  telefone: string;
  email: string;
  tags: string[];
  lideranca: string;
  ultimoContato: string;
}

const tagColors: Record<string, string> = {
  "Saúde": "bg-info/10 text-info",
  "Educação": "bg-success/10 text-success",
  "Infraestrutura": "bg-warning/10 text-warning",
  "Segurança": "bg-destructive/10 text-destructive",
  "Assistência Social": "bg-primary/10 text-primary",
  "Esporte": "bg-info/10 text-info",
  "Cultura": "bg-success/10 text-success",
};

const mockEleitores: Eleitor[] = [
  { id: 1, nome: "Maria da Silva", bairro: "Centro", telefone: "(11) 98765-4321", email: "maria@email.com", tags: ["Saúde", "Educação"], lideranca: "Líder Comunitária", ultimoContato: "05/02/2026" },
  { id: 2, nome: "José Santos", bairro: "Vila Nova", telefone: "(11) 91234-5678", email: "jose@email.com", tags: ["Infraestrutura"], lideranca: "Presidente Assoc. Bairro", ultimoContato: "03/02/2026" },
  { id: 3, nome: "Ana Oliveira", bairro: "Jardim América", telefone: "(11) 99876-5432", email: "ana@email.com", tags: ["Saúde", "Assistência Social"], lideranca: "-", ultimoContato: "01/02/2026" },
  { id: 4, nome: "Carlos Souza", bairro: "São José", telefone: "(11) 97654-3210", email: "carlos@email.com", tags: ["Educação", "Esporte"], lideranca: "Coordenador Escola", ultimoContato: "08/02/2026" },
  { id: 5, nome: "Francisca Lima", bairro: "Boa Vista", telefone: "(11) 93456-7890", email: "francisca@email.com", tags: ["Segurança"], lideranca: "Líder Comunitária", ultimoContato: "07/02/2026" },
  { id: 6, nome: "Pedro Almeida", bairro: "Centro", telefone: "(11) 92345-6789", email: "pedro@email.com", tags: ["Infraestrutura", "Cultura"], lideranca: "-", ultimoContato: "06/02/2026" },
  { id: 7, nome: "Lúcia Ferreira", bairro: "Vila Nova", telefone: "(11) 94567-8901", email: "lucia@email.com", tags: ["Saúde"], lideranca: "Agente de Saúde", ultimoContato: "04/02/2026" },
  { id: 8, nome: "Roberto Costa", bairro: "São José", telefone: "(11) 95678-9012", email: "roberto@email.com", tags: ["Educação", "Assistência Social"], lideranca: "-", ultimoContato: "02/02/2026" },
];

const CRMEleitorado = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEleitor, setSelectedEleitor] = useState<Eleitor | null>(null);
  const [filtroTag, setFiltroTag] = useState<string | null>(null);

  const filtered = mockEleitores.filter((e) => {
    const matchSearch = e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.bairro.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTag = !filtroTag || e.tags.includes(filtroTag);
    return matchSearch && matchTag;
  });

  const allTags = [...new Set(mockEleitores.flatMap((e) => e.tags))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">CRM Eleitorado</h1>
          <p className="text-sm text-muted-foreground">
            {mockEleitores.length} eleitores cadastrados
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Cadastro
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou bairro..."
            className="h-10 w-full rounded-lg border bg-card pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFiltroTag(filtroTag === tag ? null : tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filtroTag === tag
                  ? "bg-primary text-primary-foreground"
                  : tagColors[tag] || "bg-muted text-muted-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 rounded-xl border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bairro</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Telefone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Liderança</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Último Contato</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((eleitor) => (
                  <tr
                    key={eleitor.id}
                    className={`border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer ${
                      selectedEleitor?.id === eleitor.id ? "bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedEleitor(eleitor)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {eleitor.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{eleitor.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{eleitor.bairro}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{eleitor.telefone}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {eleitor.tags.map((tag) => (
                          <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColors[tag] || "bg-muted text-muted-foreground"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{eleitor.lideranca}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{eleitor.ultimoContato}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="rounded-md p-1.5 hover:bg-muted transition-colors" title="Visualizar">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button className="rounded-md p-1.5 hover:bg-muted transition-colors" title="Editar">
                          <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-4 py-3">
            <span className="text-xs text-muted-foreground">
              Mostrando {filtered.length} de {mockEleitores.length} eleitores
            </span>
            <div className="flex items-center gap-1">
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md">1</span>
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selectedEleitor && (
          <div className="w-80 shrink-0 rounded-xl border bg-card p-5 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-semibold">Perfil 360°</h3>
              <button onClick={() => setSelectedEleitor(null)} className="rounded-md p-1 hover:bg-muted transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="text-center mb-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-primary">
                  {selectedEleitor.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <h4 className="font-medium">{selectedEleitor.nome}</h4>
              <p className="text-xs text-muted-foreground">{selectedEleitor.bairro}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{selectedEleitor.telefone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{selectedEleitor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{selectedEleitor.bairro}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{selectedEleitor.lideranca}</span>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tags</h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedEleitor.tags.map((tag) => (
                  <span key={tag} className={`rounded-full px-2.5 py-1 text-xs font-medium ${tagColors[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Histórico Recente</h5>
              <div className="space-y-2">
                {["Demanda de Saúde registrada", "Contato via WhatsApp", "Participou de audiência pública"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMEleitorado;
