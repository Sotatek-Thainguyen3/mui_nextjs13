import { STEP } from "@/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";

export type TCollectInfoData = {
  // name: string,
  // price: string,
  // amount: string,
  [key: number]: {
    step: STEP,
    value: any
  }
};

export interface TransferApp {
  currentStep: STEP;
  previousStep: STEP;
  focusField: string;
  isOnEditMode: boolean;
  dataCollectInfo: TCollectInfoData | null;
}

const initialState: TransferApp = {
  currentStep: STEP.LANDING_PAGE,
  previousStep: STEP.LANDING_PAGE,
  isOnEditMode: false,
  dataCollectInfo: null,
  focusField: ""
};

const transferReducer = createSlice({
  initialState,
  name: "transfer",
  reducers: {
    _setStep(state, action: PayloadAction<{ step: STEP, editMode?: boolean }>) {
      state.previousStep = state.currentStep;
      state.currentStep = action.payload.step;
      state.isOnEditMode = action.payload.editMode ?? false;
    },
    _backStep(state, action: PayloadAction<STEP | undefined>) {
      const newStep = action?.payload ?? state.currentStep;
      if (newStep > 0) {
        state.previousStep = newStep;
        state.currentStep = newStep - 1;
      } else if (newStep === 0) {
        state.previousStep = newStep;
        state.currentStep = newStep;
      }
      state.isOnEditMode = false;
    },
    _nextStep(state, action: PayloadAction<STEP | undefined>) {
      const newStep = action?.payload ?? state.currentStep + 1;
      if (newStep === STEP.COLLECT_INFO) {
        state.previousStep = newStep;
        state.currentStep = newStep;
      } else if (state.previousStep === STEP.COLLECT_INFO) {
        state.currentStep = STEP.COLLECT_INFO;
      } else {
        state.previousStep = newStep - 1;
        state.currentStep = newStep;
      }
      state.isOnEditMode = false;
    },
    _updateCollectInfo(state, action: PayloadAction<any>) {
      state.dataCollectInfo = action.payload
    },
    _updateCollectInfoOne(state, action: PayloadAction<any>) {
      const newValue = { [state.currentStep]: { step: state.currentStep, value: action.payload } };
      state.dataCollectInfo = { ...state.dataCollectInfo, ...newValue };
      state.focusField = ''
    },
    _changeStep(state, action: PayloadAction<{ step: STEP, focus?: string }>) {
      state.currentStep = action.payload.step;
      state.focusField = action.payload.focus || "";
      state.isOnEditMode = true;
    },
    _reset: () => initialState,
  },
});

const { reducer, actions } = transferReducer;
export const selectTransfer = (state: RootState) => state.transfer;
export const { _setStep, _backStep, _nextStep, _changeStep, _updateCollectInfo, _updateCollectInfoOne, _reset } = actions;
export default reducer;
