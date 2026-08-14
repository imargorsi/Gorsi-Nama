"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface UserInfo {
  userId: string;
  fullName: string;
  email: string;
  city?: string;
  profession?: string;
  dateOfBirth?: string | null;
  contact?: string;
  summary?: string;
  facebookUsername?: string;
  instagramUsername?: string;
  profilePhoto?: string | null;
  galleryImage1?: string | null;
  galleryImage2?: string | null;
}

interface UserContextValue {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = "userInfo";

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners = [...listeners, callback];
  window.addEventListener("storage", callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function writeUserInfo(userInfo: UserInfo | null) {
  if (userInfo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  emitChange();
}

export function UserProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const userInfo = useMemo<UserInfo | null>(
    () => (stored ? (JSON.parse(stored) as UserInfo) : null),
    [stored]
  );

  const setUserInfo = useCallback((next: UserInfo | null) => {
    writeUserInfo(next);
  }, []);

  const value = useMemo(() => ({ userInfo, setUserInfo }), [userInfo, setUserInfo]);

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserProvider");
  }
  return context;
}
