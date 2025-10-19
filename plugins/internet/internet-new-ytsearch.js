import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`📌 Contoh penggunaan:\n${usedPrefix + command} Alan Walker`)
  }

  try {
    await m.reply('⏳ Sedang mencari hasil dari YouTube...')

    const query = encodeURIComponent(text)
    const url = `https://api.nekolabs.my.id/discovery/youtube/search?q=${query}`

    const res = await axios.get(url)
    let data = res.data

    // Deteksi jika array ada di dalam objek
    if (!Array.isArray(data)) {
      if (Array.isArray(data.result)) data = data.result
      else if (Array.isArray(data.data)) data = data.data
      else return m.reply('❌ Format data tidak sesuai.')
    }

    if (!data || data.length === 0) {
      return m.reply('❌ Tidak ada hasil yang ditemukan.')
    }

    // Ambil thumbnail pertama dari key 'cover'
    const firstThumb = data[0]?.cover || ''

    // Buat list caption
    let list = `📺 *Hasil Pencarian YouTube untuk:* _${text}_\n\n`
    data.forEach((item, i) => {
      list += `*${i + 1}. ${item.title || '-'}*\n`
      if (item.channel) list += `🔹 Channel : ${item.channel}\n`
      if (item.duration) list += `⏳ Durasi : ${item.duration}\n`
      if (item.url) list += `🔗 Link   : ${item.url}\n`
      list += '\n'
    })

    // Kirim dengan gambar jika ada
    if (firstThumb) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: firstThumb },
          caption: list.trim()
        },
        { quoted: m }
      )
    } else {
      await m.reply(list.trim())
    }
  } catch (e) {
    console.error(e)
    m.reply('❌ Terjadi kesalahan saat mengambil data.\nCoba lagi nanti.')
  }
}

handler.help = ['yts <pencarian>']
handler.tags = ['internet']
handler.command = /^yts|ytsearch$/i

export default handler