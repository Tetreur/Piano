import puppeteer from 'puppeteer'
import { env } from './env'

async function main() {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	// Navigate the page to a URL
	await page.goto(env.SITE_URL)

	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 })

	// Type into login input name
	await page
		.$('input[name="loginAi"]')
		.catch((error) => {
			throw new Error(
				`Could not find the login name input (input[name="loginAi"]) -> ${error}`,
			)
		})
		.then((selector) => {
			if (!selector) throw new Error('Login Name input is undefined')
			const { type } = selector
			type(env.THEO_USER_NAME)
		})

	// Type into login input passwd
	await page
		.$('input[name="passwdAi"]')
		.catch((error) => {
			throw new Error(
				`Could not find the login passwd input (input[name="passwdAi"]) -> ${error}`,
			)
		})
		.then((selector) => {
			if (!selector) throw new Error('Login Password input is undefined')
			const { type } = selector
			type(env.THEO_USER_PASSWORD)
		})

	// Wait and click on first result
	const searchResultSelector = '.devsite-result-item-link'
	await page.waitForSelector(searchResultSelector)
	await page.click(searchResultSelector)

	// Locate the full title with a unique string
	await page
		.waitForSelector('text/Customize and automate')
		.then(async (textSelector) => {
			const fullTitle = await textSelector?.evaluate((el) => el.textContent)

			// Print the full title
			console.log('The title of this blog post is "%s".', fullTitle)
		})
	await browser.close()
}

main()
