export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return ''
  }

  // Calculate bounding box of the rotated image
  const boundingBoxWidth =
    Math.abs(Math.cos(getRadianAngle(rotation)) * image.width) +
    Math.abs(Math.sin(getRadianAngle(rotation)) * image.height)
  const boundingBoxHeight =
    Math.abs(Math.sin(getRadianAngle(rotation)) * image.width) +
    Math.abs(Math.cos(getRadianAngle(rotation)) * image.height)

  // set canvas size to match the bounding box
  canvas.width = boundingBoxWidth
  canvas.height = boundingBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw original image onto the canvas
  ctx.drawImage(image, 0, 0)

  // extracted cropped image
  const croppedCanvas = document.createElement('canvas')
  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return ''
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  return croppedCanvas.toDataURL('image/png');
}
