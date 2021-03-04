import { getLocalStorageEntity } from '../utils';


export const makeFakeAPICall = async () => {
  return new Promise((resolve, reject) => {
    const timer:any = setTimeout(() => {
      return resolve(clearTimeout(timer));
    }, 1000)
  })
}


export const getBooks = async () => {
  await makeFakeAPICall(); // Dummy колл симуляции запроса
  const stored = getLocalStorageEntity("storedBooks");
  
  return stored || [];
}