"use client"
// Built-in
import { useRef } from "react"
// Libraries
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const ScrollScaleText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)

  // scrollYProgress: 0 = element's top hits viewport bottom, 1 = element's center hits viewport center
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })

  // Spring adds inertia: the value chases the scroll position with damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 40,
  })

  const scale = useTransform(smoothProgress, [0, 1], [0.75, 1])
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      transformTemplate={(_, generated) => `perspective(1200px) ${generated}`}
      style={{ scale, opacity, willChange: "transform" }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollScaleText
