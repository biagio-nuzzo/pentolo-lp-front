"use client"
// Built-in
import { useEffect, useState } from "react"
// Libraries
import Image from "next/image"
// Components
import { Container, ScrollTranslateText } from "@/ui"

const AdSection = ({
  texts,
  imageSrc,
  imageAlt,
}: {
  texts: {
    first: string
    second: string
    third: string
  }
  imageSrc: string
  imageAlt: string
}) => {
  const [distance, setDistance] = useState(100)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 540px)")
    const update = () => setDistance(mq.matches ? 40 : 100)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <section className="px-8 md:px-16 py-24 md:py-32 overflow-hidden">
      <Container>
        {/* Accent line above */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="w-16 h-1.5 bg-primary rounded-full border border-black" />
        </div>

        {/* Wrapper: image is the base, texts overlay on top */}
        <div className="relative w-full h-115 md:h-151 rounded-2xl overflow-hidden shadow-xs">
          {/* Background image */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1560px) calc(100vw - 128px), 1432px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            draggable={false}
          />

          {/* Light overlay for text readability */}
          {/* <div className="absolute inset-0 bg-white/30 z-5" /> */}

          {/* Text overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 md:gap-4">
            {/* First — centered, moves left on scroll */}
            <ScrollTranslateText
              direction="left"
              distance={distance}
              className="text-[32px] md:text-[64px] xl:text-[100px] leading-[1em] text-black font-medium text-center"
            >
              <h2>{texts.first}</h2>
            </ScrollTranslateText>

            {/* Second — centered, moves right on scroll */}
            <ScrollTranslateText
              direction="right"
              distance={distance}
              className="text-[32px] md:text-[64px] xl:text-[100px] leading-[1em] text-black font-medium italic text-center"
            >
              <h2>{texts.second}</h2>
            </ScrollTranslateText>

            {/* Third — centered, moves left on scroll */}
            <ScrollTranslateText
              direction="left"
              distance={distance}
              className="text-[32px] md:text-[64px] xl:text-[100px] leading-[1em] text-black font-medium text-center"
            >
              <h2>{texts.third}</h2>
            </ScrollTranslateText>
          </div>
        </div>

        {/* Accent line below */}
        <div className="flex justify-center mt-10 md:mt-14">
          <div className="w-32 h-1.5 bg-primary rounded-full border border-black" />
        </div>
      </Container>
    </section>
  )
}

export default AdSection
