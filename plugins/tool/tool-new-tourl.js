import { uploadFile } from 'cloudku-uploader'
import fs from 'fs'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''

  if (!mime) return m.reply('📌 Kirim atau reply media dengan caption *.tourl*')

  // Pesan proses
  let prosesMsg = await m.reply('⏳ Sedang mengupload ke Cloudku...')

  try {
    let media = await q.download()
    if (!media) {
      await conn.sendMessage(m.chat, { text: '❌ Gagal download media.' }, { quoted: prosesMsg })
      return
    }

    // Tentukan ekstensi file
    let ext = mime.split('/')[1] || 'bin'
    let filename = `file.${ext}`

    // Simpan sementara ke file
    fs.writeFileSync(filename, media)

    // Upload ke Cloudku
    const result = await uploadFile(media, filename)

    // Hapus file sementara
    fs.unlinkSync(filename)

    if (result.status === 'success') {
      const url = result.data.url
      const size = result.data.size || '-'

      await conn.sendMessage(
        m.chat,
        { text: `✅ *Berhasil diupload!*\n📁 *Nama:* ${filename}\n📦 *Ukuran:* ${size}\n🔗 *URL:* ${url}` },
        { quoted: prosesMsg }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        { text: `❌ Upload gagal: ${result.message || 'Tidak diketahui.'}` },
        { quoted: prosesMsg }
      )
    }

  } catch (e) {
    console.error(e)
    await conn.sendMessage(
      m.chat,
      { text: '❌ Terjadi kesalahan saat upload ke Cloudku.' },
      { quoted: prosesMsg }
    )
  }
}

handler.help = ["tourl"]
handler.tags = ["tools"]
handler.command = /^tourl$/i

export default handler