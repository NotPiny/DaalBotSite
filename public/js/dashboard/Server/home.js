const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

const user = JSON.parse(localStorage.getItem('user'));
const guilds = user.guilds;

const guildInfo = guilds.find((g) => g.id === guild);

const guildName = guildInfo.name;

document.getElementById('guildnameheader').innerText = guildName;

function addModule(module) {
    const moduleList = document.getElementById('module-list');

    const moduleTemplate = `<div class="module" onclick="moduleClicked('${module.page}')"><h2>${module.name}</h2> <p>${module.description}</p></div>`;

    moduleList.innerHTML += moduleTemplate;
}

const modules = [
    {
        name: 'Configuration',
        description: 'Configure the way the bot works in your server.',
        page: 'temp'
    },
    {
        name: 'XP/Levels',
        description: 'Manage XP and Level rewards for your server with ease.',
        page: 'temp'
    }
]

modules.forEach((module) => addModule(module))

function moduleClicked(module) {
    window.location.href = `/Dashboard/Server/${module}?guild=${guild}`
}