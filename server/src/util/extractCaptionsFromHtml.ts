export function extractCaptionsFromHtml(html: string) {
  const splittedHtml = html.split('"captions":')
  if (splittedHtml.length < 2) return { error: 'No captions available' }

  const captionsJson = JSON.parse(splittedHtml[1].split(',"videoDetails')[0].replace('\n', ''))
  const captionTracks = captionsJson.playerCaptionsTracklistRenderer.captionTracks

  const languageOptions = captionTracks.map((i: { name: { simpleText: string }; baseUrl: string }) => ({
    language: i.name.simpleText,
    link: i.baseUrl
  }))

  const first = 'English'
  languageOptions.sort((x: { language: string }, y: { language: string }) => (x.language === first ? -1 : y.language === first ? 1 : 0))
  return languageOptions
}
