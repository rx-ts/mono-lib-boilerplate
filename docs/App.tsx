import { lazy, Suspense } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
  Navigate,
} from 'react-router-dom'

import './global.scss'
import 'github-markdown-css'

const Readme = () => {
  const { name } = useParams<{ name: string }>()

  const Readme = lazy(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    name ? import(`../packages/${name}/README.md`) : import('../README.md'),
  )
  return (
    <Suspense>
      <Readme />
    </Suspense>
  )
}

const Changelog = () => {
  const { name } = useParams<{ name: string }>()
  const Changelog = lazy(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    name
      ? import(`../packages/${name}/CHANGELOG.md`)
      : import('../CHANGELOG.md'),
  )
  return (
    <Suspense>
      <Changelog />
    </Suspense>
  )
}

export const App = () => (
  <Router>
    <Routes>
      <Route
        path="/packages/:name"
        element={<Readme />}
      />
      <Route
        path="/CHANGELOG.md"
        element={<Changelog />}
      />
      <Route
        path="/packages/:name/CHANGELOG.md"
        element={<Changelog />}
      />
      <Route
        path="/"
        element={<Readme />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
      ></Route>
    </Routes>
  </Router>
)
