// TYPES
/**
 * @typedef Guild
 * @property {string} id
 * @property {string} name
 * @property {string | null} iconURL
 * @property {string | null} icon
 * @property {number} permissions
*/

/**
 * @typedef LSUser
 * @property {string} id
 * @property {string} username
 * @property {string} avatar
 * @property {string} avatarURL
 * @property {Array<Guild>} guilds
*/

/**
 * @typedef APIGuild
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {number} permissions
 * @property {string} iconURL
 * @property {string} owner
 * @property {Array<{name: string, id: string}>|null} roles
 * @property {Array<{name: string, id: string, type: string, category: string | 'None'}>|null} channels
*/

/**
 * @typedef APIChannel
 * @property {string} name
 * @property {string} id
 * @property {string} type
 * @property {string} category
 * @property {number} position
*/

// EXPORTS
/**@type {Guild}*/export const Guild = {    id: '',    name: '',    iconURL: '',    icon: '',    permissions: 0}
/**@type {LSUser}*/export const LSUser = {    id: '',    username: '',    avatar: '',    avatarURL: '',    guilds: []}
/**@type {APIGuild}*/export const APIGuild = {    id: '',    name: '',    icon: '',    permissions: 0,    iconURL: '',    owner: '',    roles: [],    channels: []}
/**@type {APIChannel}*/export const APIChannel = {    name: '',    id: '',    type: '',    category: '',   position: 0}