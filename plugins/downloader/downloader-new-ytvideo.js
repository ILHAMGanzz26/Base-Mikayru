let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply("⚠️ *Masukkan URL YouTube yang valid!*");

    let url = args[0];
    let youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|live\/)|youtu\.be\/)[\w-]+(\S+)?$/i;
    if (!youtubeRegex.test(url))
        return m.reply("❌ *URL tidak valid! Harap masukkan link YouTube yang benar.*");

    try {
        // Menampilkan loading
        await global.loading(m, conn);

        // Panggil API Zenzxz
        let apiUrl = `https://api.zenzxz.my.id/downloader/ytmp4v2?url=${encodeURIComponent(url)}`;
        let response = await fetch(apiUrl);
        if (!response.ok) return m.reply("💔 *Gagal menghubungi API. Coba lagi nanti ya!*");

        let json = await response.json();
        if (!json.status || !json.download_url)
            return m.reply("❌ *Gagal memproses permintaan!*\n*Pastikan URL benar dan coba lagi.*");

        let { download_url, title, duration = 0, format = "1080p", thumbnail } = json;

        // Konversi durasi dari detik ke mm:ss
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const durationFormatted = `${minutes}m ${seconds}s`;

        // Caption lebih estetik
        const caption = `
🎬 *Judul:* ${title}
⏱️ *Durasi:* ${durationFormatted}
📺 *Format:* ${format}
✅ *Status:* Berhasil diunduh!
`;

        // Kirim video dengan thumbnail
        await conn.sendFile(
            m.chat,
            download_url,
            `${title}.mp4`,
            caption,
            m,
            false,
            { mimetype: "video/mp4", thumbnail }
        );
    } catch (e) {
        console.error(e);
        return m.reply("❌ *Terjadi kesalahan saat memproses permintaan.*");
    } finally {
        await global.loading(m, conn, true);
    }
};

handler.help = ["ytmp4", "ytv"];
handler.tags = ["downloader"];
handler.command = /^(ytmp4|ytv)$/i;

export default handler;