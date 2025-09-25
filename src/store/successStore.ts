import { create } from "zustand";

interface SuccessModalState {
    isOpen: boolean;
    openSuccess: () => void;
    closeSuccess: () => void;
    toggleSuccess: () => void;
}

export const useSuccessStore = create<SuccessModalState>((set) => ({
    isOpen: false,

    openSuccess: () => set({ isOpen: true }),
    closeSuccess: () => set({ isOpen: false }),
    toggleSuccess: () => set((state) => ({ isOpen: !state.isOpen })),
}));