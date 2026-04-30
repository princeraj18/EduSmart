import React from "react";

export default function ResourceCard({ resource }) {
  const extractVideoId = (url) => {
    if (!url) return null
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v')
        if (v) return v
        const parts = u.pathname.split('/')
        const idx = parts.indexOf('embed')
        if (idx !== -1 && parts[idx + 1]) return parts[idx + 1]
      }
    } catch (e) {
      // fall through to regex
    }

    const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return m ? m[1] : null
  }

  const extractPlaylistId = (url) => {
    if (resource.playlistId) return resource.playlistId
    if (!url) return null
    try {
      const u = new URL(url)
      const list = u.searchParams.get('list')
      if (list) return list
    } catch (e) {
      // ignore
    }
    const m = url.match(/[?&]list=([a-zA-Z0-9_-]+)/)
    return m ? m[1] : null
  }

  const getEmbedUrl = (url) => {
    const playlistId = extractPlaylistId(url)
    if (playlistId) return `https://www.youtube.com/embed/videoseries?list=${playlistId}`
    const vid = extractVideoId(url)
    if (vid) return `https://www.youtube.com/embed/${vid}`
    return url || ''
  }

  const getExternalUrl = (url) => {
    const playlistId = extractPlaylistId(url)
    if (playlistId) return `https://www.youtube.com/playlist?list=${playlistId}`
    const vid = extractVideoId(url)
    if (vid) return `https://www.youtube.com/watch?v=${vid}`
    return url || ''
  }

  const embedUrl = getEmbedUrl(resource.youtubeUrl)
  const externalUrl = getExternalUrl(resource.youtubeUrl)

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px" }}>
      <h3 style={{ margin: 0 }}>
        {externalUrl ? (
          <a href={externalUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            {resource.title}
          </a>
        ) : (
          resource.title
        )}
      </h3>

      {resource.description && <p style={{ marginTop: 6 }}>{resource.description}</p>}

      {embedUrl ? (
        <div style={{ position: 'relative', marginTop: 8 }}>
          <iframe
            width="100%"
            height="200"
            src={embedUrl}
            allowFullScreen
            title={resource.title}
          />

          <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
            {externalUrl && (
              <a href={externalUrl} target="_blank" rel="noreferrer" className="brand-button inline-flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
                Open on YouTube
              </a>
            )}
          </div>
        </div>
      ) : null}

      <p style={{ marginTop: 8 }}>📚 {resource.category} | {resource.level}</p>
    </div>
  )
}