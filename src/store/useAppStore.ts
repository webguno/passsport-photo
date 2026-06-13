import { create } from 'zustand';
import { AppState, PRESET_SIZES } from '../types';

export const useAppStore = create<AppState>((set) => ({
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
  
  paperSize: 'A4',
  paperOrientation: 'portrait',
  
  quantity: 'auto',
  spacing: 5,
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
    paperSize: 'A4',
    paperOrientation: 'portrait',
    quantity: 'auto',
    spacing: 5,
    showCropMarks: true,
  }),
  
  setOriginalImage: (image) => set({ originalImage: image }),
  setCroppedImage: (image) => set({ croppedImage: image }),
  
  setPhotoSize: (size) => set({ photoSize: size }),
  setCustomSize: (width, height, unit) => set({ customWidth: width, customHeight: height, customUnit: unit }),
  
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setBorder: (width, color) => set({ borderWidth: width, borderColor: color }),
  
  setPaperConfig: (paperSize, paperOrientation) => set({ paperSize, paperOrientation }),
  setQuantity: (quantity) => set({ quantity }),
  setSpacing: (spacing) => set({ spacing }),
  setCropMarks: (show) => set({ showCropMarks: show }),
}));
