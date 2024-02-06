import { STEP } from "@/constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { _backStep, _changeStep, _nextStep, _updateCollectInfo, _setStep, TCollectInfoData, _updateCollectInfoOne } from "./reducer";
import { useCallback, useMemo } from "react";

export const collectInfoDataOrder = [STEP.HOME, STEP.TRANSFER];

export const useTransfer = () => {
  const dispatch = useAppDispatch();
  const { currentStep, previousStep, dataCollectInfo, focusField, isOnEditMode } = useAppSelector(
    (state) => state.transfer
  );

  const onSetStep = (step: STEP, editMode?: boolean) => {
    dispatch(_setStep({ step, editMode }));
  };

  const onBackStep = (step?: STEP, clearData?: boolean) => {
    const lastIndex = currentStep as number;
    const lastDataCollect = {} as TCollectInfoData;

    for (const [key, value] of Object.entries(dataCollectInfo || {})) {
      console.log(key, value, lastIndex, +key < lastIndex);
      if (+key < lastIndex) {
        lastDataCollect[+key] = value
      }
    }
    console.log(lastDataCollect);
    dispatch(_updateCollectInfo(lastDataCollect))
    dispatch(_backStep(step));
  };

  const onNextStep = useCallback((step?: STEP) => {
    dispatch(_nextStep(step));
  }, [dispatch]);

  const onChangeStep = (step: STEP, focus?: string) => {
    dispatch(_changeStep({ step, focus }));
  };

  const onSetDataTransfer = (data: any) => {
    dispatch(_updateCollectInfoOne(data));
  }

  const allCollectInfo = useMemo(() => {
    const obj = {};
    for (const [_, value] of Object.entries(dataCollectInfo || {})) {
      Object.assign(obj, value.value);
    }
    return obj;
  }, [dataCollectInfo]);

  return {
    currentStep,
    previousStep,
    dataCollectInfo,
    allCollectInfo,
    isOnEditMode,
    focusField,
    onSetStep,
    onBackStep,
    onNextStep,
    onChangeStep,
    onSetDataTransfer,
  };
};
