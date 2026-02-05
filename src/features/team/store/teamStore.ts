import { create } from "zustand";

type TeamState = {
    team: number[];
    add: (id: number) => void;
    remove: (id: number) => void;
    clear: () => void;
};

const MAX_TEAM_SIZE = 6;

export const useTeamStore = create<TeamState>((set) => ({
    team: [],
    add: (id) =>
        set((state) => {
            if (state.team.includes(id)) return state;
            if (state.team.length >= MAX_TEAM_SIZE) return state;

            return { team: [...state.team, id] };
        }),
    remove: (id) =>
        set((state) => ({
            team: state.team.filter((x) => x !== id),
        })),
    clear: () => set({ team: [] }),
}));
