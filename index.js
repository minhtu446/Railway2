const { 
    Client, 
    GatewayIntentBits, 
    REST, 
    Routes, 
    SlashCommandBuilder 
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ====== THÔNG TIN ĐÃ THAY ĐỔI ======
const TOKEN = 'MTQ5MzIyMzQ5NTIwOTk3NTg5OA.GoJlZR.rA-q6o-yBOr9hckS1LTXIM7oFf5U7rap5HL0h4';
const CLIENT_ID = '1493223495209975898'; // ID trích xuất từ token của bạn

// ====== TẠO SLASH COMMAND ======
const commands = [
    new SlashCommandBuilder()
        .setName('chongaihoi')
        .setDescription('Chống ai hỏi')
        .toJSON()
];

// ====== ĐĂNG KÝ LỆNH ======
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Đang đăng ký lệnh...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('Đã đăng ký lệnh Slash thành công!');
    } catch (error) {
        console.error('Lỗi khi đăng ký lệnh:', error);
    }
})();

// ====== BOT READY ======
client.once('ready', () => {
    console.log(`✅ Bot đã trực tuyến: ${client.user.tag}`);
});

// ====== PHẢN HỒI TIN NHẮN ======
client.on('messageCreate', message => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase();

    const responses = {
        'ping': 'pong 🏓',
        '6': '7',
        '67': 'six-seven',
        '36': 'Thanh Hóa',
        'skibidi': 'toilet',
        'sigma': 'skibidi'
    };

    if (responses[msg]) {
        message.reply(responses[msg]);
    }
});

// ====== XỬ LÝ SLASH COMMAND ======
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'chongaihoi') {
        await interaction.reply(
            '📜 **Theo điều 1337 của Hiến pháp Internet:**\n' +
            '"Ai hỏi?" là hành vi không cần thiết.\n' +
            'Người vi phạm có thể bị phạt: 1 cái nhìn khinh bỉ 👀'
        );
    }
});

client.login(TOKEN);