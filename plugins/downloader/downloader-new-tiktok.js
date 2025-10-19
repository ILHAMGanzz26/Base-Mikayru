import axios from "axios"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  await global.loading(m, conn)

  if (!text) return m.reply(`🍙 *Masukkan URL TikTok yang valid!*\n🍣 Contoh: ${usedPrefix + command} https://vt.tiktok.com/...`)

  const isTikTok = /tiktok\.com\/.+/i.test(text)
  if (!isTikTok) return m.reply("🍩 *URL tidak valid! Harap masukkan link TikTok yang benar.*")

  try {
    const { data } = await axios.get(`https://api.nekolabs.my.id/downloader/tiktok?url=${encodeURIComponent(text)}`)

    if (!data.status || !data.result) return m.reply("🍰 *Gagal mengambil data TikTok. Coba lagi nanti!* 🍵")

    const { title, cover, author, music_info, musicUrl, videoUrl } = data.result
    if (!videoUrl) return m.reply("🍡 *Video tidak ditemukan!*")

    let caption = ``

    // tombol unduh audio
    const buttons = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🎵 Download Audio",
          id: `.ttaudio ${encodeURIComponent(musicUrl)}|${encodeURIComponent(cover)}`
        })
      }
    ]

    // kirim video tanpa thumbnail (plain)
    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption,
        mimetype: "video/mp4",
        fileName: `${title || "tiktok"}.mp4`,
        headerType: 4,
        interactiveButtons: buttons
      },
      { quoted: m }
    )
  } catch (err) {
    console.error(err)
    m.reply("🍙 *Terjadi kesalahan saat mengunduh video.*")
  } finally {
    await global.loading(m, conn, true)
  }
}

handler.help = ["tiktok", "tt"]
handler.tags = ["downloader"]
handler.command = /^(tiktok|tt)$/i

export default handler