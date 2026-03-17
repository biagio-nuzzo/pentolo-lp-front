import clsx from "clsx"

const GridTwoCol = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  // Classes
  const classes = clsx(
    "grid md:grid-cols-2 gap-x-6 xl:gap-x-12 gap-y-12",
    className
  )

  return <div className={classes}>{children}</div>
}

export default GridTwoCol
