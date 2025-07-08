import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page not found</h2>
        <p className="mt-4 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10">
          <Link to="/" className="btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}