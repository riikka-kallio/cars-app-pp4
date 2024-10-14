import { useContext } from "react";

import { UIContext } from "./UI.context";

export default function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}