// // hey.jsのmodule.exportsを呼び出します。
// const heyFile = require("./commands/hey.js");

// // discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
// const { Client, Events, GatewayIntentBits } = require("discord.js");
// // 設定ファイルからトークン情報を呼び出し、変数に保存します
// const { token } = require("./config.json");
// // クライアントインスタンスと呼ばれるオブジェクトを作成します
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// // クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
// client.once(Events.ClientReady, (c) => {
//   console.log(`準備OKです! ${c.user.tag}がログインします。`);
// });

// // heyコマンドに対する処理
// client.on(Events.InteractionCreate, async (interaction) => {
//   // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
//   // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
//   if (!interaction.isCommand()) return;

//   // コマンド名に応じて処理を振り分けます
//   switch (interaction.commandName) {
//     case heyFile.data.name:
//       try {
//         await heyFile.execute(interaction);
//       } catch (error) {
//         console.error(error);
//         await interaction.reply({
//           content: "コマンド実行時にエラーになりました。",
//           ephemeral: true,
//         });
//       }
//       break;
//     case "tweet":
//       // tweetコマンドの処理を記述します
//       try {
//         await interaction.reply("これはtweetコマンドです。");
//         // ここに実際のtweetコマンドの処理を追加する
//       } catch (error) {
//         console.error(error);
//         await interaction.reply({
//           content: "コマンド実行時にエラーになりました。",
//           ephemeral: true,
//         });
//       }
//       break;
//     default:
//       console.error(
//         `${interaction.commandName}というコマンドには対応していません。`
//       );
//       break;
//   }
// });

// // ログインします
// client.login(token);


// hey.jsのmodule.exportsを呼び出します。
const heyFile = require("./commands/hey.js");
const twitterCommands = require("./commands/discord-twitter.js"); // discord-twitter.jsをインポートします。

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits } = require("discord.js");
// 設定ファイルからトークン情報を呼び出し、変数に保存します
const { token } = require("./config.json");
// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

// heyコマンドに対する処理
client.on(Events.InteractionCreate, async (interaction) => {
  // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
  // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
  if (!interaction.isCommand()) return;

  // コマンド名に応じて処理を振り分けます
  switch (interaction.commandName) {
    case "hey":
      try {
        await heyFile.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "コマンド実行時にエラーになりました。",
          ephemeral: true,
        });
      }
      break;
    case 'tweet':
      // discord-twitter.jsのtweetコマンドを実行します
      try {
        await twitterCommands.tweetCommand(interaction); // discord-twitter.js内のtweetCommand関数を呼び出します
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "コマンド実行時にエラーになりました。",
          ephemeral: true,
        });
      }
      break;
    default:
      console.error(`${interaction.commandName}というコマンドには対応していません。`);
      break;
  }
});

// ログインします
client.login(token);

