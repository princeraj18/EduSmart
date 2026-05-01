import axios from "axios"

// Ensure the base URL includes a protocol. If the env var is missing a scheme
// (e.g. "localhost:5000/api"), prepend http:// so axios doesn't throw
// "Unsupported protocol" errors.
const getBaseUrl = () => {
  let base = import.meta.env.VITE_BASE_URL || ''
  base = String(base).trim()
  if (!base) return ''
  if (!/^https?:\/\//i.test(base)) {
    base = `http://${base}`
  }
  // remove trailing slash for consistent concatenation
  return base.replace(/\/+$/g, '')
}

const buildUrl = (path) => {
    const base = getBaseUrl()
    let normalizedPath = path.startsWith('/') ? path : `/${path}`

    if (!base) {
        if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.debug('API request URL:', normalizedPath)
        }
        return normalizedPath
    }

    let finalBase = base.replace(/\/+$/g, '')
    const baseHasApi = /\/api(\/|$)/i.test(finalBase)
    const pathHasApi = /^\/api(\/|$)/i.test(normalizedPath)

    if (!baseHasApi && !pathHasApi) {
        finalBase += '/api'
    } else if (baseHasApi && pathHasApi) {
        normalizedPath = normalizedPath.replace(/^\/api(\/|$)/i, '/')
    }

    const url = `${finalBase}${normalizedPath}`
    if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug('API request URL:', url)
    }
    return url
}

export const registerApi = async(payload)=>{
    const url = buildUrl('/register')
    const res = await axios.post(url,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
    )

    return res.data
}


export const loginApi = async(payload)=>{
    const url = buildUrl('/login')
    const res = await axios.post(url,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    )

    return res.data
}

export const getUser = async()=>{
    const url = buildUrl('/getUser')
    const res = await axios.get(url,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    )

    return res.data
}


export const logoutApi = async()=>{
    const url = buildUrl('/logout')
    const res = await axios.post(url,
        {},
         {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    )
    return res.data
}

// Export helpers so other API modules can normalize URLs the same way
export { getBaseUrl, buildUrl }