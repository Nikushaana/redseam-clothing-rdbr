// store/userStore.ts
import { create } from "zustand";

interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
}

interface UserStore {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    clearUser: () => void;
    hydrate: () => void; // 👈 load from localStorage
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    token: null,
    setUser: (user, token) => {
        localStorage.setItem("redseamUser", JSON.stringify(user));
        localStorage.setItem("redseamToken", token);
        set({ user, token });
    },
    clearUser: () => {
        localStorage.removeItem("redseamUser");
        localStorage.removeItem("redseamToken");
        set({ user: null, token: null });
    },
    hydrate: () => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("redseamUser");
            const storedToken = localStorage.getItem("redseamToken");
            if (storedUser && storedToken) {
                set({
                    user: JSON.parse(storedUser),
                    token: storedToken,
                });
            }
        }
    },
}));
