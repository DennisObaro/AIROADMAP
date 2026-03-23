import { readFile } from 'node:fs/promises'

const ARTICLES_FILE = new URL('../src/data/articles.ts', import.meta.url)
const REQUEST_TIMEOUT_MS = 12000

function extractArticles(source) {
  const entries = []
  const objectRegex = /\{[\s\S]*?\n\s*\},/g
  for (const objectMatch of source.matchAll(objectRegex)) {
    const block = objectMatch[0]
    const idMatch = block.match(/id:\s*'([^']+)'/)
    const urlMatch = block.match(/url:\s*'([^']+)'/)
    if (idMatch && urlMatch) {
      entries.push({ id: idMatch[1], url: urlMatch[1] })
    }
  }
  return entries
}

async function checkUrl(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  const headers = {
    'user-agent': 'StackAILinkValidator/1.0 (+https://localhost)',
  }

  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers,
    })

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers,
      })
    }

    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
    }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      finalUrl: url,
      error: error instanceof Error ? error.message : String(error),
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function main() {
  const source = await readFile(ARTICLES_FILE, 'utf8')
  const entries = extractArticles(source)

  if (entries.length === 0) {
    console.error('No article URLs found in src/data/articles.ts')
    process.exit(1)
  }

  console.log(`Checking ${entries.length} article URLs...\n`)

  const broken = []
  const blocked = []

  for (const entry of entries) {
    const result = await checkUrl(entry.url)
    const statusText = result.status || 'ERR'
    if (result.ok) {
      console.log(`OK   ${entry.id} -> ${statusText}`)
      continue
    }

    if (result.status === 404 || result.status === 410) {
      broken.push({ ...entry, ...result })
    } else {
      blocked.push({ ...entry, ...result })
    }

    const suffix = result.error ? ` (${result.error})` : ''
    console.log(`FAIL ${entry.id} -> ${statusText}${suffix}`)
  }

  if (broken.length > 0) {
    console.error(`\nFound ${broken.length} broken article URL(s):`)
    for (const item of broken) {
      const errorText = item.error ? ` | error: ${item.error}` : ''
      console.error(`- ${item.id}: ${item.url} -> ${item.status}${errorText}`)
    }
    process.exit(1)
  }

  if (blocked.length > 0) {
    console.warn(`\n${blocked.length} URL(s) could not be confidently validated (blocked/rate-limited):`)
    for (const item of blocked) {
      const errorText = item.error ? ` | error: ${item.error}` : ''
      console.warn(`- ${item.id}: ${item.url} -> ${item.status}${errorText}`)
    }
    console.warn('\nTreat these as "needs manual browser spot-check", not automatically dead links.')
  }

  console.log('\nAll article URLs are reachable.')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
