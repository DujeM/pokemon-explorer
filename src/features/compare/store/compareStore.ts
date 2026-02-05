import { create } from "zustand";

type CompareState = {
    leftId: number | null;
    rightId: number | null;
    setLeft: (id: number | null) => void;
    setRight: (id: number | null) => void;
    clear: () => void;
};

export const useCompareStore = create<CompareState>((set) => ({
    leftId: null,
    rightId: null,
    setLeft: (id) => set({ leftId: id }),
    setRight: (id) => set({ rightId: id }),
    clear: () => set({ leftId: null, rightId: null }),
}));
