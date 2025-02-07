import { FILES_URL, FILES_CSV_URL, fileRequest } from './file.config.js'

export async function getAvailableFilesData () {
  try {
    const response = await fileRequest(FILES_URL)
    return response || []
  } catch (error) {
    console.error('Error fetching available files:', error.message)
    return []
  }
}

export async function fetchFilesData (fileNameQuery = '') {
  const filesResponse = await getAvailableFilesData()

  let files = filesResponse?.files

  const availableFiles = []

  if (fileNameQuery) {
    const regex = new RegExp(fileNameQuery, 'i')
    files = files.filter(file => regex.test(file))
  }

  for (const fileName of files) {
    const fileData = await fetchCSV(fileName)
    if (!fileData) continue

    const fileArray = await parseCSV(fileData)

    const fileObjectFormatted = formatFile(fileArray)
    if (!fileObjectFormatted) continue

    availableFiles.push(fileObjectFormatted)
  }

  return availableFiles
}

async function fetchCSV (fileName) {
  const URL = FILES_CSV_URL + fileName
  const response = await fileRequest(URL)
  return response
}

export function parseCSV (csvText) {
  const lines = csvText.split('\n')
  const nonEmptyLines = lines.filter(line => line.trim() !== '')
  const headers = nonEmptyLines[0].split(',').map(header => header.trim())

  // Obtengo las lineas válidas
  const data = nonEmptyLines.slice(1).map((line) => {
    const values = line.split(',').map(value => value.trim())

    if (values.length !== headers.length) {
      // Si no coincide el total de columnas de los headers con el de la linea, entonces es invalida.
      return null
    }

    const rowData = headers.reduce((acc, header, index) => {
      acc[header] = values[index]
      return acc
    }, {})

    return rowData
  })

  // Devuelvo solo las lineas válidas
  return data.filter(row => row !== null)
}

export function formatFile (fileArray) {
  const grouped = fileArray.reduce((acc, curr) => {
    const { file, text, number, hex } = curr

    if (!isFileValid(curr)) {
      return acc
    }

    // Creo el objeto file en el primer caso
    if (!acc[file]) {
      acc[file] = {
        file,
        lines: []
      }
    }

    acc[file].lines.push({
      text,
      number: parseInt(number, 10),
      hex
    })

    return acc
  }, {})

  return Object.values(grouped)[0]
}

function isFileValid (fileObject) {
  const { file, text, number, hex } = fileObject
  if ((!file || !text || isNaN(number) || !hex || hex.length !== 32 || !isHexadecimal(hex))) {
    return false
  }
  return true
}

function isHexadecimal (str) {
  // Chequea si el string contiene números del 0 al 9, y letras de la A a la F
  return /^[0-9A-Fa-f]+$/.test(str)
}
