import fetch from 'node-fetch'

export async function get (url, options) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      ...options
    })

    if (!response.ok) throw new Error(`HTTP error. Status: ${response.status}`)

    const contentType = response.headers.get('content-type')

    return contentType?.includes('application/json')
      ? response.json()
      : response.text()
  } catch (error) {
    console.error('Fetch error:', error.message)
    return false
  }
}
