require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot activo ✅');
});

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 🎭 LISTA DE GIFS
const gifs = [

    { url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHcwZTA5am5laTFpeDQydDR5cm81Y3poY3FkOTA4ZG5zMDJuMWR2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GmPBHNgu1Mbs66L80c/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGxmYWx2bnpnY25hMTYxdGwyaXlheWtsaXNodml4aDl5azk3NDQ0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BTR49e9scrsnnAKwgt/giphy.gif", weight: 10 },
    { url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXVlZ3NrcWJzYmZrYzB5dWphYjZ1NmF5ZWs0cDRvNHRnc2thbWJobSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rkuQlIV0OtDh8N1wwq/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTcxNjVmYjZqc3g3eTN0eWM3dGEwcHZpeHFkbThmcTBwcjZ0NWl0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k7voNgovXfu11UdvVc/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHRmemV4c241NnR5Yjk3azI2ZnJnNGdsaTJjbTJ0OXNieGExYnphOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WJGfZ5ZSvVqUpUCRIl/giphy.gif", weight: 10 },
    { url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHNpMmRya2prY3lsZDN1ZXJ6ZHRodDVjZXptMHc3emtjZjQ1YWVmeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fRD7IuGIXb5oAPcaLT/giphy.gif", weight: 10 },
    { url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVyNG12dnNid2ZnMnRka3p5c29nNGdrbXdnZ3c0ODBqMW5hMmU0MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g0fPpi1OarYadHDRrL/giphy.gif", weight: 10 },
    { url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHV3YnE0a2twOTJkazJobHg0eXh4Ynl2dnY1OWQxOXN6YTJmaXpqdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xo4utKh2LxANjjaDEG/giphy.gif", weight: 10 },
    { url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZwczNxanc2N2RsMHY4Zjd6MHN3cHN0NWRubGV4ODlkczdtdXAybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V1js8ThCQeNa97wCOi/giphy.gif", weight: 10 },
    { url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGxqN2xwZmlpZzQwMXk2eTB6dDF6OHgybHFvb2h4aDJ2dTNnb2M2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NS8N7n5k5QKalw7QYe/giphy.gif", weight: 10 },
    { url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWhlZnRidW1jYWw3YWJqY3E4Nzk2bTh3dmg2cGw3eXVteDVpbm5leSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MhhdlbIkiFvbYJNzit/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW5vMG1ya2x0M2h0cTIzNTcyZWYyMTAybXVnYjVxNmdwNDM2ZTk4aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Hk6IFW5wYVU5bajLbj/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDdiOHY5djR2cm5uaGFmbm9ocm00ZG5kdDFnejd1c2VkamF2NnY2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K3pVgZ5AsGsB7uJpUW/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjUyMXZiM25vYjBycDAxOXBka3d3Nm9tOWhwMnQ4c2FobjRuNm5rayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SHNNh8vP8FGuFnr2pM/giphy.gif", weight: 10 },
    { url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamQ0MmcwZWJiYjlibXB4aGp4cG5kYTlmZTJtejE2ZmhpM3F4NzNhdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cKjDAX015vLW6e1pWA/giphy.gif", weight: 10 },
    { url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNtNTFrdXY1MmoyNmFvNHVuYmxwbTE5MXh3OWp3cnpvbTVvbXRhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7sQ8zfw2eOJD1uxUa5/giphy.gif", weight: 10 },
    { url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXRweWNxOHV1ZDFyajMzc29wNWtuNWFiZWJ2anc2bnh2ZjRseWo5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bwWE22LWsPEelcEGY2/giphy.gif", weight: 10 },
    { url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Y5YmI3em9zM2dvcnE2cGE5bnY5YnQ2dHd0czg2emhva3Zlb3RyMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4JmwDqqRYtXfLbRv5I/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXI0YjN3eGs2dTV6endsN2tlZHFjNmlpNG9heXR3NTI2ZnBoNDN4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V9iAIdc2QcV9mFBSs8/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDV6c3VkcGpucDU3MXp6dHV1YW42c2x4am9vdW9wbGJxbmg0cGtraiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c6Gs0Yz7zTxcGZB8mw/giphy.gif", weight: 10 },
    { url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDlxdmUyMzdsM21rODEweDBzMXBpNDI1Y2ZjOXl6OTI5eWI0Y201byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nh62N1h37OuOWRcoXe/giphy.gif", weight: 10 },
    { url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXR5M2Vyb29rdngyc283dW8yZWg5dTNpZHpsdjFuYXdnMHVybm1lZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RTfX49gBoaTEIf9IWt/giphy.gif", weight: 10 },
    { url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTd2djc0b2U0OW82ZGcxcHIyMGNxcGliY2N6eTF6NjQ1dGltcjJ5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4s4sdg3y1AIwxScb6n/giphy.gif", weight: 10 },
    { url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWpzaGx0MDZtZXB0ZTNjZW52M3hmbDFxeGdvaXJsdzFzcHBoN3JoYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tB2WpN4Wt7JRk6svjP/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBwZDhoODBweTJhcGlxbTc1MDRpc3l4NjhnMmZlNXB0MDgxZmxzcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CRFNkPcdzJHG0kuGh5/giphy.gif", weight: 10 },
    { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdudjQzYWxoNm9nZG5ib3c4ZDA0NWFoeDZlZGhla2dkd3l3NHY2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O9v97yQdwcz0nIsCc9/giphy.gif", weight: 10 },
    { url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGp1amVueG1sYTRvdmQ4bmJvbmg4cnVxYm5nYm8zdTR2OGdmdXYyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Qbvf3dbTteKUirwxaO/giphy.gif", weight: 1 },

];

function getRandomGif(list) {
    const total = list.reduce((sum, item) => sum + item.weight, 0);

    let random = Math.random() * total;

    for (const item of list) {
        if (random < item.weight) {
            return item.url;
        }
        random -= item.weight;
    }
}

client.once('ready', () => {
    console.log(`✅ Conectado como ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {

    const canal = member.guild.channels.cache.get('1513299901927133254');

    if (!canal) return;

    const gifAleatorio = getRandomGif(gifs);

    const embed = new EmbedBuilder()
        .setTitle('✦ OSHI DROP !! ✦')
        .setDescription(
            `🎶 ¡Bienvenido/a, ${member}! ✨\n\n` +
            `🌟 Eres el oshi número ${member.guild.memberCount} <a:minojam:1513297562143031346>\n\n` +
            `📜 Revisa <#1513620024772923523> y preséntate en <#1513630560831148134> <:minolove:1513298147940761640>`
        
        )
        .setImage(gifAleatorio)
        .setColor('#ff66cc');

    canal.send({ embeds: [embed] });
});

client.on('messageCreate', (message) => {

    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    const reactions = [
        { word: "keria", emoji: "<:nyaplead:1513294673274343434>" },
    ];

    for (const item of reactions) {
        if (content.includes(item.word)) {
            message.react(item.emoji).catch(() => {});
        }
    }
});

client.login(process.env.TOKEN);
