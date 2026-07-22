"use client";

import { create } from "zustand";

import type { UserSession } from "@/types/session";

type SessionState = {
  user: UserSession | null;
  isAuthenticated: boolean;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
