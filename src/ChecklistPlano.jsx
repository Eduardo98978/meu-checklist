import { useEffect, useMemo, useState } from "react";
import { ChevronDown, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";

// ===================== DADOS ===================== //

const plano = [
  {
    dia: "Segunda (Peito + Tríceps + Abdômen)",
    treino: [
      "Supino reto (máquina ou barra) – 3x10–12",
      "Supino inclinado (halteres ou máquina) – 3x10–12",
      "Peck Deck (voador) – 3x12–15",
      "Tríceps polia alta (barra ou corda) – 3x12–15",
      "Tríceps banco (no banco, peso do corpo ou com anilha no colo) – 3x10–12",
      "Abdominal reto (no colchonete ou máquina) – 3x15–20",
      "Prancha abdominal – 3x30s–1min",
    ],
    refeicoes: {
      "Café da manhã": ["Pão (1–2 fatias) + 2 ovos mexidos", "Leite (250 ml)", "Fruta (banana/maçã)"],
      "Pré-treino": ["Banana com 1–2 colheres de aveia OU pão com ovo"],
      "Almoço / Pós-treino": ["Arroz + feijão", "Carne/Frango (1 porção)", "Salada/legumes", "+ 1 ovo cozido"],
      "Café da tarde": ["Iogurte natural + fruta OU banana + amendoim"],
      Janta: ["Arroz + feijão", "Carne/Frango/Peixe", "Salada"],
      Ceia: ["Leite OU iogurte", "Fruta (se tiver fome)"],
    },
  },
  {
    treino: [
      "Agachamento livre – 3x15",
      "Flexão de braço – 3x10 (ajoelhado se for pesado)",
      "Prancha – 3x30–45s",
      "Afundo (avanço) – 3x12 por perna",
      "Polichinelo – 3x30s",
    ],
    refeicoes: {
      "Café da manhã": ["Pão + 1 ovo", "Leite (250 ml)", "Fruta"],
      "Almoço": ["Arroz + feijão", "Frango/Carne", "Salada/legumes"],
      "Café da tarde": ["Fruta + iogurte OU banana + aveia"],
      Janta: ["Arroz + feijão", "Carne/Frango", "Salada"],
      Ceia: ["Leite + pão/queijo OU iogurte"],
    },
  },
  {
    dia: "Quarta",
    treino: [
      "Puxada frontal na polia (pegada aberta) – 3x10–12",
      "Remada baixa (máquina ou polia) – 3x10–12",
      "Remada unilateral (halter) – 3x10 cada lado",
      "Rosca direta (halteres ou barra W) – 3x12",
      "Rosca martelo (halteres) – 3x12",
      "Elevação de pernas (na barra ou colchonete) – 3x12–15",
      "Prancha lateral – 3x30s cada lado",
    ],
    refeicoes: {
      "Café da manhã": ["Tapioca (2 col.) + 2 ovos", "Leite (250 ml)", "Fruta"],
      "Pré-treino": ["Banana com aveia OU pão com ovo"],
      "Almoço / Pós-treino": ["Arroz + feijão", "Carne/Frango (1 porção)", "Salada/legumes", "+ 1–2 ovos"],
      "Café da tarde": ["Sanduíche natural (pão + frango desfiado/atum + salada)"],
      Janta: ["Arroz + feijão", "Carne/Frango", "Salada"],
      Ceia: ["Iogurte natural + fruta"],
    },
  },
  {
    dia: "Quinta",
    treino: [
      "Agachamento com pausa (2s embaixo) – 3x12",
      "Flexão com variação (normal/inclinada) – 3x10–12",
      "Prancha com toque no ombro – 3x12 cada lado",
      "Afundo caminhando – 3x12 por perna",
      "Burpee leve (sem salto alto) – 3x8–10",
    ],
    refeicoes: {
      "Café da manhã": ["Pão integral + 1 ovo", "Fruta", "Leite (250 ml)"],
      "Almoço": ["Arroz + feijão", "Frango/Carne", "Salada/legumes", "+ 1 ovo"],
      "Café da tarde": ["Fruta + bolacha simples OU banana + amendoim"],
      Janta: ["Arroz + feijão", "Carne/Frango", "Salada + ovo"],
      Ceia: ["Leite OU iogurte + fruta"],
    },
  },
  {
    dia: "Sexta",
    treino: [
      "Agachamento no Smith (guiado) – 3x10–12",
      "Leg Press 45° – 3x12–15",
      "Cadeira extensora (quadríceps) – 3x12–15",
      "Mesa flexora (posterior de coxa) – 3x12–15",
      "Elevação lateral (halteres, ombros) – 3x12",
      "Desenvolvimento de ombro (halteres ou máquina) – 3x10–12",
      "Abdominal bicicleta (no colchonete) – 3x15–20",
    ],
    refeicoes: {
      "Café da manhã": ["Pão + 1–2 ovos", "Fruta", "Leite (250 ml)"],
      "Pré-treino": ["Banana com aveia OU pão com ovo"],
      "Almoço / Pós-treino": ["Arroz + feijão", "Carne/Frango (1 porção)", "Salada/legumes", "+ 1 ovo"],
      "Café da tarde": ["Fruta + amendoim/castanhas"],
      Janta: ["Refeição livre (hambúrguer/pizza/lanche)"],
      Ceia: ["Iogurte OU fruta (se tiver fome)"],
    },
  },
  {
    dia: "Sábado",
    treino: [
      "Polichinelo – 30s",
      "Agachamento rápido – 30s",
      "Prancha – 30s",
      "Corrida parada (joelho alto) – 30s",
      "Repetir circuito 4–5 voltas (30s exercício / 30s descanso)",
    ],
    refeicoes: {
      "Café da manhã": ["Omelete (2 ovos + queijo)", "Fruta", "Leite (250 ml)"],
      "Almoço": ["Arroz + feijão", "Frango/ovo", "Salada/legumes"],
      "Café da tarde": ["Fruta + iogurte OU sanduíche natural pequeno"],
      Janta: ["Refeição livre (hambúrguer/pizza)"],
      Ceia: ["Pode pular se estiver satisfeito"],
    },
  },
  {
    dia: "Domingo",
    treino: [
      "Caminhada leve 20–30min",
      "Alongamento geral 10–15min",
    ],
    refeicoes: {
      "Café da manhã": ["Fruta + aveia", "2 ovos (mexidos/cozidos)"],
      "Almoço": ["Arroz + feijão", "Carne/Frango/Peixe", "Salada/legumes"],
      "Café da tarde": ["Fruta + iogurte"],
      Janta: ["Arroz + feijão", "Carne/Frango", "Salada"],
      Ceia: ["Leite + fruta (opcional)"],
    },
  },
];

// ===================== UTILS =====================
const fmt = (d) => d.toISOString().slice(0, 10);
const keyForDate = (d) => `plano-checks-v2:${fmt(d)}`;

/**
 * Gera todos os IDs de check do dia.
 * - Se treino for array => 1 id por exercício
 * - Se treino for string => 1 id único
 * - Refeições => 1 id por item
 */
function idsDoDia(diaPlan) {
  if (!diaPlan) return [];
  const ids = [];

  if (Array.isArray(diaPlan.treino)) {
    diaPlan.treino.forEach((_, i) => ids.push(`${diaPlan.dia}|treino|${i}`));
  } else if (diaPlan.treino) {
    ids.push(`${diaPlan.dia}|treino`);
  }

  Object.entries(diaPlan.refeicoes || {}).forEach(([sec, items]) => {
    items.forEach((_, i) => ids.push(`${diaPlan.dia}|${sec}|${i}`));
  });

  return ids;
}

// ===================== COMPONENTES =====================
function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function ToggleItem({ id, label, checked, onChange, disabled }) {
  return (
    <label
      className={`flex items-start gap-3 cursor-pointer select-none py-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 rounded border-gray-300"
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onChange(id)}
      />
      <span
        className={`leading-6 ${
          checked ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-100"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

// ===================== CALENDÁRIO =====================
function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay()); // domingo
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      row.push(date);
    }
    weeks.push(row);
  }
  return weeks;
}

function DayCell({ date, currentMonth, selectedDate, today, onSelect, getPct, lockedCondition }) {
  const isToday = fmt(date) === fmt(today);
  const isSelected = fmt(date) === fmt(selectedDate);
  const inMonth = date.getMonth() === currentMonth;
  const isPast = lockedCondition(date);
  const pct = getPct(date);

  return (
    <button
      onClick={() => onSelect(date)}
      className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl border text-sm transition
        ${inMonth ? "" : "opacity-40"}
        ${isSelected ? "border-indigo-500 ring-2 ring-indigo-400/40" : "border-zinc-200 dark:border-zinc-800"}
        ${isPast ? "bg-zinc-900/40" : "bg-white dark:bg-zinc-900"}
      `}
    >
      <span className={`${isToday ? "font-bold" : ""}`}>{date.getDate()}</span>
      {pct != null && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-1 bg-indigo-500" style={{ width: `${pct}%` }} />
        </div>
      )}
    </button>
  );
}

function CalendarModal({ open, onClose, selectedDate, setSelectedDate, today, pctForDate, lockedCondition }) {
  if (!open) return null;
  const [view, setView] = useState(new Date(selectedDate));
  const weeks = getMonthMatrix(view.getFullYear(), view.getMonth());
  const nextMonth = () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));
  const prevMonth = () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  const selectAndClose = (d) => {
    setSelectedDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onClose} className="text-sm px-3 py-1 rounded-full border dark:border-zinc-700">Fechar</button>
          <div className="font-semibold">{view.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="rounded-xl border px-2 py-1"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={nextMonth} className="rounded-xl border px-2 py-1"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-xs text-center text-gray-500 dark:text-gray-400 mb-1">
          {["D","S","T","Q","Q","S","S"].map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weeks.flat().map((d, i) => (
            <DayCell
              key={i}
              date={d}
              currentMonth={view.getMonth()}
              selectedDate={selectedDate}
              today={today}
              onSelect={selectAndClose}
              getPct={pctForDate}
              lockedCondition={lockedCondition}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== APP =====================
export default function ChecklistPlano() {
  // ===== Tema =====
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  // ===== Datas =====
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const [selectedDate, setSelectedDate] = useState(today);

  // ===== UI =====
  const [openCal, setOpenCal] = useState(false);

  const [checks, setChecks] = useState({});
  const storageKey = keyForDate(selectedDate);

  // Carrega do localStorage
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try { setChecks(JSON.parse(raw)); } catch {}
    } else {
      setChecks({});
    }
  }, [storageKey]);

  // Salva no localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checks));
  }, [checks, storageKey]);

  const toggle = (id) => setChecks((c) => ({ ...c, [id]: !c[id] }));
  const resetDay = () => setChecks({});

  // Seleciona o plano do dia pela ordem: [Seg, Ter, Qua, Qui, Sex, Sáb, Dom]
  const idsDoDiaSelecionado = () => {
    const map = {0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5};
    return (typeof plano !== "undefined" && plano[map[selectedDate.getDay()]]) || null;
  };
  const planoDoDia = idsDoDiaSelecionado();

  const statsDia = (d) => {
    const ids = idsDoDia(d);
    const total = ids.length;
    const feitos = ids.filter((i) => checks[i]).length;
    return { total, feitos, pct: total ? Math.round((feitos / total) * 100) : 0 };
  };

  const pctForDate = (d) => {
    const raw = localStorage.getItem(keyForDate(d));
    if (!raw) return 0;
    const stored = JSON.parse(raw);
    const map = {0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5};
    const dayPlan = (typeof plano !== "undefined" && plano[map[d.getDay()]]) || null;
    const ids = idsDoDia(dayPlan);
    const done = ids.filter((id) => stored[id]).length;
    return ids.length ? Math.round((done / ids.length) * 100) : 0;
  };

  const lockedCondition = (d) => d < today;

  const stats = planoDoDia ? statsDia(planoDoDia) : { total: 0, feitos: 0, pct: 0 };
  const treinoResumo = planoDoDia
    ? (Array.isArray(planoDoDia.treino) ? planoDoDia.treino.join(" • ") : (planoDoDia.treino || ""))
    : "";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold">Plano Semanal • Força & Massa</h1>
            <p className="text-gray-600 dark:text-gray-400">Checklist do dia, com histórico por calendário.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setOpenCal(true)} className="px-3 py-1 border rounded-xl">Calendário</button>
            <button onClick={() => setSelectedDate(today)} className="px-3 py-1 border rounded-xl">Hoje</button>
          </div>
        </header>

        {planoDoDia ? (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                {planoDoDia.dia}, {selectedDate.toLocaleDateString()}
              </h2>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{treinoResumo}</div>
              <div className="h-2 w-full bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
                <div className="h-2 bg-indigo-500" style={{ width: `${stats.pct}%` }} />
              </div>
              <div className="mt-1 text-xs">{stats.feitos}/{stats.total} concluídos ({stats.pct}%)</div>
            </div>

            {/* Treino: um checkbox por exercício quando treino for array */}
            <Section title="Treino">
              {Array.isArray(planoDoDia.treino) ? (
                planoDoDia.treino.map((ex, i) => (
                  <ToggleItem
                    key={i}
                    id={`${planoDoDia.dia}|treino|${i}`}
                    label={ex}
                    checked={!!checks[`${planoDoDia.dia}|treino|${i}`]}
                    onChange={toggle}
                    disabled={lockedCondition(selectedDate)}
                  />
                ))
              ) : (
                <ToggleItem
                  id={`${planoDoDia.dia}|treino`}
                  label={planoDoDia.treino}
                  checked={!!checks[`${planoDoDia.dia}|treino`]}
                  onChange={toggle}
                  disabled={lockedCondition(selectedDate)}
                />
              )}
            </Section>

            {/* Refeições */}
            <div className="mt-3 space-y-3">
              {Object.entries(planoDoDia.refeicoes || {}).map(([sec, items]) => (
                <Section key={sec} title={sec}>
                  {items.map((it, i) => (
                    <ToggleItem
                      key={i}
                      id={`${planoDoDia.dia}|${sec}|${i}`}
                      label={it}
                      checked={!!checks[`${planoDoDia.dia}|${sec}|${i}`]}
                      onChange={toggle}
                      disabled={lockedCondition(selectedDate)}
                    />
                  ))}
                </Section>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={resetDay} className="flex items-center gap-2 px-4 py-2 border rounded-xl">
                <RefreshCcw className="h-4 w-4" /> Reset do dia
              </button>
            </div>
          </>
        ) : (
          <div className="text-sm text-red-500">
            ⚠️ Cole o <code>const plano = [ ... ]</code> no topo deste arquivo para exibir o checklist.
          </div>
        )}
      </div>

      <CalendarModal
        open={openCal}
        onClose={() => setOpenCal(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        today={today}
        pctForDate={pctForDate}
        lockedCondition={lockedCondition}
      />
    </div>
  );
}
