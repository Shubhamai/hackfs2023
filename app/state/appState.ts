import { create } from "zustand";

type appState = {};

const useAppState = create<appState>()((set) => ({}));

export default useAppState;
