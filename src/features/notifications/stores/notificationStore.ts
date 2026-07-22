"use client";

import { create } from "zustand";

export type NotificationTone = "success" | "error" | "warning" | "info";

export type NotificationItem = {
  id: string;
  tone: NotificationTone;
  title: string;
  message?: string;
};

type NotificationState = {
  notifications: NotificationItem[];
  notify: (notification: Omit<NotificationItem, "id">) => void;
  dismiss: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  notify: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: `notification-${Date.now()}-${state.notifications.length}`,
          ...notification,
        },
        ...state.notifications,
      ].slice(0, 4),
    })),
  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}));
