import { toPng } from 'html-to-image'

export const downloadPinImage = async (elementId: string, fileName: string) => {
  // 1. Find the HTML element on the screen that we want to screenshot
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with ID ${elementId} not found.`)
    return
  }

  try {
    // 2. Convert that exact HTML element into a high-quality PNG image
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // This ensures the downloaded image is crisp, not blurry!
    })

    // 3. Create a temporary invisible link and click it to force the browser to download
    const link = document.createElement('a')
    link.download = `${fileName}.png`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error('Failed to generate image:', err)
  }
}
