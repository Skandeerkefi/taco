import React, { useEffect, useState } from "react";
import { useRoobetStore } from "../store/RoobetStore";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // ✅ make sure shadcn dialog is available
import { Info } from "lucide-react";

const RoobetPage: React.FC = () => {
  const { leaderboard, loading, error, fetchLeaderboard } = useRoobetStore();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const topPlayers =
    leaderboard?.data && leaderboard.data.length >= 3
      ? [leaderboard.data[1], leaderboard.data[0], leaderboard.data[2]].filter(Boolean)
      : [];

  return (
    <div className="relative flex flex-col min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-contain bg-center bg-no-repeat opacity-70 z-0"
        style={{
          backgroundImage: `url('https://i.ibb.co/XrDRLV7S/acloseupof-subject-1-smokingacigarettewiththesmokemoving-ezgif-com-gif-maker.gif')`,
          backgroundColor: "#000",
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#040704]/80 via-[#040704]/90 to-[#040704] z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <main className="relative z-10 flex-grow w-full px-6 py-12 mx-auto max-w-7xl text-center">
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#EFA813] mb-4">
            $1000 ROOBET LEADERBOARD
          </h1>
          <p className="text-[#EFA813]/80 mb-8 text-lg">
            Use code <span className="font-bold text-[#E84D06]">"tacopoju"</span> to compete for top
            spots and win prizes!
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <Button
              className="bg-[#E84D06] hover:bg-[#EFA813] text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              onClick={() =>
                window.open("https://roobet.com/?ref=tacopoju", "_blank", "noopener noreferrer")
              }
            >
              Join Now
            </Button>
            <Button
              className="bg-transparent border border-[#EFA813] hover:bg-[#EFA813]/10 text-[#EFA813] px-6 py-3 rounded-full font-semibold flex items-center gap-2"
              onClick={() => setShowHowItWorks(true)}
            >
              <Info className="w-4 h-4" />
              How It Works
            </Button>
          </div>

          {/* Status messages */}
          {loading && <p className="text-center text-[#EFA813]">Loading leaderboard...</p>}
          {error && <p className="text-center text-[#E84D06]">{error}</p>}

          {/* TOP 3 PLAYERS */}
          {topPlayers.length === 3 ? (
            <div className="flex flex-col md:flex-row justify-center items-end gap-10 mb-16">
              {topPlayers.map((player) => {
                const rank = player.rankLevel;
                const translateY =
                  rank === 1 ? "translate-y-0" : rank === 2 ? "translate-y-6" : "translate-y-10";
                const borderColor =
                  rank === 1
                    ? "border-[#EFA813]"
                    : rank === 2
                    ? "border-[#547E25]"
                    : "border-[#E84D06]";
                const glowColor =
                  rank === 1
                    ? "shadow-[0_0_40px_rgba(239,168,19,0.5)]"
                    : rank === 2
                    ? "shadow-[0_0_35px_rgba(84,126,37,0.4)]"
                    : "shadow-[0_0_35px_rgba(232,77,6,0.4)]";
                const prizeText =
                  rank === 1 ? "$125 Prize 🥇" : rank === 2 ? "$75 Prize 🥈" : "$25 Prize 🥉";

                return (
                  <div
                    key={player.uid}
                    className={`relative w-full max-w-[280px] bg-[#0c0c0c]/95 border-2 ${borderColor} rounded-3xl overflow-hidden backdrop-blur-lg ${glowColor} transform ${translateY} transition-all duration-500 hover:scale-105`}
                  >
                    <div
                      className={`absolute top-3 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full font-extrabold text-black text-lg tracking-wide ${
                        rank === 1
                          ? "bg-gradient-to-r from-[#EFA813] to-[#E84D06]"
                          : "bg-[#E84D06]"
                      }`}
                    >
                      #{rank}
                    </div>

                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#EFA813]/25 to-transparent border border-[#EFA813]/40 flex items-center justify-center mb-5">
                        <span className="text-4xl font-extrabold text-[#EFA813] uppercase">
                          {player.username[0]}
                        </span>
                      </div>

                      <h2 className="text-xl font-extrabold text-white mb-1 break-all">
                        {player.username}
                      </h2>

                      <p className="text-[#E84D06] font-semibold text-lg mb-1">
                        ${player.wagered.toLocaleString()}
                      </p>

                      <p className="text-sm text-[#EFA813]/70 italic mb-4">
                        Weighted: {player.weightedWagered.toLocaleString()}
                      </p>

                      <div
                        className={`font-bold text-base px-6 py-2 rounded-full ${
                          rank === 1
                            ? "bg-gradient-to-r from-[#EFA813] to-[#E84D06] text-black"
                            : "bg-[#EFA813]/10 text-[#EFA813]"
                        }`}
                      >
                        {prizeText}
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[5px] ${
                        rank === 1
                          ? "bg-gradient-to-r from-[#EFA813] via-[#E84D06] to-[#EFA813]"
                          : "bg-gradient-to-r from-[#E84D06]/70 to-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-[#EFA813]/70 mb-12">
                Not enough players yet to display the top 3.
              </p>
            )
          )}

          {/* Countdown Timer */}
          <div className="mb-12">
            <h3 className="text-2xl text-[#EFA813] font-bold mb-2">Leaderboard Ends In</h3>
            <div className="flex justify-center gap-4 text-2xl font-extrabold text-[#E84D06]">
              <TimerBox label="Days" value={timeLeft.days} />
              <TimerBox label="Hours" value={timeLeft.hours} />
              <TimerBox label="Minutes" value={timeLeft.minutes} />
              <TimerBox label="Seconds" value={timeLeft.seconds} />
            </div>
          </div>

          {/* Leaderboard Table */}
          {leaderboard?.data?.length > 3 && (
            <div className="overflow-x-auto bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-[#547E25] shadow-lg">
              <table className="w-full border-collapse text-left">
                <thead className="bg-[#EFA813] text-[#040704] uppercase text-sm">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Player</th>
                    <th className="p-4">Wagered</th>
                    <th className="p-4">Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.data.slice(3).map((player) => (
                    <tr
                      key={player.uid}
                      className="border-t border-[#E84D06]/20 hover:bg-[#E84D06]/20 transition-all"
                    >
                      <td className="p-4 font-bold text-[#EFA813]">#{player.rankLevel}</td>
                      <td className="p-4 font-semibold">{player.username}</td>
                      <td className="p-4">${player.wagered.toLocaleString()}</td>
                      <td className="p-4 text-[#547E25] font-semibold">
                        {player.rankLevel === 4 && "$12.5"}
                        {player.rankLevel === 5 && "$12.5"}
                        {player.rankLevel > 5 && "$0.00"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* 🪟 HOW IT WORKS MODAL */}
      <Dialog open={showHowItWorks} onOpenChange={setShowHowItWorks}>
        <DialogContent className="bg-[#0a0a0a] border border-[#EFA813]/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#EFA813] text-2xl font-bold text-center">
              How the Leaderboard Works
            </DialogTitle>
            <DialogDescription className="text-[#EFA813]/80 text-center mb-4">
              Weighted wagers based on RTP determine your leaderboard score.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-[#fffefe]/90">
            <p>🎯 Games with an RTP of <strong>97% or less</strong> contribute <strong className="text-[#EFA813]">100%</strong> of the wagered amount.</p>
            <p>🎯 Games with an RTP <strong>above 97%</strong> contribute <strong className="text-[#EFA813]">50%</strong>.</p>
            <p>🎯 Games with an RTP of <strong>98% and above</strong> contribute <strong className="text-[#EFA813]">10%</strong>.</p>
            <p className="text-sm border-t border-[#EFA813]/30 pt-3">
              ⚠️ Only <strong>Slots</strong> and <strong>Housegames</strong> count (Dice excluded).
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Timer Box
const TimerBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center bg-[#EFA813]/10 px-4 py-2 rounded-xl">
    <span className="text-3xl">{String(value).padStart(2, "0")}</span>
    <span className="text-xs uppercase text-[#EFA813]/70">{label}</span>
  </div>
);

export default RoobetPage;
