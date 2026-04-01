import { useState, type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ── Icons (inline SVG) ──
const icons = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  research: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
  coi: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>,
  apps: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  shield: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
  bell: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  logout: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  menu: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  alertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  clock: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  check: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
  fileWarning: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  download: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  plus: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  edit: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>,
  send: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  filter: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  users: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  lock: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  building: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  layers: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  trendUp: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>,
  trendDown: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,17 13.5,8.5 8.5,13.5 2,7"/><polyline points="16,17 22,17 22,11"/></svg>,
  arrowRight: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  sparkle: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>,
  calendar: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>,
};

// ── Mini sparkline ──
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const w = 80, h = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return <svg width={w} height={h} className="opacity-60"><polyline fill="none" stroke={color} strokeWidth="2" points={points} /></svg>;
}

// ── Donut chart ──
function DonutChart({ segments, size = 120 }: { segments: { value: number; color: string; label: string }[]; size?: number }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const r = 42, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  const arcs = segments.reduce<
    Array<{ value: number; color: string; label: string; dash: number; offset: number }>
  >((acc, seg) => {
    const dash = circ * (seg.value / total);
    const previous = acc[acc.length - 1];
    const offset = previous ? previous.offset + previous.dash : 0;
    return [...acc, { ...seg, dash, offset }];
  }, []);
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
        {arcs.map((seg, i) => {
          return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="12" strokeDasharray={`${seg.dash} ${circ - seg.dash}`} strokeDashoffset={-seg.offset} transform={`rotate(-90 ${cx} ${cy})`} className="transition-all duration-700" />;
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground text-xl font-bold">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">合計</text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full" style={{ background: seg.color }} />{seg.label} ({seg.value})
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HBar ──
function HBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}件</span></div>
      <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${(value / max) * 100}%`, background: color }} /></div>
    </div>
  );
}

type Page = "dashboard" | "research" | "coi" | "applications" | "settings";
const navItems: { id: Page; label: string; icon: ReactNode }[] = [
  { id: "dashboard", label: "ダッシュボード", icon: icons.dashboard },
  { id: "research", label: "研究一覧", icon: icons.research },
  { id: "coi", label: "COI個人申告", icon: icons.coi },
  { id: "applications", label: "申請管理", icon: icons.apps },
  { id: "settings", label: "システム管理", icon: icons.settings },
];

function SidebarContent({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 flex items-center gap-3 border-b">
        <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">{icons.shield}</div>
        <div><p className="font-bold text-sm tracking-tight">COI Management</p><p className="text-[10px] text-muted-foreground">利益相反管理システム</p></div>
      </div>
      <nav className="flex-1 p-3 space-y-1">{navItems.map(item=><button key={item.id} onClick={()=>navigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${page===item.id?"bg-primary text-primary-foreground shadow-md shadow-primary/20":"text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{item.icon}{item.label}</button>)}</nav>
      <div className="p-4 border-t"><div className="rounded-lg bg-muted/50 p-3"><p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">現在の年度</p><p className="text-lg font-bold mt-0.5">2026年度</p><p className="text-[10px] text-muted-foreground mt-1">申告期間: 2026/01/01 - 2026/12/31</p></div></div>
    </div>
  );
}

// ══════════════════════════════════════
// Dashboard
// ══════════════════════════════════════
function DashboardPage() {
  const stats = [
    { label: "未申告", value: 2, icon: icons.alertTriangle, color: "hsl(4 80% 72%)", bg: "bg-red-50", trend: "+1", up: true, spark: [1,1,2,1,2,2,2] },
    { label: "審査中", value: 5, icon: icons.clock, color: "hsl(189 55% 55%)", bg: "bg-cyan-50", trend: "-2", up: false, spark: [8,7,6,7,5,5,5] },
    { label: "要注意", value: 1, icon: icons.fileWarning, color: "hsl(40 95% 50%)", bg: "bg-amber-50", trend: "0", up: false, spark: [2,1,3,1,1,0,1] },
    { label: "承認済", value: 12, icon: icons.check, color: "hsl(145 60% 34%)", bg: "bg-emerald-50", trend: "+3", up: true, spark: [5,6,7,8,9,10,12] },
  ];
  const activities = [
    { id: 1, type: "COI申告", status: "審査中", date: "2026/02/25", detail: "2026年度 定期申告", v: "secondary" as const },
    { id: 2, type: "研究登録", status: "承認済", date: "2026/02/20", detail: "AI創薬における副作用予測モデルの研究", v: "default" as const },
    { id: 3, type: "アラート", status: "要注意", date: "2026/02/18", detail: "〇〇製薬 - 講演料が基準額を超過", v: "destructive" as const },
    { id: 4, type: "研究登録", status: "承認済", date: "2026/02/15", detail: "新規抗がん剤XYZ 臨床第II相試験", v: "default" as const },
  ];
  const timeline = [
    { date: "2026/02/25", event: "定期申告を提出", color: "bg-primary" },
    { date: "2026/02/20", event: "AI創薬研究が承認", color: "bg-emerald-500" },
    { date: "2026/02/18", event: "金額超過アラート発生", color: "bg-destructive" },
    { date: "2026/02/10", event: "ABC治験のCOI申告依頼", color: "bg-secondary" },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight text-primary">ダッシュボード</h1><p className="text-sm text-muted-foreground mt-1">現在のCOI申告状況とタスクの概要</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-l-4 overflow-hidden" style={{ borderLeftColor: s.color }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className="text-3xl font-bold mt-1 tracking-tight">{s.value}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-emerald-600" : "text-muted-foreground"}`}>{s.up ? icons.trendUp : icons.trendDown} {s.trend}</span>
                    <span className="text-[10px] text-muted-foreground">vs 先月</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-xl ${s.bg} transition-transform group-hover:scale-110`} style={{ color: s.color }}>{s.icon}</div>
              </div>
              <div className="mt-3 flex justify-end"><Sparkline data={s.spark} color={s.color} /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1"><CardHeader className="pb-2"><CardTitle className="text-base">ステータス内訳</CardTitle></CardHeader><CardContent><DonutChart segments={[{ value: 12, color: "hsl(145 60% 34%)", label: "承認済" },{ value: 5, color: "hsl(189 55% 55%)", label: "審査中" },{ value: 2, color: "hsl(4 80% 72%)", label: "未申告" },{ value: 1, color: "hsl(40 95% 50%)", label: "要注意" }]} /></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader className="pb-3"><div className="flex items-center justify-between"><CardTitle className="text-base">あなたへのタスク</CardTitle><Badge variant="outline" className="text-[10px]">2件 未対応</Badge></div></CardHeader>
          <CardContent className="space-y-3">
            <div className="relative overflow-hidden rounded-xl border border-destructive/20 bg-gradient-to-r from-red-50 to-transparent p-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative">
                <div><div className="flex items-center gap-2 mb-1"><Badge variant="destructive" className="text-[10px] px-1.5">期限間近</Badge><span className="text-[11px] text-muted-foreground flex items-center gap-1">{icons.calendar} 2026/03/31</span></div><p className="font-semibold text-sm">2026年度 COI定期申告</p><p className="text-xs text-muted-foreground mt-0.5">年次の利益相反状況を申告してください</p></div>
                <Button size="sm" className="shrink-0 self-start">提出する {icons.arrowRight}</Button>
              </div>
              <Progress value={75} className="mt-3 h-1.5" /><p className="text-[10px] text-muted-foreground mt-1">進捗 75% — あと3項目</p>
            </div>
            <div className="rounded-xl border p-4 bg-gradient-to-r from-sky-50/60 to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div><Badge variant="secondary" className="text-[10px] px-1.5 mb-1">新規</Badge><p className="font-semibold text-sm">新規研究「ABC治験」のCOI申告</p><p className="text-xs text-muted-foreground mt-0.5">研究開始前に完了してください</p></div>
                <Button variant="outline" size="sm" className="shrink-0 self-start">開始</Button>
              </div>
            </div>
            <div className="rounded-xl border p-4 opacity-60"><Badge className="text-[10px] px-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-1">完了</Badge><p className="font-semibold text-sm line-through">2025年度 追加報告書の提出</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3"><CardHeader className="pb-3"><CardTitle className="text-base">最近のアクティビティ</CardTitle></CardHeader>
          <CardContent>
            <div className="hidden sm:block"><Table><TableHeader><TableRow><TableHead className="text-xs">種類</TableHead><TableHead className="text-xs">詳細</TableHead><TableHead className="text-xs">日付</TableHead><TableHead className="text-xs">ステータス</TableHead></TableRow></TableHeader><TableBody>{activities.map(a=><TableRow key={a.id}><TableCell className="font-medium text-sm">{a.type}</TableCell><TableCell className="text-sm max-w-[240px] truncate">{a.detail}</TableCell><TableCell className="text-sm text-muted-foreground">{a.date}</TableCell><TableCell><Badge variant={a.v} className="text-[11px]">{a.status}</Badge></TableCell></TableRow>)}</TableBody></Table></div>
            <div className="sm:hidden space-y-3">{activities.map(a=><div key={a.id} className="border rounded-lg p-3 space-y-1.5"><div className="flex items-center justify-between"><span className="font-medium text-sm">{a.type}</span><Badge variant={a.v} className="text-[10px]">{a.status}</Badge></div><p className="text-sm text-muted-foreground">{a.detail}</p><p className="text-xs text-muted-foreground">{a.date}</p></div>)}</div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2"><CardHeader className="pb-3"><CardTitle className="text-base">タイムライン</CardTitle></CardHeader>
          <CardContent><div className="space-y-4">{timeline.map((t,i)=><div key={i} className="flex gap-3"><div className="flex flex-col items-center"><div className={`w-2.5 h-2.5 rounded-full ${t.color} ring-4 ring-background`}/>{i<timeline.length-1&&<div className="w-px flex-1 bg-border mt-1"/>}</div><div className="pb-4"><p className="text-sm font-medium leading-tight">{t.event}</p><p className="text-xs text-muted-foreground mt-0.5">{t.date}</p></div></div>)}</div></CardContent>
        </Card>
      </div>

      <Card><CardHeader className="pb-3"><CardTitle className="text-base">月別申告件数 (過去6ヶ月)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <HBar label="2025/09" value={3} max={12} color="hsl(209 69% 28%)" /><HBar label="2025/10" value={5} max={12} color="hsl(209 69% 28%)" /><HBar label="2025/11" value={7} max={12} color="hsl(209 69% 38%)" /><HBar label="2025/12" value={4} max={12} color="hsl(209 69% 28%)" /><HBar label="2026/01" value={8} max={12} color="hsl(209 69% 38%)" /><HBar label="2026/02" value={12} max={12} color="hsl(189 55% 55%)" />
        </CardContent>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════
// Research
// ══════════════════════════════════════
function ResearchPage() {
  const data = [
    { id: "R-2026-001", name: "AI創薬における副作用予測モデルの研究", role: "研究代表者", period: "2026/04 - 2028/03", status: "承認済", progress: 100 },
    { id: "R-2026-042", name: "新規抗がん剤XYZの臨床第II相試験", role: "分担研究者", period: "2025/10 - 2027/09", status: "審査中", progress: 65 },
    { id: "R-2026-088", name: "ウェアラブルデバイスを用いた睡眠時無呼吸症候群スクリーニング", role: "研究代表者", period: "2026/01 - 2026/12", status: "未申告", progress: 0 },
    { id: "R-2026-112", name: "高齢者向け転倒予防AIシステムの開発と実証研究", role: "分担研究者", period: "2026/04 - 2027/03", status: "審査中", progress: 40 },
  ];
  const sv = (s: string) => s === "承認済" ? "default" as const : s === "審査中" ? "secondary" as const : "destructive" as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold tracking-tight text-primary">研究一覧</h1><p className="text-sm text-muted-foreground mt-1">関与している研究プロジェクトとCOI状況</p></div>
        <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm">{icons.download} エクスポート</Button><Button size="sm">{icons.plus} 新規研究登録</Button></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center"><p className="text-2xl font-bold">{data.length}</p><p className="text-xs text-muted-foreground">全研究</p></Card>
        <Card className="p-3 text-center"><p className="text-2xl font-bold text-emerald-600">{data.filter(d=>d.status==="承認済").length}</p><p className="text-xs text-muted-foreground">承認済</p></Card>
        <Card className="p-3 text-center"><p className="text-2xl font-bold text-destructive">{data.filter(d=>d.status==="未申告").length}</p><p className="text-xs text-muted-foreground">未申告</p></Card>
      </div>
      <Card className="hidden sm:block"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead className="text-xs">整理番号</TableHead><TableHead className="text-xs">研究課題名</TableHead><TableHead className="text-xs">役割</TableHead><TableHead className="text-xs">期間</TableHead><TableHead className="text-xs">COI進捗</TableHead><TableHead className="text-xs">状態</TableHead><TableHead className="text-xs w-[80px]"></TableHead></TableRow></TableHeader><TableBody>{data.map(r=><TableRow key={r.id}><TableCell className="font-mono text-sm text-primary font-medium">{r.id}</TableCell><TableCell className="text-sm max-w-[280px]"><span className="line-clamp-1">{r.name}</span></TableCell><TableCell className="text-sm">{r.role}</TableCell><TableCell className="text-sm text-muted-foreground whitespace-nowrap">{r.period}</TableCell><TableCell><div className="flex items-center gap-2"><Progress value={r.progress} className="h-1.5 w-16"/><span className="text-xs text-muted-foreground">{r.progress}%</span></div></TableCell><TableCell><Badge variant={sv(r.status)} className="text-[11px]">{r.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8">{icons.edit}</Button><Button variant="ghost" size="icon" className="h-8 w-8 text-secondary-foreground">{icons.send}</Button></div></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
      <div className="sm:hidden space-y-3">{data.map(r=><Card key={r.id} className="p-4 space-y-3"><div className="flex items-start justify-between"><div><span className="font-mono text-xs text-primary font-medium">{r.id}</span><p className="font-semibold text-sm mt-0.5">{r.name}</p></div><Badge variant={sv(r.status)} className="text-[10px] shrink-0">{r.status}</Badge></div><div className="flex items-center gap-4 text-xs text-muted-foreground"><span>{r.role}</span><span>{r.period}</span></div><div className="flex items-center gap-2"><Progress value={r.progress} className="h-1.5 flex-1"/><span className="text-xs text-muted-foreground">{r.progress}%</span></div><div className="flex gap-2 pt-1"><Button variant="outline" size="sm" className="flex-1">{icons.edit} 編集</Button><Button size="sm" className="flex-1">{icons.send} 申告</Button></div></Card>)}</div>
    </div>
  );
}

// ══════════════════════════════════════
// COI Personal
// ══════════════════════════════════════
function CoiPage() {
  const declarations = [
    { year: "2026年度", type: "定期申告", status: "審査中", submitted: "2026/02/25", amount: "1,200,000", count: 2 },
    { year: "2025年度", type: "定期申告", status: "承認済", submitted: "2025/03/10", amount: "800,000", count: 1 },
    { year: "2024年度", type: "定期申告", status: "承認済", submitted: "2024/03/15", amount: "0", count: 0 },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold tracking-tight text-primary">COI個人申告</h1><p className="text-sm text-muted-foreground mt-1">年次の定期申告および随時申告の履歴</p></div>
        <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm">{icons.download} 出力</Button><Button size="sm">{icons.sparkle} 2026年度 申告登録</Button></div>
      </div>
      <Card className="border-secondary/30 bg-gradient-to-r from-sky-50/80 to-cyan-50/40"><CardContent className="p-4 flex gap-4 items-start"><div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0 mt-0.5">{icons.sparkle}</div><div><p className="font-semibold text-sm text-primary">過去データの引用が可能です</p><p className="text-xs text-muted-foreground mt-1 leading-relaxed">「2025年度 定期申告」の情報を引き継いで、変更分のみを入力することで入力を大幅に省略できます。</p></div></CardContent></Card>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{declarations.map((d,i)=><Card key={i} className={`p-4 ${i===0?"ring-1 ring-primary/20":""}`}><div className="flex items-center justify-between mb-2"><span className="font-bold text-sm">{d.year}</span><Badge variant={d.status==="承認済"?"default":"secondary"} className="text-[10px]">{d.status}</Badge></div><p className="text-xl font-bold font-mono">¥{d.amount}</p><p className="text-xs text-muted-foreground mt-0.5">{d.count}件の受領 / {d.submitted} 提出</p></Card>)}</div>
      <Card className="hidden sm:block"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead className="text-xs">対象年度</TableHead><TableHead className="text-xs">申告区分</TableHead><TableHead className="text-xs">合計受領額</TableHead><TableHead className="text-xs">件数</TableHead><TableHead className="text-xs">提出日</TableHead><TableHead className="text-xs">ステータス</TableHead></TableRow></TableHeader><TableBody>{declarations.map((d,i)=><TableRow key={i}><TableCell className="font-semibold text-sm">{d.year}</TableCell><TableCell className="text-sm">{d.type}</TableCell><TableCell className="font-mono text-sm">¥{d.amount}</TableCell><TableCell className="text-sm">{d.count}件</TableCell><TableCell className="text-sm text-muted-foreground">{d.submitted}</TableCell><TableCell><Badge variant={d.status==="承認済"?"default":"secondary"} className="text-[11px]">{d.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
    </div>
  );
}

// ══════════════════════════════════════
// Applications
// ══════════════════════════════════════
function ApplicationsPage() {
  const reviews = [
    { id: "APP-0128", researcher: "佐藤 健太", type: "定期申告", amount: "¥1,500,000", alert: true, status: "pending", date: "2026/02/25" },
    { id: "APP-0127", researcher: "高橋 美奈", type: "研究申告 (R-2026-001)", amount: "¥300,000", alert: false, status: "pending", date: "2026/02/24" },
    { id: "APP-0126", researcher: "渡辺 吾郎", type: "定期申告", amount: "¥0", alert: false, status: "approved", date: "2026/02/23" },
    { id: "APP-0125", researcher: "山田 太郎", type: "定期申告", amount: "¥450,000", alert: false, status: "approved", date: "2026/02/20" },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight text-primary">申請管理ワークスペース</h1><p className="text-sm text-muted-foreground mt-1">事務局・委員会用の審査、アラート管理、書類作成</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3 text-center"><p className="text-xl font-bold">{reviews.length}</p><p className="text-[11px] text-muted-foreground">全申請</p></Card>
        <Card className="p-3 text-center"><p className="text-xl font-bold text-amber-600">{reviews.filter(r=>r.status==="pending").length}</p><p className="text-[11px] text-muted-foreground">審査待ち</p></Card>
        <Card className="p-3 text-center"><p className="text-xl font-bold text-emerald-600">{reviews.filter(r=>r.status==="approved").length}</p><p className="text-[11px] text-muted-foreground">承認済</p></Card>
        <Card className="p-3 text-center"><p className="text-xl font-bold text-destructive">{reviews.filter(r=>r.alert).length}</p><p className="text-[11px] text-muted-foreground">アラート</p></Card>
      </div>
      <Tabs defaultValue="review">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex"><TabsTrigger value="review" className="text-xs sm:text-sm">申請審査</TabsTrigger><TabsTrigger value="alert" className="text-xs sm:text-sm">アラート管理</TabsTrigger><TabsTrigger value="docs" className="text-xs sm:text-sm">書類作成</TabsTrigger></TabsList>
        <TabsContent value="review" className="mt-4 space-y-4">
          <div className="flex gap-2"><div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icons.search}</span><Input placeholder="申告者、申請IDで検索..." className="pl-10"/></div><Button variant="outline" size="sm">{icons.filter} 絞り込み</Button></div>
          <Card className="hidden sm:block"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead className="text-xs">申請ID</TableHead><TableHead className="text-xs">申告者</TableHead><TableHead className="text-xs">区分</TableHead><TableHead className="text-xs">金額</TableHead><TableHead className="text-xs">提出日</TableHead><TableHead className="text-xs">審査</TableHead></TableRow></TableHeader><TableBody>{reviews.map(r=><TableRow key={r.id}><TableCell className="font-mono text-sm font-medium">{r.id}</TableCell><TableCell className="text-sm">{r.researcher}</TableCell><TableCell className="text-sm">{r.type}</TableCell><TableCell className="text-sm font-mono">{r.alert?<span className="text-destructive font-semibold">{r.amount} ⚠</span>:r.amount}</TableCell><TableCell className="text-sm text-muted-foreground">{r.date}</TableCell><TableCell>{r.status==="approved"?<Badge className="text-[10px] bg-emerald-100 text-emerald-700 hover:bg-emerald-100">承認完了</Badge>:<div className="flex gap-1.5"><Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700">承認</Button><Button size="sm" variant="outline" className="h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/5">差戻</Button></div>}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
          <div className="sm:hidden space-y-3">{reviews.map(r=><Card key={r.id} className={`p-4 space-y-3 ${r.alert?"border-destructive/30":""}`}><div className="flex items-start justify-between"><div><span className="font-mono text-xs text-muted-foreground">{r.id}</span><p className="font-semibold text-sm">{r.researcher}</p></div>{r.alert&&<Badge variant="destructive" className="text-[10px]">要注意</Badge>}</div><div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{r.type}</span><span className={`font-mono font-medium ${r.alert?"text-destructive":""}`}>{r.amount}</span></div><div className="text-xs text-muted-foreground">{r.date}</div>{r.status==="approved"?<Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">承認完了</Badge>:<div className="flex gap-2"><Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs">承認</Button><Button size="sm" variant="outline" className="flex-1 text-destructive border-destructive/30 text-xs">差戻し</Button></div>}</Card>)}</div>
        </TabsContent>
        <TabsContent value="alert" className="mt-4">
          <Card className="p-8 text-center"><div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-4">{icons.alertTriangle}</div><h3 className="font-bold text-lg">アラート超過リスト (1件)</h3><p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">基準額(1,000,000円)を超過した企業からの受領申告が自動検出されました。</p>
            <Card className="mt-6 p-4 border-destructive/20 bg-red-50/50 max-w-sm mx-auto text-left"><p className="font-semibold text-sm">佐藤 健太 — APP-0128</p><p className="text-xs text-muted-foreground mt-1">〇〇製薬からの講演料: ¥1,500,000 (基準 ¥1,000,000)</p><Progress value={75} className="mt-2 h-1.5"/><p className="text-[10px] text-destructive mt-1 font-medium">基準額の150% — 委員会審査推奨</p></Card>
          </Card>
        </TabsContent>
        <TabsContent value="docs" className="mt-4">
          <Card className="p-8 text-center"><div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">{icons.research}</div><h3 className="font-bold text-lg">COI委員会 報告用PDF生成</h3><p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">直近の承認済み申告データを集計し、委員会向けの報告書を出力します。</p><Button className="mt-4">{icons.download} PDFを出力する</Button></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ══════════════════════════════════════
// Settings
// ══════════════════════════════════════
function SettingsPage() {
  const menus = [
    { title: "ユーザ管理", desc: "利用者の登録、役割割り当て、アカウント管理", icon: icons.users, count: "128名" },
    { title: "権限管理", desc: "ロール(研究者、事務局、管理者)ごとのアクセス権限", icon: icons.lock, count: "3ロール" },
    { title: "組織管理", desc: "部署構成(学部、診療科、研究室)の階層定義", icon: icons.building, count: "24部署" },
    { title: "企業マスタ", desc: "申告対象の製薬企業・医療機器メーカーの一覧", icon: icons.layers, count: "342社" },
    { title: "システム設定", desc: "年度切り替え、アラート基準額、通知テンプレート", icon: icons.settings, count: "" },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight text-primary">システム管理</h1><p className="text-sm text-muted-foreground mt-1">基盤データと設定パラメーターの管理</p></div>
      <Card className="p-4"><div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/><span className="text-sm font-medium">システム正常稼働中</span></div><Separator orientation="vertical" className="h-5 hidden sm:block"/><div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground"><span>現在年度: <strong className="text-foreground">2026</strong></span><span>アラート基準額: <strong className="text-foreground">¥1,000,000</strong></span><span>最終更新: <strong className="text-foreground">2026/02/25 09:30</strong></span></div></div></Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{menus.map((m,i)=><Card key={i} className="group cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300"><CardContent className="p-5"><div className="flex items-start gap-4"><div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">{m.icon}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between"><h3 className="font-bold text-sm">{m.title}</h3>{m.count&&<span className="text-xs text-muted-foreground font-mono">{m.count}</span>}</div><p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p></div></div><div className="mt-3 flex justify-end"><span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">設定を開く {icons.arrowRight}</span></div></CardContent></Card>)}</div>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">システム概要</CardTitle></CardHeader><CardContent className="space-y-3"><HBar label="登録ユーザ" value={128} max={200} color="hsl(209 69% 28%)"/><HBar label="登録企業" value={342} max={500} color="hsl(189 55% 55%)"/><HBar label="今年度申告" value={45} max={128} color="hsl(145 60% 34%)"/><HBar label="未申告者" value={12} max={128} color="hsl(4 80% 72%)"/></CardContent></Card>
    </div>
  );
}

// ══════════════════════════════════════
// Main App
// ══════════════════════════════════════
export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p: Page) => { setPage(p); setMobileOpen(false); };

  const renderPage = () => { switch(page){ case "dashboard": return <DashboardPage/>; case "research": return <ResearchPage/>; case "coi": return <CoiPage/>; case "applications": return <ApplicationsPage/>; case "settings": return <SettingsPage/>; } };

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <aside className="hidden md:flex w-[260px] border-r bg-card flex-col shrink-0"><SidebarContent page={page} navigate={navigate} /></aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-10">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden h-9 w-9">{icons.menu}</Button></SheetTrigger><SheetContent side="left" className="p-0 w-[260px]"><SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle><SheetDescription className="sr-only">COI管理システムの各画面に移動します。</SheetDescription><SidebarContent page={page} navigate={navigate} /></SheetContent></Sheet>
              <h2 className="text-sm font-semibold hidden sm:block">利益相反(COI) 申告管理システム</h2>
              <h2 className="text-sm font-semibold sm:hidden">COI管理システム</h2>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-9 w-9">{icons.search}</Button></TooltipTrigger><TooltipContent>検索</TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-9 w-9 relative">{icons.bell}<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"/></Button></TooltipTrigger><TooltipContent>通知</TooltipContent></Tooltip>
              <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block"/>
              <div className="flex items-center gap-2 cursor-pointer rounded-lg hover:bg-muted px-2 py-1 transition-colors"><Avatar className="h-7 w-7"><AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">テ</AvatarFallback></Avatar><span className="text-sm font-medium hidden sm:block">テスト (研究者)</span></div>
              <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hidden sm:flex">{icons.logout}</Button></TooltipTrigger><TooltipContent>ログアウト</TooltipContent></Tooltip>
            </div>
          </header>
          <ScrollArea className="flex-1"><main className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">{renderPage()}</main></ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
}
