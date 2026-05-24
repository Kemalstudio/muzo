import { create } from 'zustand'

const useLibraryStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}))

export default useLibraryStore




