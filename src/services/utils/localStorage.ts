export const getLocalStorageEntity = (name: string) => {
  const entity = localStorage.getItem(name);
  return entity ? JSON.parse(entity) : null;
}

export const setLocalStorageEntity = (name: string, value: any) => {
  return localStorage.setItem(name, JSON.stringify(value));
}