"use client"
// Built-in
import { useRef } from "react"
// Libraries
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

type UseScrollOffset = Exclude<
  Parameters<typeof useScroll>[0],
  undefined
>["offset"]

interface RotatingImageProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  /**
   * Aspect ratio del container (es: "4/3", "16/9", "1/1")
   * Se non specificato, usa 4/3 come default
   */
  aspectRatio?: string
  /**
   * Altezza fissa del container (es: "500px", "30rem")
   * Se specificata, sovrascrive l'aspect ratio
   */
  height?: string
  /**
   * Angolo di rotazione iniziale in gradi (es: 25, 10, 5, 0)
   * Default: 25. Usa 0 per immagini con testo che deve essere sempre leggibile
   */
  initialRotation?: number
  /**
   * Comportamento dell'immagine nel container:
   * - "cover" (default): riempie il container, può tagliare l'immagine
   * - "contain": mostra l'immagine intera senza tagli
   */
  objectFit?: "cover" | "contain"
  /**
   * Altezza minima del container (es: "540px"), combinabile con aspectRatio
   */
  minHeight?: string
  offset?: UseScrollOffset
  /**
   * Se true, usa un div con background-image al posto di next/image.
   * Utile per evitare stretching con immagini che non si adattano bene a fill.
   */
  asBackground?: boolean
}

const RotatingImage = ({
  src,
  alt,
  className = "",
  priority = false,
  aspectRatio = "4/3",
  height,
  initialRotation = 25,
  objectFit = "cover",
  minHeight,
  offset,
  asBackground = false,
  imageClassName = "",
}: RotatingImageProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset ?? (["start end", "end end"] as UseScrollOffset),
  })

  // Spring physics ottimizzato per animazione rapida e fluida
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
    restSpeed: 0.01,
  })

  // Rotazione 3D: da inclinato (initialRotation) a piatto (0deg)
  const rotateX = useTransform(smoothProgress, [0, 1], [initialRotation, 0])

  // Determina lo stile del container: altezza fissa o aspect ratio
  const containerStyle = height
    ? { height, minHeight }
    : { aspectRatio: aspectRatio.replace("/", " / "), minHeight }

  return (
    <motion.div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{
        willChange: "transform",
        opacity: 1,
      }}
    >
      <motion.div
        style={{
          rotateX,
          willChange: "transform",
          ...containerStyle,
        }}
        // Applica perspective(1200px) come nel template Dino
        transformTemplate={({ rotateX }) =>
          `perspective(1200px) rotateX(${rotateX})`
        }
        className={`relative w-full rounded-3xl shadow-lg overflow-hidden border border-black/10 ${imageClassName}`}
      >
        {asBackground ? (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: objectFit,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={`object-${objectFit} object-center w-full h-full`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default RotatingImage
