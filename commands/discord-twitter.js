require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { TwitterApi } = require("twitter-api-v2");
const { token } = require("../config.json");

// Twitter APIの設定
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tweet") {
    const query = interaction.options.getString("query");
    if (!query) {
      await interaction.reply({
        content: "検索キーワードを入力してください。",
        ephemeral: true,
      });
      return;
    }

    try {
      const tweets = await twitterClient.v2.search(query, { max_results: 5 });
      if (!tweets.data.length) {
        await interaction.reply(
          `"${query}"に関連するツイートが見つかりませんでした。`
        );
        return;
      }

      let tweetMessages = tweets.data
        .map((tweet) => {
          return `https://twitter.com/${tweet.author_id}/status/${tweet.id}\n${tweet.text}`;
        })
        .join("\n\n");

      await interaction.reply(tweetMessages);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "ツイートの取得中にエラーが発生しました。",
        ephemeral: true,
      });
    }
  } 
   else {
    console.error(
      `${interaction.commandName}というコマンドには対応していません。`
    );
  }
});

client.login(token);
