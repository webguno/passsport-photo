export type Unit = 'mm' | 'cm' | 'inch' | 'px';

export interface PhotoSize {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: Unit;
}

export type PaperSize = 'A4' | 'Letter';
export type PaperOrientation = 'portrait' | 'landscape';

export interface AppState {
  step: number;
  originalImage: string | null;
  croppedImage: string | null;
  
  photoSize: PhotoSize;
  customWidth: number;
  customHeight: number;
  customUnit: Unit;
  
  backgroundColor: string;
  borderWidth: number; // in mm
  borderColor: string;
  innerMargin: number; // in mm
  marginColor: string;
  
  paperSize: PaperSize;
  paperOrientation: PaperOrientation;
  
  quantity: number | 'auto';
  spacing: number; // in mm
  pageMargin: number; // in mm
  showCropMarks: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetDoc: () => void;
  
  setOriginalImage: (image: string | null) => void;
  setCroppedImage: (image: string | null) => void;
  
  setPhotoSize: (size: PhotoSize) => void;
  setCustomSize: (width: number, height: number, unit: Unit) => void;
  
  setBackgroundColor: (color: string) => void;
  setBorder: (width: number, color: string) => void;
  setInnerMargin: (margin: number) => void;
  setMarginColor: (color: string) => void;
  
  setPaperConfig: (size: PaperSize, orientation: PaperOrientation) => void;
  setQuantity: (quantity: number | 'auto') => void;
  setSpacing: (spacing: number) => void;
  setPageMargin: (margin: number) => void;
  setCropMarks: (show: boolean) => void;
}

export const PRESET_SIZES: PhotoSize[] = [
  { id: 'indian', name: 'Indian Passport', width: 35, height: 45, unit: 'mm' },
  { id: 'us', name: 'US Passport', width: 2, height: 2, unit: 'inch' },
  { id: 'visa', name: 'Visa Photo', width: 35, height: 45, unit: 'mm' },
  { id: 'canada', name: 'Canada Passport', width: 50, height: 70, unit: 'mm' },
  { id: 'custom', name: 'Custom Size', width: 35, height: 45, unit: 'mm' },
];
