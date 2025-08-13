import React, { useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [ageResult, setAgeResult] = useState(null);

  const [targetDate, setTargetDate] = useState("");
  const [countdownResult, setCountdownResult] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [differenceResult, setDifferenceResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = dayjs(birthDate);
    const now = dayjs();
    const years = now.diff(birth, "year");
    const months = now.diff(birth.add(years, "year"), "month");
    const days = now.diff(birth.add(years, "year").add(months, "month"), "day");
    setAgeResult({ years, months, days });
  };

  const calculateCountdown = () => {
    if (!targetDate) return;
    const target = dayjs(targetDate);
    const now = dayjs();
    const diff = target.diff(now);
    const dur = dayjs.duration(diff);
    setCountdownResult({
      days: Math.floor(dur.asDays()),
      hours: dur.hours(),
      minutes: dur.minutes(),
      seconds: dur.seconds(),
    });
  };

  const calculateDifference = () => {
    if (!startDate || !endDate) return;
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const years = end.diff(start, "year");
    const months = end.diff(start.add(years, "year"), "month");
    const days = end.diff(start.add(years, "year").add(months, "month"), "day");
    setDifferenceResult({ years, months, days });
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto mt-10">
      {/* Age Calculator */}
      <div className="p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-2">Age Calculator</h2>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="border p-2 w-full" />
        <button onClick={calculateAge} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Calculate</button>
        {ageResult && <p className="mt-2">{ageResult.years} years, {ageResult.months} months, {ageResult.days} days</p>}
      </div>

      {/* Countdown */}
      <div className="p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-2">Countdown</h2>
        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="border p-2 w-full" />
        <button onClick={calculateCountdown} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Countdown</button>
        {countdownResult && <p className="mt-2">{countdownResult.days}d {countdownResult.hours}h {countdownResult.minutes}m {countdownResult.seconds}s</p>}
      </div>

      {/* Days Between Dates */}
      <div className="p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-2">Days Between Dates</h2>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 w-full mb-2" />
        <button onClick={calculateDifference} className="px-4 py-2 bg-purple-500 text-white rounded">Calculate</button>
        {differenceResult && <p className="mt-2">{differenceResult.years} years, {differenceResult.months} months, {differenceResult.days} days</p>}
      </div>
    </div>
  );
}
