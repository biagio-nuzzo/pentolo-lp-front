"use client"
// Built-in
import { useRef } from "react"
// Libraries
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const ScrollTranslateText = ({
  children,
  className,
  direction = "right",
  distance = 100,
}: {
  children: React.ReactNode
  className?: string
  /** Direction of the parallax translation */
  direction?: "left" | "right"
  /** Max translateX distance in px */
  distance?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 40,
  })

  // Translate from 0 (center) to ±distance as scroll progresses
  const to = direction === "right" ? distance : -distance
  const translateX = useTransform(smoothProgress, [0, 1], [0, to])
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      transformTemplate={(_, generated) => `perspective(1200px) ${generated}`}
      style={{ translateX, opacity, willChange: "transform" }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollTranslateText
