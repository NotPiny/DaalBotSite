const user = JSON.parse(localStorage.getItem('user'))
const guilds = user.guilds
const manageableGuilds = guilds.filter(guild => guild.permissions & 0x20)
const guildsContainer = document.getElementById('server-list')

function getGuildIcon(guild) {
    if (guild.iconURL.includes('null')) {
        return 'https://pinymedia.web.app/daalbot/Guild.png'
    } else {
        return `${guild.iconURL}`
    }
}

function generateGuildItem(guild) {
    guildsContainer.innerHTML += `
        <div class="server-item" style="background-image: url(${getGuildIcon(guild)})" onclick="guildClicked('${guild.id}')">
            <div class="server-info">
                <h3 class="server-name">${guild.name}</h3>
            </div>
        </div>
`
}

manageableGuilds.forEach(guild => generateGuildItem(guild))

function guildClicked(guildId) {
    window.location.href = `../Server?guild=${guildId}&tab=Home`
}