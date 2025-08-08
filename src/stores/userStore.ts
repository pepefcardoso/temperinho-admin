import { create } from "zustand";
import { User } from "@/lib/types/user";
import { getSession } from "@/lib/auth";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  fetchUser: async () => {
    if (get().user) {
      return;
    }

    try {
      const session = await getSession();
      if (session) {
        set({ user: session.user });
      }
    } catch (error) {
      console.error("Falha ao buscar sessão do usuário:", error);
      set({ user: null });
    }
  },
}));
