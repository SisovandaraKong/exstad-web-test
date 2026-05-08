"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import Image from "next/image";

export default function OnlineStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnecting, setShowReconnecting] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

const onOnline = () => {
  setShowReconnecting(true);  // Show reconnecting first
  setTimeout(() => {
    setShowReconnecting(false); // Hide reconnecting
    setIsOnline(true);          // Then hide everything
  }, 1500);
};

    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

if (isOnline && !showReconnecting) return null;

  return (
    <div className="w-[100vw] h-[100vh] bg-background text-foreground z-[9999] fixed top-0 left-0 flex items-center justify-center overflow-hidden font-koh">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-whitesmoke to-background opacity-50" />

      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse offline-circle-1" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse offline-circle-2" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse offline-circle-3" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto">
        {showReconnecting ? (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8 relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl animate-bounce">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="font-h2 font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4 animate-in slide-in-from-bottom duration-700">
              កំពុងតភ្ជាប់ឡើងវិញ...
            </h1>
            <p className="font-d3 text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-150">
              កំពុងត្រឡប់មកវិញ
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* WiFi Off Icon with Animation */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 animate-ping">
                <div className="w-32 h-32 rounded-full bg-secondary/20" />
              </div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center backdrop-blur-sm border-4 border-secondary/30 shadow-2xl animate-bounce">
                <WifiOff
                  className="w-16 h-16 text-secondary animate-pulse"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Title with Gradient */}
            <h1 className="font-h1 font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 animate-in slide-in-from-bottom duration-700">
              គ្មានការតភ្ជាប់អ៊ីនធឺណិត
            </h1>

            {/* Description */}
            <p className="font-d2 text-text mb-8 animate-in slide-in-from-bottom duration-700 delay-150">
              អូ! អ្នកមិនមានការតភ្ជាប់អ៊ីនធឺណិតទេ។
              សូមពិនិត្យមើលការតភ្ជាប់របស់អ្នក។
            </p>

            {/* Troubleshooting Steps */}
            <div className="bg-card/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-border animate-in slide-in-from-bottom duration-700 delay-300 max-w-md">
              <h2 className="font-h5 font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                វិធីដោះស្រាយរហ័ស:
              </h2>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3 font-d4 text-muted-foreground">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    ១
                  </span>
                  <span>ពិនិត្យមើលការតភ្ជាប់ WiFi ឬទិន្នន័យចល័តរបស់អ្នក</span>
                </li>
                <li className="flex items-start gap-3 font-d4 text-muted-foreground">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    ២
                  </span>
                  <span>សាកល្បងបើកនិងបិទ Airplane Mode</span>
                </li>
              </ul>
            </div>

            {/* Retry Indicator */}
            <div className="mt-8 animate-in slide-in-from-bottom duration-700 delay-500">
              <div className="flex items-center gap-3 text-muted-foreground font-d4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce offline-dot-1" />
                  <span className="w-2 h-2 bg-secondary rounded-full animate-bounce offline-dot-2" />
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce offline-dot-3" />
                </div>
                <span>កំពុងរង់ចាំការតភ្ជាប់...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
      </div>
    </div>
  );
}
