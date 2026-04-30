import React from "react";
import {SymbolKind} from "lexy/dist/language/symbols/symbolKind";

export interface SuggestionModel {
  name: string;
  description: string | null;
  kind: SymbolKind;
}
