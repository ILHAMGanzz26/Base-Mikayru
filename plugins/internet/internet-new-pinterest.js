let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(
    `🍙 Masukkan kata kunci!\n\nContoh: *${usedPrefix + command} Fuji*`
  )

  try {
    let res = await fetch(`https://api.nekolabs.my.id/discovery/pinterest/search?q=${encodeURIComponent(text)}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()

    if (!json.status || !json.result || json.result.length === 0) {
      return m.reply("❌ Tidak ada hasil.")
    }

    let results = json.result.slice(0, 8) // batasi 8 foto biar tidak terlalu banyak

    for (let i = 0; i < results.length; i++) {
      let item = results[i]
      await conn.sendFile(m.chat, item.imageUrl, 'pin.jpg', `📌 *${text}* (Foto ${i+1}/${results.length})`, m)
    }

  } catch (e) {
    console.error(e)
    m.reply("⚠️ Terjadi error.")
  }
}

handler.help = ["pin <query>"]
handler.tags = ["internet"]
handler.command = /^pin(terest)?$/i

export default handler