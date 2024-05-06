import {create} from "zustand";

interface NavbarState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: (isUserMenuOpen: boolean) => void;
}

export const useNavbar = () => {
    return useNavbarStore((state) => state);

};

export const useNavbarStore = create<NavbarState>()(
    (set) => ({
        isOpen: false,
        setIsOpen: (isOpen) => set({isOpen}),
        isUserMenuOpen:false,
        setIsUserMenuOpen(isUserMenuOpen) {
            set({isUserMenuOpen})
        },

    }),
)
