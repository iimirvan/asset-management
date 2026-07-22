"use client";

import { X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { useNotificationStore, type NotificationTone } from "@/features/notifications/stores/notificationStore";

const toneStyles: Record<NotificationTone, string> = {
  success: "border-success bg-success-muted text-success",
  error: "border-danger bg-danger-muted text-danger",
  warning: "border-warning bg-warning-muted text-warning",
  info: "border-info bg-info-muted text-info",
};

type NotificationProviderProps = {
  children: React.ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
  const notifications = useNotificationStore((state) => state.notifications);
  const dismiss = useNotificationStore((state) => state.dismiss);

  return (
    <>
      {children}
      <div
        aria-live="polite"
        className="fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
      >
        {notifications.map((notification) => (
          <section
            className={cn(
              "rounded-[var(--radius-card)] border p-4 shadow-xl",
              toneStyles[notification.tone],
            )}
            key={notification.id}
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold">{notification.title}</h2>
                {notification.message ? (
                  <p className="mt-1 text-sm font-medium leading-5">
                    {notification.message}
                  </p>
                ) : null}
              </div>
              <IconButton
                aria-label="Dismiss notification"
                className="size-8 border-transparent bg-transparent"
                icon={<X aria-hidden="true" size={16} />}
                onClick={() => dismiss(notification.id)}
              />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
