import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronUp, House, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waste Management — Registo de tabaco" },
      { name: "description", content: "Registo privado de compras, consumo e custos de tabaco no iPhone." },
      { property: "og:title", content: "Waste Management" },
      { property: "og:description", content: "Acompanhe o consumo e as despesas de tabaco, de forma privada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#F4F4F6" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Waste Management" },
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/icon-180.png" },
    ],
  }),
  component: WasteManagement,
});

type Screen = "home" | "purchases" | "consumption-log" | "consult";
type Pack = { name: string; price: number; cigarettes: number; unit: number; shade: string };
type Purchase = Pack & { id: string; createdAt: string };
type Consumption = { id: string; createdAt: string; packName: string; packPrice: number; unitCost: number };
type ConfirmState = { kind: "consumption" | "purchase"; id: string } | null;

const PACKS: Pack[] = [
  { name: "Marlboro Classic", price: 6.2, cigarettes: 20, unit: 0.31, shade: "bg-pack-light" },
  { name: "Marlboro Box 22", price: 6.3, cigarettes: 22, unit: 0.286, shade: "bg-pack-medium" },
  { name: "Marlboro Box 26", price: 7, cigarettes: 26, unit: 0.269, shade: "bg-pack-dark" },
];
const DEFAULT_PACK: Pack = { name: "Marlboro Classic", price: 6.2, cigarettes: 20, unit: 0.31, shade: "bg-pack-light" };
const LIMITS = [10, 20, 50, 100];
const money = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
const dateTime = new Intl.DateTimeFormat("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
const shortDate = (date: Date) => date.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric" });
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function Toast({ message, close }: { message: string; close: () => void }) {
  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-stone-200/80 text-stone-800 text-sm font-medium animate-in fade-in zoom-in-95 duration-200 max-w-[320px] w-[90%]"
      style={{ top: '235px' }}
      role="status"
    >
      <span>{message}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-stone-400 hover:text-stone-700 p-0" 
        onClick={close} 
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

function HomeButton({ onClick }: { onClick: () => void }) {
  return <Button variant="ghost" className="home-button" onClick={onClick}><House />Home</Button>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return <Button variant="ghost" className="back-button" onClick={onClick}><ChevronLeft />Voltar</Button>;
}

function WasteManagement() {
  const [screen, setScreen] = useState<Screen>("home");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const [undoOpen, setUndoOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  useEffect(() => {
    try {
      setPurchases(JSON.parse(localStorage.getItem("wm-purchases") ?? "[]"));
      setConsumptions(JSON.parse(localStorage.getItem("wm-consumptions") ?? "[]"));
    } catch {
      setPurchases([]);
      setConsumptions([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("wm-purchases", JSON.stringify(purchases)); }, [purchases, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("wm-consumptions", JSON.stringify(consumptions)); }, [consumptions, hydrated]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message: string) => setToast(message);
  const activePack = purchases[0] ?? DEFAULT_PACK;

  const addPurchase = (pack: Pack) => {
    setPurchases((current) => [{ ...pack, id: makeId(), createdAt: new Date().toISOString() }, ...current]);
    notify(`${pack.name} registado.`);
  };

  const addConsumption = () => {
    setConsumptions((current) => [{ id: makeId(), createdAt: new Date().toISOString(), packName: activePack.name, packPrice: activePack.price, unitCost: activePack.unit }, ...current]);
    navigator.vibrate?.(35);
    notify("Consumo registado.");
  };

  const removeLast = () => {
    if (!consumptions.length) {
      notify("Ainda não existem consumos.");
      setUndoOpen(false);
      return;
    }
    setConsumptions((current) => current.slice(1));
    navigator.vibrate?.(50);
    notify("Último consumo removido.");
    setUndoOpen(false);
  };

  const confirmDelete = () => {
    if (!confirm) return;
    if (confirm.kind === "consumption") {
      setConsumptions((items) => items.filter((item) => item.id !== confirm.id));
      notify("Registo de consumo anulado.");
    } else {
      setPurchases((items) => items.filter((item) => item.id !== confirm.id));
      notify("Compra anulada e totais atualizados.");
    }
    setConfirm(null);
  };

  return (
    <main className="app-shell">
      {toast && <Toast message={toast} close={() => setToast("")} />}
      {screen === "home" && <HomeScreen onPurchase={() => setScreen("purchases")} onConsume={addConsumption} onConsult={() => setScreen("consult")} onUndo={() => setUndoOpen(true)} />}
      {screen === "purchases" && <PurchasesScreen purchases={purchases} onAdd={addPurchase} onDelete={(id) => setConfirm({ kind: "purchase", id })} onHome={() => setScreen("home")} />}
      {screen === "consumption-log" && <ConsumptionLog records={consumptions} onDelete={(id) => setConfirm({ kind: "consumption", id })} onDeleteMany={(ids) => { setConsumptions((items) => items.filter((item) => !ids.has(item.id))); notify("Registos selecionados eliminados."); }} onBack={() => setScreen("home")} onHome={() => setScreen("home")} />}
      {screen === "consult" && <ConsultScreen records={consumptions} onBack={() => setScreen("home")} onHome={() => setScreen("home")} />}

      <Dialog open={undoOpen} onOpenChange={setUndoOpen}>
        <DialogContent className="action-dialog">
          <DialogHeader><DialogTitle>Reverter</DialogTitle><DialogDescription>Escolha o que pretende fazer.</DialogDescription></DialogHeader>
          <DialogFooter className="dialog-pair">
            <Button variant="destructive" onClick={removeLast}>Remover Último</Button>
            <Button variant="outline" onClick={() => { setUndoOpen(false); setScreen("consumption-log"); }}>Ver Registos</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(confirm)} onOpenChange={(open) => { if (!open) setConfirm(null); }}>
        <DialogContent className="action-dialog">
          <DialogHeader>
            <DialogTitle>{confirm?.kind === "purchase" ? "Anular Compra" : "Anular Registo"}</DialogTitle>
            <DialogDescription>Esta ação atualiza permanentemente os seus totais.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="dialog-pair">
            <Button variant="destructive" onClick={confirmDelete}>{confirm?.kind === "purchase" ? "Confirmar" : "Anular Registo"}</Button>
            <Button variant="outline" onClick={() => setConfirm(null)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function HomeScreen({ onPurchase, onConsume, onConsult, onUndo }: { onPurchase: () => void; onConsume: () => void; onConsult: () => void; onUndo: () => void }) {
  return (
    <section className="home-screen">
      <header className="logo-header"><Logo /></header>
      <div className="home-actions">
        <Button className="primary-action bg-purchase text-purchase-foreground hover:bg-purchase/90" onClick={onPurchase}>Registar Compra</Button>
        <Button className="primary-action bg-consume text-consume-foreground hover:bg-consume/90" onClick={onConsume}>Registar Consumo</Button>
      </div>
      <nav className="bottom-nav">
        <Button variant="ghost" className="home-nav-action consult-button" onClick={onConsult}>Consultar</Button>
        <Button variant="ghost" className="home-nav-action undo-button" onClick={onUndo}>Reverter</Button>
      </nav>
    </section>
  );
}

function PurchasesScreen({ purchases, onAdd, onDelete, onHome }: { purchases: Purchase[]; onAdd: (pack: Pack) => void; onDelete: (id: string) => void; onHome: () => void }) {
  const [showHistory, setShowHistory] = useState(false);
  const [editing, setEditing] = useState(false);
  const total = purchases.reduce((sum, item) => sum + item.price, 0);
  return (
    <section className="content-screen">
      <PageHeader title={showHistory ? "Histórico de Compras" : "Registar Compra"} />
      {!showHistory ? (
        <>
          <div className="pack-list">
            {PACKS.map((pack) => (
              <Button key={pack.name} className={`pack-card ${pack.shade}`} onClick={() => onAdd(pack)}>
                <span className="pack-title">{pack.name}</span>
                <span className="pack-price">{money.format(pack.price)}</span>
                <span className="pack-details">{pack.cigarettes} cig · {pack.unit.toFixed(3)} €/cig</span>
              </Button>
            ))}
          </div>
          <Button variant="outline" className="history-link" onClick={() => setShowHistory(true)}>Consultar Histórico</Button>
          <footer className="subpage-footer">
            <BackButton onClick={onHome} />
            <HomeButton onClick={onHome} />
            <span aria-hidden="true" />
          </footer>
        </>
      ) : (
        <>
          <div className="summary-strip"><span>Total investido</span><strong>{money.format(total)}</strong></div>
          <div className="purchase-history">
            {purchases.length ? purchases.map((item) => (
              <article key={item.id} className="purchase-row">
                <div><strong>{item.name}</strong><span>{dateTime.format(new Date(item.createdAt))}</span></div>
                <div className="row-value"><b>{money.format(item.price)}</b>{editing && <Button variant="ghost" size="icon" className="delete-x" aria-label={`Eliminar ${item.name}`} onClick={() => onDelete(item.id)}><X /></Button>}</div>
              </article>
            )) : <p className="empty-state">Ainda não existem compras registadas.</p>}
          </div>
          <footer className="subpage-footer">
            <BackButton onClick={() => setShowHistory(false)} />
            <HomeButton onClick={onHome} />
            <Button variant="ghost" className="cancel-button" onClick={() => setEditing((value) => !value)}>{editing ? "Concluir" : "Anular"}</Button>
          </footer>
        </>
      )}
    </section>
  );
}

function ConsumptionLog({ records, onDelete, onDeleteMany, onBack, onHome }: { records: Consumption[]; onDelete: (id: string) => void; onDeleteMany: (ids: Set<string>) => void; onBack: () => void; onHome: () => void }) {
  const [limit, setLimit] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const visible = records.slice(0, limit);
  const index = LIMITS.indexOf(limit);
  const toggle = (id: string) => setSelected((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  return (
    <section className="content-screen wide-screen">
      <PageHeader title="Registos de Consumo" subtitle={`${records.length} ${records.length === 1 ? "registo" : "registos"}`} />
      <div className="table-wrap">
        <table>
          <thead><tr><th aria-label="Selecionar" /><th>Dia e Hora</th><th>Maço Registado</th><th>Valor do Maço</th><th>Custo Unitário</th><th aria-label="Ações" /></tr></thead>
          <tbody>
            {visible.map((item) => <tr key={item.id}>
              <td><Checkbox checked={selected.has(item.id)} onCheckedChange={() => toggle(item.id)} aria-label={`Selecionar registo de ${dateTime.format(new Date(item.createdAt))}`} /></td>
              <td>{dateTime.format(new Date(item.createdAt))}</td><td>{item.packName}</td><td>{money.format(item.packPrice)}</td><td>{item.unitCost.toFixed(3)} €</td>
              <td><Button variant="ghost" size="icon" className="delete-x" onClick={() => onDelete(item.id)} aria-label="Anular registo"><X /></Button></td>
            </tr>)}
          </tbody>
        </table>
        {!records.length && <p className="empty-state">Ainda não existem consumos registados.</p>}
      </div>
      {selected.size > 0 && <Button variant="destructive" className="batch-delete" onClick={() => { onDeleteMany(selected); setSelected(new Set()); }}>Eliminar selecionados ({selected.size})</Button>}
      <div className="pagination-controls">
        {index > 0 && <Button variant="outline" onClick={() => setLimit(LIMITS[index - 1] ?? 10)}><ChevronUp />Reduzir</Button>}
        <span>A mostrar até {limit}</span>
        {index < LIMITS.length - 1 && <Button variant="outline" onClick={() => setLimit(LIMITS[index + 1] ?? 100)}>Expandir<ChevronDown /></Button>}
      </div>
      <footer className="subpage-footer">
        <BackButton onClick={onBack} />
        <HomeButton onClick={onHome} />
        <span aria-hidden="true" />
      </footer>
    </section>
  );
}

type Period = 1 | 7 | 14 | 30 | 90 | "custom";
function ConsultScreen({ records, onBack, onHome }: { records: Consumption[]; onBack: () => void; onHome: () => void }) {
  const [period, setPeriod] = useState<Period>(7);
  const today = new Date();
  const [customStart, setCustomStart] = useState(today.toISOString().slice(0, 10));
  const [customEnd, setCustomEnd] = useState(today.toISOString().slice(0, 10));
  const data = useMemo(() => {
    const end = period === "custom" ? new Date(`${customEnd}T23:59:59`) : new Date();
    const start = period === "custom" ? new Date(`${customStart}T00:00:00`) : new Date(end);
    if (period !== "custom") start.setDate(end.getDate() - period + 1);
    start.setHours(0, 0, 0, 0);
    const filtered = records.filter((item) => { const d = new Date(item.createdAt); return d >= start && d <= end; });
    if (period === 1) {
      return { start, end, points: Array.from({ length: 24 }, (_, hour) => ({ label: `${hour.toString().padStart(2, "0")}h`, value: filtered.filter((item) => new Date(item.createdAt).getHours() === hour).length })), daily: true };
    }
    const dayCount = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1);
    return { start, end, points: Array.from({ length: dayCount }, (_, offset) => { const date = new Date(start); date.setDate(start.getDate() + offset); return { label: date.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" }), value: filtered.filter((item) => new Date(item.createdAt).toDateString() === date.toDateString()).length }; }), daily: false };
  }, [records, period, customStart, customEnd]);
  const total = data.points.reduce((sum, point) => sum + point.value, 0);
  const average = data.points.length ? total / data.points.length : 0;
  const scaleMax = Math.max(...data.points.map((point) => point.value), average, 1);
  const plotHeight = 190;
  const segmentGap = Math.min(3, 95 / scaleMax);
  const segmentHeight = Math.max(.5, (plotHeight - segmentGap * (scaleMax - 1)) / scaleMax);
  const chartStyle = {
    "--plot-height": `${plotHeight}px`,
    "--segment-gap": `${segmentGap}px`,
    "--segment-height": `${segmentHeight}px`,
  } as CSSProperties;
  const title = period === 1 ? "Hoje" : period === 7 ? "Últimos 7 dias" : period === 14 ? "Últimos 14 dias" : period === 30 ? "Últimos 30 dias" : period === 90 ? "Últimos 3 meses" : "Período personalizado";
  return (
    <section className="content-screen consult-screen">
      <PageHeader
  title={title}
  subtitle={
    shortDate(data.start) === shortDate(data.end)
      ? shortDate(data.start)
      : `${shortDate(data.start)} – ${shortDate(data.end)}`
  }
/>
      <div className="filter-scroll">
        {([["Hoje", 1], ["7 dias", 7], ["14 dias", 14], ["30 dias", 30], ["3 meses", 90]] as [string, Period][]).map(([label, value]) => <Button key={label} variant={period === value ? "default" : "outline"} onClick={() => setPeriod(value)}>{label}</Button>)}
        <Button variant={period === "custom" ? "default" : "outline"} onClick={() => setPeriod("custom")}><CalendarDays />Calendário</Button>
      </div>
      {period === "custom" && <div className="date-pickers"><label>De<input type="date" value={customStart} max={customEnd} onChange={(e) => setCustomStart(e.target.value)} /></label><label>Até<input type="date" value={customEnd} min={customStart} onChange={(e) => setCustomEnd(e.target.value)} /></label></div>}
      <div className="totals"><div><span>Cigarros</span><strong>{total}</strong></div><div><span>Custo</span><strong>{money.format(records.filter((item) => { const d = new Date(item.createdAt); return d >= data.start && d <= data.end; }).reduce((sum, item) => sum + item.unitCost, 0))}</strong></div></div>
      <div className="chart-card" style={chartStyle}>
        <div className={`chart ${data.points.length > 31 ? "dense" : ""}`}>
          {!data.daily && <div className="average-line" style={{ bottom: `calc(var(--chart-label-height) + ${(average / scaleMax) * plotHeight}px)` }}><span>Média {average.toFixed(1)}</span></div>}
          {data.points.map((point, pointIndex) => <div className="bar-column" key={`${point.label}-${pointIndex}`}>
            <strong>{point.value || ""}</strong>
            {data.daily ? <div className="segment-stack">{Array.from({ length: point.value }, (_, i) => <i key={i} />)}</div> : <div className="solid-bar" style={{ height: `${Math.max(point.value ? 8 : 0, (point.value / scaleMax) * plotHeight)}px` }} />}
            <span>{data.points.length > 35 ? (pointIndex % 10 === 0 ? point.label : "") : data.points.length > 16 ? (pointIndex % 3 === 0 ? point.label : "") : point.label}</span>
          </div>)}
        </div>
      </div>
      <footer className="subpage-footer">
        <BackButton onClick={onBack} />
        <HomeButton onClick={onHome} />
        <span aria-hidden="true" />
      </footer>
    </section>
  );
}