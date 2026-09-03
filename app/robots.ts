import type { MetadataRoute } from 'next'

/**
 * Answer engines are welcomed explicitly. The wildcard rule already admits
 * them, but several operators treat a named allow as the signal to fetch, and
 * the rest of the estate publishes the same list.
 *
 * Current tokens only: Claude-Web and anthropic-ai are legacy names Anthropic
 * has replaced with ClaudeBot, Claude-User and Claude-SearchBot.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'FacebookBot',
  'Twitterbot',
  'LinkedInBot',
  'cohere-ai',
  'YouBot',
  'AI2Bot',
  'MistralAI-User',
  'CCBot',
  'Bytespider',
  'Meta-ExternalAgent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: 'https://guitarchords.info/sitemap.xml',
  }
}
