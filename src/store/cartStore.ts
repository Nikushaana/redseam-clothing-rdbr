import { axiosClient } from "@/lib/api";
import { create } from "zustand";

interface CartModalState {
    isOpen: boolean;
    isLoaderProd: number | null;
    cart: CartProduct[];
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;

    // new actions
    fetchCart: () => Promise<void>;
    updateCartProduct: (productId: number, quantity: number) => Promise<void>;
    deleteCartProduct: (productId: number) => Promise<void>;
}

export const useCartStore = create<CartModalState>((set) => ({
    isOpen: false,
    isLoaderProd: null,
    cart: [],

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

    // Fetch cart from server
    fetchCart: async () => {
        try {
            const res = await axiosClient.get("/cart");
            set({ cart: res.data });
        } catch (err) {
        }
    },

    updateCartProduct: async (productId: number, quantity: number) => {
        try {
            set({ isLoaderProd: productId });

            const res = await axiosClient.patch(`/cart/products/${productId}`, {
                quantity,
            });

            const updatedProduct: CartProduct[] = res.data;

            set((state) => ({
                cart: state.cart.map((p) =>
                    p.id === updatedProduct?.[0]?.id ? updatedProduct[0] : p
                ),
                isLoaderProd: null,
            }));
        } catch (err) {
            set({ isLoaderProd: null });
        }
    },

    deleteCartProduct: async (productId: number) => {
        try {
            set({ isLoaderProd: productId });

            await axiosClient.delete(`/cart/products/${productId}`);

            set((state) => ({
                cart: state.cart.filter((p) => p.id !== productId),
                isLoaderProd: null,
            }));
        } catch (err) {
            set({ isLoaderProd: null });
        }
    },
}));