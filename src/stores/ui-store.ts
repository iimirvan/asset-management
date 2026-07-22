"use client";

import { create } from "zustand";

type SidebarMode = "expanded" | "collapsed";

type UiState = {
  sidebarMode: SidebarMode;
  isMobileSidebarOpen: boolean;
  setSidebarMode: (sidebarMode: SidebarMode) => void;
  setMobileSidebarOpen: (isMobileSidebarOpen: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarMode: "expanded",
  isMobileSidebarOpen: false,
  setSidebarMode: (sidebarMode) => set({ sidebarMode }),
  setMobileSidebarOpen: (isMobileSidebarOpen) => set({ isMobileSidebarOpen }),
}));
