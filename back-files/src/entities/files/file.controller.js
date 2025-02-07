import { fetchFilesData, getAvailableFilesData } from './file.service.js'

export async function getFiles (req, res) {
  try {
    const { fileName } = req.query
    const files = await fetchFilesData(fileName)
    return res.status(200).json(files || [])
  } catch (error) {
    console.error('Error fetching files:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export async function getAvailableFiles (req, res) {
  try {
    const availableFiles = await getAvailableFilesData()
    return res.status(200).json(availableFiles || [])
  } catch (error) {
    console.error('Error fetching available files:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
