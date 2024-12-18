
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saludo')
        .setDescription('Envía un saludo amistoso.'),
    async execute(interaction) {
        await interaction.reply('👋 ¡Hola! Espero que estés teniendo un excelente día.');
    },
};
