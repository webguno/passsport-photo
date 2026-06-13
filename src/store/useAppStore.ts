import { create } from 'zustand';
import { AppState, PRESET_SIZES } from '../types';

export const useAppStore = create<AppState>((set) => ({
  currentView: 'home',
  step: 1,
  originalImage: null,
  croppedImage: null,
  
  photoSize: PRESET_SIZES[0],
  customWidth: 35,
  customHeight: 45,
  customUnit: 'mm',
  
  backgroundColor: '#ffffff',
  borderWidth: 0,
  borderColor: '#000000',
  innerMargin: 0,
  
  paperSize: 'A4',
  paperOrientation: 'portrait',
  
  quantity: 'auto',
  spacing: 5,
  pageMargin: 10,
  showCropMarks: true,
  
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  resetDoc: () => set({
    step: 1,
    originalImage: null,
    croppedImage: null,
    photoSize: PRESET_SIZES[0],
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderColor: '#000000',
    innerMargin: 0,
    marginColor: '#ffffff',
    paperSize: 'A4',
    paperOrientation: 'portrait',
    quantity: 'auto',
    spacing: 5,
    pageMargin: 10,
    showCropMarks: true,
  }),
  
  setOriginalImage: (image) => set({ originalImage: image }),
  setCurrentView: (view) => set({ currentView: view }),
  setCroppedImage: (image) => set({ croppedImage: image }),
  
  setPhotoSize: (size) => set({ photoSize: size }),
  setCustomSize: (width, height, unit) => set({ customWidth: width, customHeight: height, customUnit: unit }),
  
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setBorder: (width, color) => set({ borderWidth: width, borderColor: color }),
  setInnerMargin: (margin) => set({ innerMargin: margin }),
  setMarginColor: (color) => set({ marginColor: color }),
  
  setPaperConfig: (paperSize, paperOrientation) => set({ paperSize, paperOrientation }),
  setQuantity: (quantity) => set({ quantity }),
  setSpacing: (spacing) => set({ spacing }),
  setPageMargin: (margin) => set({ pageMargin: margin }),
  setCropMarks: (show) => set({ showCropMarks: show }),
}));
