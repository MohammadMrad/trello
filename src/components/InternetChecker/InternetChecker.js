import React, { useEffect, useState } from "react"
import "./InternetChecker.css"
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
      className="internet-checker"
      style={{
        top: `${pageHeight - 120}px`,
        transform: online ? "translateX(-50%)" : "translateX(10%)",
      }}
    >
      <article className="internet-checker__error">
        <section>
          <i className="fa fa-exclamation-triangle"></i>
        </section>
        <section>
          <div>You are offline!</div>
          <p className="internet-checker__massege">
            Changes made now will not be saved.
          </p>
        </section>
      </article>
    </div>
  ) : null
}

export default InternetChecker
