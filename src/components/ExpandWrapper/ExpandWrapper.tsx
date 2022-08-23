import React, { useEffect, useRef, useState } from "react"
import { debounce } from "lodash"

type ExpandWrapperProps = {
  bottom?: number
  disabled?: boolean
  disabledHeight?: string | number
  minHeight?: string | number
}

const ExpandWrapper = ({
  children,
  bottom = 20,
  minHeight,
  disabledHeight,
  disabled = false,
}: React.PropsWithChildren<ExpandWrapperProps>) => {
  const [height, setHeight] = useState<number | string>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const anchorEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calcHeight = () => {
      if (anchorEndRef.current && wrapperRef.current) {
        const height =
          anchorEndRef.current.getBoundingClientRect().y -
          wrapperRef.current.getBoundingClientRect().y

        setHeight(height)
      }
    }

    calcHeight()

    const debouncedListener = debounce(calcHeight, 1000)

    window.addEventListener("resize", debouncedListener)

    return () => {
      window.removeEventListener("resize", debouncedListener)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        minHeight,
        height: disabled ? disabledHeight : height,
      }}
    >
      {children}
      <div ref={anchorEndRef} style={{ position: "fixed", bottom }} />
    </div>
  )
}

export default React.memo(ExpandWrapper)
