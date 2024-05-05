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

// EXPORTS
/**
 * @type {Guild} 
*/
export const Guild = {
    id: '',
    name: '',
    iconURL: '',
    icon: '',
    permissions: 0
}

/**
 * @type {LSUser}
*/
export const LSUser = {
    id: '',
    username: '',
    avatar: '',
    avatarURL: '',
    guilds: []
}