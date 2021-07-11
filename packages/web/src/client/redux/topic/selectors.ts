import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const selectSelf = (state: AppState) => state;

export const topicSelector = createSelector(selectSelf, (state) => state.topic);
