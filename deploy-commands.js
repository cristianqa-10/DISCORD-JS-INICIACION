const { REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require("./config.json");

// Leer los comandos desde la carpeta /comandos
const commands = [];
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    commands.push(command.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(config.TOKEN);

(async () => {
    try {
        console.log('📦 Registrando comandos Slash en la API de Discord...');
        await rest.put(
            Routes.applicationCommands(config.CLIENT_ID), // Comandos globales
            { body: commands }
        );
        console.log('✅ Comandos registrados exitosamente.');
    } catch (error) {
        console.error('❌ Error registrando los comandos:', error);
    }
})();

