/**
 * @fileOverview component display name
 */

/**
 * get the components display name
 * @param Component
 * @returns {string}
 */
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

export default getDisplayName;
