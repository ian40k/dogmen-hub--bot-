export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { command, query } = req.body;

    let response = '';

    switch(command) {
      case 'movie':
        if (!query) {
          response = '🎬 Usage: .movie <query>\nExample: .movie avengers';
        } else {
          response = `🎬 Movie Search: "${query}"\n🔗 https://www.themoviedb.org/search?query=${encodeURIComponent(query)}`;
        }
        break;

      case 'yt':
        if (!query) {
          response = '📺 Usage: .yt <query>\nExample: .yt funny cats';
        } else {
          response = `📺 YouTube Search: "${query}"\n🔗 https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        }
        break;

      case 'gg':
        if (!query) {
          response = '🔍 Usage: .gg <query>\nExample: .gg weather today';
        } else {
          response = `🔍 Google Search: "${query}"\n🔗 https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
        break;

      case 'tt':
        if (!query) {
          response = '📱 Usage: .tt <query>\nExample: .tt dance tutorial';
        } else {
          response = `📱 TikTok Search: "${query}"\n🔗 https://www.tiktok.com/search?q=${encodeURIComponent(query)}`;
        }
        break;

      case 'ping':
        response = `🏓 Bot is active!\n\n📢 WhatsApp Channel:\nhttps://whatsapp.com/channel/0029Vb71mgIElaglZCU0je0x\n\nType .menu for all commands`;
        break;

      case 'menu':
        response = `🤖 BOT MENU 🤖\n\n🎬 .movie <query> - Search movies\n📺 .yt <query> - Search YouTube\n🔍 .gg <query> - Search Google\n📱 .tt <query> - Search TikTok\n🏓 .ping - Bot status\n📖 .menu - Show this menu`;
        break;

      default:
        response = '❌ Unknown command. Type .menu for available commands.';
    }

    res.status(200).json({ success: true, response });
    return;
  }

  res.status(200).json({ message: 'WhatsApp Bot API' });
                }
