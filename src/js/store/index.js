import { create } from "zustand";

const useStore = create((set) => ({
  currentAudit: {},
  auditStatus: "default",
  setCurrentAudit: (audit) => set({ currentAudit: audit }),
  setAuditStatus: (status) => set({ auditStatus: status }),
}));

export { useStore };
