export const capitalize = (str) => {
    const lower = str?.toLowerCase();
    return str?.charAt(0)?.toUpperCase() + lower?.slice(1);
}

export const formatPrice = (val) => `$` + val

export const parsePrice = (val) => val?.replace(/^\$/, '')