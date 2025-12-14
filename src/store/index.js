import { create } from 'zustand';

export const useModalStore = create((set) => ({
    menuOpen: false,

    openMenu: () => set({ menuOpen: true }),
    closeMenu: () => set({ menuOpen: false }),
}));
