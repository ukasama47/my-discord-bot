const { REST } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();
const { token, applicationId, guildId } = require("./config.json");

const commands = [
  new SlashCommandBuilder().setName("hey").setDescription("Replies with Hey!"),
  new SlashCommandBuilder()
    .setName("tweet")
    .setDescription("Fetch tweets from Twitter")
    .addStringOption((option) =>
      option.setName("query").setDescription("Search query").setRequired(true)
    ),
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      `/applications/${applicationId}/guilds/${guildId}/commands`,
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
