require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");

// =======================
// Configuration
// =======================

const MUSIC_CHANNEL_ID = process.env.MUSIC_CHANNEL_ID;
const RYTHM_BOT_ID = process.env.RYTHM_BOT_ID;
const DELETE_AFTER = Number(process.env.DELETE_AFTER);

// =======================
// Discord Client
// =======================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// =======================
// Bot Ready
// =======================

client.once("clientReady", (client) => {
  console.log(`✅ ${client.user.tag} is now online!`);

  client.user.setActivity("Cleaning Music Commands 🗑️", {
    type: ActivityType.Watching,
  });

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("AutoDelete by Mizu Senpai");
  console.log(`Music Channel : ${MUSIC_CHANNEL_ID}`);
  console.log(`Delete After  : ${DELETE_AFTER / 1000} seconds`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});

// =======================
// Auto Delete
// =======================

client.on("messageCreate", async (message) => {
  // Ignore everyone except Rythm
  if (message.author.id !== RYTHM_BOT_ID) return;

  // Ignore every channel except music-command
  if (message.channel.id !== MUSIC_CHANNEL_ID) return;

  console.log(`🗑️ Scheduled: ${message.id}`);

  setTimeout(async () => {
    try {
      const msg = await message.channel.messages
        .fetch(message.id)
        .catch(() => null);

      if (!msg) return;

      await msg.delete();

      console.log(`✅ Deleted: ${message.id}`);
    } catch (error) {
      console.error("❌ Delete Failed:", error.message);
    }
  }, DELETE_AFTER);
});

// =======================
// Login
// =======================

client.login(process.env.TOKEN);