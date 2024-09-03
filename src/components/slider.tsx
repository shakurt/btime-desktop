import moment from 'jalali-moment'
import { useCallback, useEffect, useState } from 'react'
import { Carousel, IconButton } from '@material-tailwind/react'
import { JalaliSlider } from './sliders/jalali/slider'
import { GregorianSlider } from './sliders/gregorian/slider'
import PrevIcon from './icons/Prev'
import NextIcon from './icons/Next'

interface Prop {
  showArrows: boolean
}

export function Slider(prop: Readonly<Prop>) {
  const [currentTime, setCurrentTime] = useState(moment())
  const { showArrows } = prop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment())
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const PrevArrow = useCallback(
    (props) => (
      <IconButton
        variant="text"
        size="sm"
        color="blue-gray"
        onClick={props.handlePrev}
        className={`!absolute top-2/4 dark:text-white arrow_btn left-4 -translate-y-2/4  ${
          !showArrows && 'hidden'
        } `}
      >
        <PrevIcon className="h-6 w-6" />
      </IconButton>
    ),
    [showArrows]
  )

  const NextArrow = useCallback(
    (props) => (
      <IconButton
        variant="text"
        size="sm"
        color="blue-gray"
        onClick={props.handleNext}
        className={`!absolute top-2/4 dark:text-white arrow_btn !right-4 -translate-y-2/4  ${
          !showArrows && 'hidden'
        } `}
      >
        <NextIcon className="h-6 w-6" />
      </IconButton>
    ),
    [showArrows]
  )

  const Navigation = useCallback(
    (props) => (
      <div
        className={`absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 ${
          !showArrows && 'hidden'
        }`}
      >
        {new Array(props.length).fill('').map((_, i) => (
          <button
            key={i + 1}
            className={`block h-1 rounded-2xl transition-all content-['']
               ${
                 props.activeIndex === i
                   ? 'w-4 bg-white/50 cursor-default'
                   : 'w-8 bg-gray-600 cursor-pointer'
               }`}
            onClick={() => props.setActiveIndex(i)}
          />
        ))}
      </div>
    ),
    [showArrows]
  )

  return (
    <Carousel
      loop={true}
      className="rounded-xl"
      prevArrow={PrevArrow}
      nextArrow={NextArrow}
      navigation={Navigation}
    >
      <JalaliSlider currentTime={currentTime} />
      <GregorianSlider currentTime={currentTime} />
    </Carousel>
  )
}
