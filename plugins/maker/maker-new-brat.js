import axios from "axios";
import { Sticker } from "wa-sticker-formatter";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    // Jika user belum kasih teks
    if (!text) {
      return conn.sendMessage(m.chat, {
        text: `🍙 *Masukkan teks untuk dibuat Brat Sticker yaa!*\n\n🍤 *Contoh:* ${usedPrefix + command} Lari Ada Wibu`
      }, { quoted: m });
    }

    const api = `https://api.nekolabs.my.id/canvas/brat/v1?text=${encodeURIComponent(text)}`;
    const res = await axios.get(api, { responseType: "arraybuffer" });

    const sticker = new Sticker(res.data, {
      pack: global.config.stickpack || "",
      author: global.config.stickauth || "",
      type: "full",
    });

    await conn.sendMessage(m.chat, { sticker: await sticker.toBuffer() }, { quoted: m });

  } catch (err) {
    await conn.sendMessage(m.chat, { text: `❌ Terjadi kesalahan:\n${err.message}` }, { quoted: m });
  }
};

handler.help = ["brat <teks>"];
handler.tags = ["maker"];
handler.command = /^brat$/i;

export default handler;
