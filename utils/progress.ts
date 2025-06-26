export const getProgress = (): { [key: string]: boolean } => {
  const stored = localStorage.getItem('progress');
  return stored ? JSON.parse(stored) : {};
};

export const setProgress = (moduleName: string) => {
  const current = getProgress();
  const updated = { ...current, [moduleName]: true };
  localStorage.setItem('progress', JSON.stringify(updated));
};
