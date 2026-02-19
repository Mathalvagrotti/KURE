export type InspectionStatus = 'SIM' | 'NAO' | 'NC' | null;

export interface ChecklistItemDef {
  id: string;
  description: string;
  quantityLabel?: string; // For questions like "Quantas unidades?"
  isEditable?: boolean; // For section 7 (Specific equipment)
}

export interface ChecklistSectionDef {
  id: string;
  title: string;
  items: ChecklistItemDef[];
}

export interface ItemResponse {
  itemId: string;
  status: InspectionStatus;
  observation: string;
  quantity?: string; // Stores the numeric input if quantityLabel exists
  photos: string[]; // Base64 or Blob URLs
  customDescription?: string; // For editable items
}

export interface InspectionHeaderData {
  unitType: string;
  plateOrId: string;
  clientName: string;
  inspectorName: string;
  date: string;
  city: string;
}

export interface InspectionData {
  header: InspectionHeaderData;
  responses: Record<string, ItemResponse>; // Keyed by itemId
}
