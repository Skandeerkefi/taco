import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "@/pages/HomePage";
// // import LeaderboardPage from "@/pages/LeaderboardPage";
// import SlotCallsPage from "@/pages/SlotCallsPage";
// import GiveawaysPage from "@/pages/GiveawaysPage";
// import LoginPage from "@/pages/LoginPage";
// import SignupPage from "@/pages/SignupPage";
// import NotFoundPage from "@/pages/NotFoundPage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/useAuthStore";
// import SlotOverlay from "@/pages/SlotOverlay";
// import BonusHuntPage from "@/pages/BonusHuntPage";
// import RoobetPage from "@/pages/RoobetPage";
import LeaderboardPage from "./pages/LeaderboardPage";
function App() {
	const loadFromStorage = useAuthStore((state) => state.loadFromStorage);
	const user = useAuthStore((state) => state.user);

	useEffect(() => {
		loadFromStorage();
	}, [loadFromStorage]);

	useEffect(() => {
		if (user?.role === "admin") {
			// Do admin-specific logic here
			console.log("User is admin, do admin stuff");
		} else {
			// Non-admin logic or nothing
			console.log("User is not admin");
		}
	}, [user]);
	return (
		<TooltipProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LeaderboardPage />} />
					{/* <Route path='/leaderboard' element={<LeaderboardPage />} /> */}
					{/* <Route path='/slot-calls' element={<SlotCallsPage />} />
					<Route path='/giveaways' element={<GiveawaysPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
					<Route path='*' element={<NotFoundPage />} />
					<Route path='/slot-overlay' element={<SlotOverlay />} />
					<Route path='/bonus-hunt' element={<BonusHuntPage />} />
					<Route path='/Leaderboards' element={<RoobetPage />} /> */}
					<Route path='/Leaderboard' element={<LeaderboardPage />} />
				</Routes>
			</BrowserRouter>
			<Toaster />
		</TooltipProvider>
	);
}

export default App;
