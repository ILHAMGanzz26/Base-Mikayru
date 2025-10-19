let handler = async (m, { conn, usedPrefix, command, args }) => {
  await global.loading(m, conn)
  if (!args[0]) return m.reply(`🍙 *Masukkan URL Instagram yang valid!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/reel/...`)

  const rawUrl = args[0]
  try {
    const api = `https://api.nekolabs.my.id/downloader/instagram?url=${encodeURIComponent(rawUrl)}`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.result) throw '🚫 Tidak bisa mengambil video Instagram'

    const { url, metadata } = json.result
    const videoUrl = url[0]
    if (!videoUrl) throw '🚫 Video tidak ditemukan'

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: "video/mp4",
      caption: `\`\`\`Sukses ✔\`\`\``
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    return m.reply("🍙 *Ada kesalahan teknis!*")
  } finally {
    await global.loading(m, conn, true)
  }
}

handler.help = ['ig', 'instagram']
handler.tags = ['downloader']
handler.command = /^(ig|instagram)$/i

export default handler