"use client";

import { useState } from "react";
import { useTrainingStore } from "@/store/trainingStore";
import { useCardioStore } from "@/store/cardioStore";
import { useCalendarStore } from "@/store/calendarStore";

import { Dumbbell, Flame, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const { treinos } = useTrainingStore();
  const { sessoes: cardios } = useCardioStore();
  const { days, addEntry, getDay, removeEntry } = useCalendarStore();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState<string>(() => formatDate(today));

  const selectedDayData = getDay(selectedDate);

  function formatDate(d: Date) {
    return d.toISOString().split("T")[0];
  }

  function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const start = firstDay.getDay();
    const total = lastDay.getDate();

    const daysArray: (Date | null)[] = [];

    for (let i = 0; i < start; i++) daysArray.push(null);
    for (let d = 1; d <= total; d++) {
      daysArray.push(new Date(currentYear, currentMonth, d));
    }

    return daysArray;
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function countEntriesOfType(month: number, year: number, tipo: "treino" | "cardio") {
    let count = 0;

    days.forEach((day) => {
      const date = new Date(day.date);
      const sameMonth = date.getMonth() === month && date.getFullYear() === year;

      if (!sameMonth) return;

      day.entries.forEach((entry) => {
        if (entry.tipo === tipo) count++;
      });
    });

    return count;
  }

  const treinosRealizados = countEntriesOfType(currentMonth, currentYear, "treino");
  const cardiosRealizados = countEntriesOfType(currentMonth, currentYear, "cardio");
  const totalAtividadesMes = treinosRealizados + cardiosRealizados;

  function calculateConsistency(month: number, year: number) {
    let diasComTreino = 0;

    days.forEach((day) => {
      const d = new Date(day.date);
      const sameMonth = d.getMonth() === month && d.getFullYear() === year;

      if (!sameMonth) return;

      if (day.entries.length > 0) diasComTreino++;
    });

    const totalDiasMes = new Date(year, month + 1, 0).getDate();

    const percent = (diasComTreino / totalDiasMes) * 100;

    return {
      diasComTreino,
      totalDiasMes,
      percent: Math.round(percent),
    };
  }

  const consistencia = calculateConsistency(currentMonth, currentYear);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F3FDF8] to-[#E8FBF4] px-8 py-10">
      {/* TOP METRICS */}
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-4 mb-10">
        <MetricCard
          icon={<Dumbbell className="w-5 h-5 text-primary" />}
          value={treinosRealizados}
          label="Treinos no mês"
        />

        <MetricCard
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          value={cardiosRealizados}
          label="Cardios no mês"
        />

        <MetricCard
          icon={<Calendar className="w-5 h-5 text-blue-500" />}
          value={totalAtividadesMes}
          label="Total no mês"
        />

        <MetricCard
          icon={<Flame className="w-5 h-5 text-purple-500" />}
          value={`${consistencia.percent}%`}
          label="Consistência"
        />
      </div>

      <div className="max-w-6xl mx-auto flex gap-10">
        {/* CALENDAR BOX */}
        <div className="flex-1 bg-card border shadow-card rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold">
              {monthNames[currentMonth]} {currentYear}
            </h2>

            {/* BOTÕES DE NAVEGAÇÃO MELHORADOS */}
            <div className="flex gap-3">
             <button
    type="button"
    className="p-2 rounded-xl border bg-white hover:bg-primary/10 transition-all duration-200"
    onClick={() => {
      let newMonth = currentMonth - 1;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear = currentYear - 1;
      }

      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    }}
  >
    <ChevronLeft className="w-5 h-5 text-primary" />
  </button>

  {/* PRÓXIMO MÊS */}
  <button
    type="button"
    className="p-2 rounded-xl border bg-white hover:bg-primary/10 transition-all duration-200"
    onClick={() => {
      let newMonth = currentMonth + 1;
      let newYear = currentYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear = currentYear + 1;
      }

      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    }}
  >
    <ChevronRight className="w-5 h-5 text-primary" />
  </button>
            </div>
          </div>

          {/* WEEKDAYS */}
          <div className="grid grid-cols-7 text-center font-medium text-muted-foreground mb-3">
            <span>Dom</span>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
          </div>

          {/* CALENDAR GRID */}
          <div className="grid grid-cols-7 gap-2">
            {generateCalendar().map((day, idx) => {
              if (!day) return <div key={idx}></div>;

              const dateStr = formatDate(day);
              const entries = getDay(dateStr)?.entries || [];
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    p-3 rounded-xl border text-sm transition-all duration-200
                    ${isSelected ? "bg-primary text-white border-primary scale-105" : "bg-card"}
                    ${entries.length > 0 ? "ring-2 ring-primary/50" : ""}
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-80 bg-card border shadow-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            {new Date(selectedDate).toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h3>

          {(!selectedDayData || selectedDayData.entries.length === 0) && (
            <div className="text-center text-muted-foreground py-6">
              <Calendar className="mx-auto mb-2 opacity-40" />
              Nenhum treino neste dia
            </div>
          )}

          <Link href={`/calendar/${selectedDate}`}>
            <Button className="w-full mb-6 rounded-xl">+ Adicionar</Button>
          </Link>

          {selectedDayData?.entries.map((e) => (
            <div key={e.id} className="p-4 bg-background border rounded-xl flex justify-between mb-3">
              <div>
                <p className="font-medium capitalize">{e.nome}</p>
                {e.calorias && <p className="text-sm text-muted-foreground">{e.calorias} kcal</p>}
              </div>

              <button onClick={() => removeEntry(selectedDate, e.id)} className="text-red-500">
                X
              </button>
            </div>
          ))}

          <Link href="/setup-training">
            <Button variant="outline" className="w-full mt-4 rounded-xl">
              Gerenciar Treinos
            </Button>
          </Link>

          <Link href="/setup-cardio">
            <Button variant="outline" className="w-full mt-2 rounded-xl">
              Gerenciar Cardio
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ icon, value, label }: any) {
  return (
    <div className="bg-card rounded-2xl border shadow-card p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-display text-xl font-bold">{value}</p>
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </div>
  );
}
