import { create } from 'zustand'

const useStore = create((set) => ({
  auditId: null,
  setAuditId: (id: string) => set({ auditId: id }),
}))

export { useStore };
