/**
 * Utilidades compartidas para transformar menús.
 *
 * Elimina el slug de los elementos de tipo "Index" para que apunten a la home
 * del idioma actual (sin prefijo de locale).
 */

/**
 * Transforma los elementos del menú estableciendo slug="" para elementos Index.
 *
 * @param {object} data - Datos del menú desde GraphQL
 * @param {number} menuIndex - Índice del menú a transformar (0-based)
 * @returns {object} Datos transformados
 */
export function transformMenuElements(data, menuIndex = 0) {
  if (!data || !data.menus || data.menus.length <= menuIndex) {
    return data
  }

  const modifiedData = data.menus[menuIndex].menuElements.map(element => {
    if (element.__typename === "Index") {
      return {
        ...element,
        slug: "",
      }
    }
    return element
  })

  return {
    ...data,
    menus: [
      {
        ...data.menus[menuIndex],
        menuElements: modifiedData,
      },
    ],
  }
}

/**
 * Convierte los elementos del menú transformados en enlaces localizados.
 *
 * @param {Array} menuElements - Elementos del menú ya transformados
 * @param {string} langKey - Código de idioma
 * @param {Function} localePath - Función para generar rutas localizadas
 * @returns {Array} Array de objetos { to, text }
 */
export function createMenuLinks(menuElements, langKey, localePath) {
  if (!menuElements) return []

  return menuElements.map(obj => ({
    to: localePath(langKey, obj.slug),
    text: `${obj.title}`,
  }))
}