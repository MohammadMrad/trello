import React, { useEffect, useState } from "react"
import { internetAction } from "../../action/internetAction"
import { useDispatch, useSelector } from "react-redux"

const InternetChecker = () => {
  const dispatch = useDispatch()

  const [pageHeight, setPageHeight] = useState(() => window.innerHeight)
  const [pageWidth, setPageWidth] = useState(() => window.innerWidth)

  const onlineState = useSelector((state) => state.online)
  const { online } = onlineState

  const handleCheckInternet = () => {
    return navigator.onLine ? true : false
  }

  useEffect(() => {
    setInterval(() => dispatch(internetAction(handleCheckInternet())), 5000)
  }, [])

  return !online ? (
    <div
      className="fixed z-30 transition-all shadow bg-gray-200 w-full sm:w-80 flex justify-center rounded"
      style={{
        top: pageWidth > 640 ? `${pageHeight - 130}px` : "0",
        transform: online ? "translateX(-50%)" : "translateX(10%)",
        transform: pageWidth > 640 ? "translateX(10%)" : "translateX(0)",
      }}
    >
      <article className="flex items-center justify-center w-80 p-4 *:px-3">
        <section>
          <i className="fa fa-exclamation-triangle text-orange-800 text-3xl"></i>
        </section>
        <section>
          <div>You are offline!</div>
          <p className="font-['Shabnam-Thin'] font-bold text-sm mt-2">
            Changes made now will not be saved.
          </p>
        </section>
      </article>
    </div>
  ) : null
}

export default InternetChecker
