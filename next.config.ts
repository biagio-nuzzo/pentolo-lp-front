// Built-in
import { NextConfig } from "next"
// Libraries
import createNextIntlPlugin from "next-intl/plugin"

/**
 * Next.js configuration with next-intl plugin integration.
 *
 * createMessagesDeclaration: Generates TypeScript type definitions from the specified
 * JSON translation file. This enables autocomplete and type safety when using translation
 * keys throughout the application. Should point to your default/primary language file.
 */
const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/it.json",
  },
})

const config: NextConfig = {
	output: 'standalone',
};

export default withNextIntl(config)
