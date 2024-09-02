import { useEffect, useState } from 'react'
import { CurrencyData, getRateByCurrency } from '../../api/api'
import { widgetKey } from 'electron/store'
import { extractMainColorFromImage } from '../../utils/colorUtils'

export function CurrencyInfoCard() {
  const [loading, setLoading] = useState(true)
  const [currency, setCurrency] = useState<string>()
  const [imgColor, setImgColor] = useState<string>()
  const [currencyData, setCurrencyData] = useState<CurrencyData>(null)

  useEffect(() => {
    const currencyStore = window.store.get('NerkhYab' as widgetKey.NerkhYab)
    setCurrency(currencyStore.currencies[0])

    async function fetchData() {
      const data = await getRateByCurrency(currencyStore.currencies[0])
      if (data) {
        setCurrencyData(data)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      setCurrencyData(undefined)
      setLoading(true)
    }
  }, [])

  useEffect(() => {
    if (currencyData && currency) {
      extractMainColorFromImage(currencyData.icon).then((color) => {
        setImgColor(color)
      })
    }
  }, [currencyData, currency])

  return (
    <article className="space-y-3 my-2">
      <section className="flex items-center justify-around">
        {loading ? (
          <div
            className="w-12 h-12 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700"
            aria-label="currency image container loading"
          />
        ) : (
          <div
            className="w-12 h-12 relative rounded-full"
            aria-label="currency image container"
          >
            <img
              src={currencyData.icon}
              className="w-10 h-10 rounded-full"
              alt="currency country flag"
            />
            <div
              className="h-full w-full blur-lg absolute top-0 left-0"
              style={{
                backgroundImage: `radial-gradient(50% 50% at 50% 50%, ${imgColor} 50%, ${imgColor + '00'} 45%)`,
              }}
            />
          </div>
        )}

        <div aria-label="currency text container">
          {loading ? (
            <div className="h-5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2.5" />
          ) : (
            <h3 className="text-lg font-normal text-right text-gray-600 text-gray-transparent dark:text-[#eee] truncate">
              {currencyData.name}
            </h3>
          )}
        </div>
      </section>
      <section className="flex items-center justify-around">
        <div className="flex flex-col">
          <div>
            {loading ? (
              <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-2.5"></div>
            ) : (
              <p className="text-[1.2rem]  text-gray-600 text-gray-transparent dark:text-[#d3d3d3]">
                {currencyData.todyPrice.toLocaleString()}
              </p>
            )}
          </div>
          <div>
            {loading ? (
              <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-5 mb-2.5" />
            ) : (
              <p className="text-xs font-light text-gray-600 text-gray-transparent dark:text-[#cbc9c9]">
                1 {currency.toUpperCase()}
              </p>
            )}
          </div>
        </div>
        <div className="w-[60px]" />
      </section>
    </article>
  )
}
