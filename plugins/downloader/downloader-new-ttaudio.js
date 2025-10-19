let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("⚠️ *Audio URL tidak ditemukan!*")

  try {
    const [url, thumb] = text.split("|").map(decodeURIComponent)

    await conn.sendMessage(
      m.chat,
      {
        audio: { url },
        mimetype: "audio/mp4",
        ptt: false,
        fileName: "tiktok_audio.mp3",
        contextInfo: {
          externalAdReply: {
            title: "🎵 TikTok Audio",
            body: "By ILHAM A.",
            thumbnailUrl: thumb || undefined,
            sourceUrl: "https://ilhm.vercel.app", // 🔗 diarahkan ke website kamu
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )
  } catch (err) {
    console.error(err)
    m.reply("⚠️ *Gagal mengirim audio.*")
  }
}

handler.help = ["ttaudio"]
handler.tags = ["downloader"]
handler.command = /^ttaudio$/i

export default handler