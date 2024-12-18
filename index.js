const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const config = require("./config.json");
// Crear el cliente del bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Colección para comandos
client.commands = new Collection();

// Leer los comandos desde la carpeta /comandos
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.data.name, command);
}


client.once('ready', () => {
    console.log(`✅ Bot iniciado como ${client.user.tag}`);
});

// Evento: Manejo de interacciones
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ Error ejecutando el comando ${interaction.commandName}:`, error);
        await interaction.reply({
            content: '❌ Hubo un error al ejecutar este comando.',
            ephemeral: true
        });
    }
});

// Inicia sesión con el token
client.login(config.TOKEN);

