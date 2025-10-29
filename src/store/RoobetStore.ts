import { create } from "zustand";
import axios from "axios";

interface Player {
	uid: string;
	username: string;
	wagered: number;
	weightedWagered: number;
	favoriteGameId: string;
	favoriteGameTitle: string;
	rankLevel: number;
}

interface LeaderboardData {
	disclosure: string;
	data: Player[];
}

interface RoobetStore {
	leaderboard: LeaderboardData | null;
	loading: boolean;
	error: string | null;
	fetchLeaderboard: (startDate?: string, endDate?: string) => Promise<void>;
}

export const useRoobetStore = create<RoobetStore>((set) => ({
	leaderboard: null,
	loading: false,
	error: null,

	fetchLeaderboard: async (startDate?: string, endDate?: string) => {
		set({ loading: true, error: null });

		try {
			// 🗓️ Default to current month (auto reset)
			const now = new Date();
			const year = now.getFullYear();
			const month = now.getMonth(); // 0-based
			const firstDay = new Date(year, month, 1).toISOString().split("T")[0];
			const lastDay = new Date(year, month + 1, 0).toISOString().split("T")[0];

			const start = startDate || firstDay;
			const end = endDate || lastDay;

			let url = `https://louiskhzdata-production-3897.up.railway.app/api/leaderboard/${start}/${end}`;

			const response = await axios.get(url);

			const updatedData: LeaderboardData = {
				disclosure: response.data.disclosure,
				data: response.data.data.map((player: any, index: number) => ({
					uid: player.uid,
					username: player.username,
					wagered: player.wagered,
					weightedWagered: player.weightedWagered,
					favoriteGameId: player.favoriteGameId,
					favoriteGameTitle: player.favoriteGameTitle,
					rankLevel: index + 1,
				})),
			};

			set({ leaderboard: updatedData, loading: false });
		} catch (err: any) {
			set({
				error: err.response?.data?.error || "Failed to fetch leaderboard",
				loading: false,
			});
		}
	},
}));
