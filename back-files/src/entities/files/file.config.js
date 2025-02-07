import { get } from '../../utils/http.js'

export const FILES_URL = 'https://echo-serv.tbxnet.com/v1/secret/files'
export const FILES_CSV_URL = 'https://echo-serv.tbxnet.com/v1/secret/file/'
export const FILES_KEY = 'aSuperSecretKey' // Esto estaría en un .env

export async function fileRequest (url) {
  return await get(url, {
    headers: {
      Authorization: `Bearer ${FILES_KEY}`
    }
  })
}
