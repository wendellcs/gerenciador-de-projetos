import { BrowserRouter} from 'react-router-dom'
import RoutesApp from './services/routes/index.jsx'

import './assets/sass/_reset.sass'
function App() {
  return (
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  )
}

export default App
