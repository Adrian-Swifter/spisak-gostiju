const getItemCountFromLocalStorage = (key: string) => {
  const savedItem = localStorage.getItem(key);
  return savedItem ? JSON.parse(savedItem).length : 0;
};

export default getItemCountFromLocalStorage;
