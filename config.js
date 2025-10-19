/*
 * Liora WhatsApp Bot
 * @description Open source WhatsApp bot based on Node.js and Baileys.
 *
 * @founder     གྷ Naruya Izumi <https://linkbio.co/naruyaizumi> | wa.me/6283143663697
 * @owner       གྷ SXZnightmar <wa.me/6281398961382>
 * @business    གྷ Ashaa <wa.me/6285167849436>
 * @api-dev     གྷ Alfi Dev <wa.me/6287831816747>
 * @python-dev  གྷ Zhan Dev <wa.me/6281239621820>
 *
 * @copyright   © 2024 - 2025 Naruya Izumi
 * @license     Apache License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * IMPORTANT NOTICE:
 * - Do not sell or redistribute this source code for commercial purposes.
 * - Do not remove or alter original credits under any circumstances.
 */

import fs from "fs"
import path from "path"

const envPath = path.resolve(process.cwd(), ".env")
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n")
  for (const line of lines) {
    if (!line || line.startsWith("#")) continue
    const [key, ...vals] = line.split("=")
    const value = vals.join("=").trim().replace(/^['"]|['"]$/g, "")
    if (key && !(key in process.env)) {
      process.env[key.trim()] = value
    }
  }
}

global.config = {
  /*============== STAFF ==============*/
  owner: [
        ["14695659146", "𝙸𝙻𝙷𝙰𝙼 𝙰.", true],
        ["62882008364516", "𝙼𝚒𝚔𝚊𝚢𝚛𝚞 𝚟:", true],
    ],
  newsletter: process.env.NEWSLETTER,
  group: process.env.GROUP,
  website: process.env.WEBSITE,

  /*========== DEVELOPER MODE ==========*/
  DEVELOPER: process.env.IS_IZUMI === "true",

  /*============= PAIRING =============*/
  pairingNumber: process.env.PAIRING_NUMBER,
  pairingAuth: process.env.PAIRING_AUTH === "true",

  /*============== API ==============*/
  APIs: {
    btz: process.env.API_BTZ,
  },
  APIKeys: {
    [process.env.API_BTZ]: process.env.APIKEY_BTZ,
  },

  /*============== MESSAGES ==============*/
    watermark: "𝙈͢𝙞𝙠𝙖𝙮𝙧𝙪 𝘽͢𝙤𝙩𝙯",
    author: "𝙄͢𝙇𝙃𝘼𝙈 𝘼.",
    stickpack: "𝙄𝙇𝙃𝘼𝙈 𝘼.",
    stickauth: "© 𝙈͢𝙞𝙠𝙖𝙮𝙧𝙪 𝘽͢𝙤𝙩𝙯",
}