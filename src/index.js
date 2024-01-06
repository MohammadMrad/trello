import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import "font-awesome/css/font-awesome.min.css"
import App from "./App"
import "./assets/styles/reset.css"
import "./index.css"
import { register } from "register-service-worker"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

register()
