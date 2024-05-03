import puppeteer from 'puppeteer'
import { env } from '../env'
import { roomTierEnum } from './RoomIdList'

const p = performance

async function main() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Navigate the page to a URL
  await page.goto(env.SITE_URL)

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 })

  //////////////
  //// PERF ////
  //////////////
  p.mark('input start')

  // Type into login input name
  await page
    .$('input[name="loginAai"]')
    .catch((error) => {
      throw new Error(
        `Could not find the login name input (input[name="loginAi"]) -> ${error}`
      )
    })
    .then(async (selector) => {
      if (!selector) throw new Error('Login Name input is undefined')

      await selector.type(env.USER_NAME).catch((error) => {
        throw new Error(`Could not type into name input -> ${error}`)
      })
    })

  // Type into login input passwd
  await page
    .$('input[name="passAai"]')
    .catch((error) => {
      throw new Error(
        `Could not find the login passwd input (input[name="passwdAi"]) -> ${error}`
      )
    })
    .then(async (selector) => {
      if (!selector) throw new Error('Login Password input is undefined')

      await selector.type(env.USER_PASSWORD).catch((error) => {
        throw new Error(`Could not type into password input -> ${error}`)
      })
    })

  // click on connect
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('input[name="validerAai"]') // Clicking the link will indirectly cause a navigation
  ])

  // click on studios reservation
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('a[href="/_io/connexions/salles.php"]') // Clicking the link will indirectly cause a navigation
  ])

  // select room list by tier

  for (let i = 0; i < roomTierEnum.length; i++) {
    console.log(`Tier ${i + 1} -> ${roomTierEnum[i]}`)

    for (const room of roomTierEnum[i]) {
      page
        .$(`input[value="${room}"]`)
        .catch((error) => {})
        .then(async (selector) => {
          //	break
          //
          // 	await selector.click().catch((error) => {
          // 		throw new Error(`Could not click on room ${room} -> ${error}`)
          // 	})
        })
    }
  }

  //////////////
  //// PERF ////
  //////////////
  p.mark('input end')

  const m = p.measure('input duration', 'input start', 'input end')
  console.log(m.toJSON())

  await browser.close()
}

main()
