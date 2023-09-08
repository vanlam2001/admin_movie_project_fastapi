import { BrowserRouter, Route, Routes } from "react-router-dom"
import { adminRoute } from "./routes/adminRoute"
import Spinner from "./Components/Spinner/Spinner"

function App() {


  return (
    <>
      <Spinner></Spinner>
      <BrowserRouter>
        <Routes>
          {adminRoute.map(({ url, component }, index) => {
            return <Route key={index} path={url} element={component} />
          })}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
