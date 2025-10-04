import { filterFields } from "../filterConsts/filterConsts.js";
import { createSelect } from "../helpers/createSelect.js";
import { createTextInput } from "../helpers/createTextInput.js";
import { createDateRangeInputs } from "../helpers/createDateRanges.js";
import { setFilters } from "./filterUtils.js";
import { filterRefs } from "../filterConsts/filterConsts.js";

export function renderValueInput(fieldId, data, apply) {
  const { valueWrapper, fieldSelect } = filterRefs;
  valueWrapper.innerHTML = "";
  if (!fieldId) return;

  const fieldInfo = filterFields.find(f => f.id === fieldId);
  if (!fieldInfo) return;

  let inputElement;

  if (fieldInfo.type === "select") {
    const uniqueValues = [...new Set(data.map(f => f[fieldId]).filter(Boolean))];
    inputElement = createSelect(uniqueValues, value => {
      setFilters({ [fieldId]: value });
      apply();
    });
  } else if (fieldInfo.type === "date") {
    inputElement = createDateRangeInputs(range => {
      setFilters({ [fieldId]: range });
      apply();
    });
  } else {
    inputElement = createTextInput(value => {
      setFilters({ [fieldId]: value });
      apply();
    });
  }

  if (fieldSelect.disabled) inputElement.disabled = true;
  valueWrapper.appendChild(inputElement);
}
