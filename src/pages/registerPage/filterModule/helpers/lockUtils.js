export function lock({ fieldSelect, valueWrapper, sortButtonsWrapper }) {
  fieldSelect.disabled = true;
  valueWrapper.querySelectorAll("input, select, button").forEach(el => {
    el.disabled = true;
    el.style.pointerEvents = "none";
  });
  if (sortButtonsWrapper)
    sortButtonsWrapper.querySelectorAll("button").forEach(b => b.disabled = true);
}

export function unlock({ fieldSelect, valueWrapper, sortButtonsWrapper }) {
  fieldSelect.disabled = false;
  valueWrapper.querySelectorAll("input, select, button").forEach(el => {
    el.disabled = false;
    el.style.pointerEvents = "auto";
  });
  if (sortButtonsWrapper)
    sortButtonsWrapper.querySelectorAll("button").forEach(b => b.disabled = false);
}
