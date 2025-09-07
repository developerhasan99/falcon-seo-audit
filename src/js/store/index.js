import { create } from "zustand";

const useStore = create((set) => ({
  currentAudit: {},
  setCurrentAudit: (audit) => set({ currentAudit: audit }),
}));

export { useStore };
