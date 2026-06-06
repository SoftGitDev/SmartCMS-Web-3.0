export function DetailsArrayChangeCheck(a: any, b: any) {
    if (a === b) return true;

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!DetailsArrayChangeCheck(a[i], b[i])) return false;
            if (Array.isArray(a[i].Detail) && Array.isArray(b[i].Detail)) {
                if (a[i].Detail.length !== b[i].Detail.length) return false;
                for (let j = 0; j < a[i].Detail.length; j++) {
                    DetailsArrayChangeCheck(a[i].Detail[j], b[i].Detail[j]);
                }
            }
        }
        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !DetailsArrayChangeCheck(a[key], b[key])) return false;
    }

    return true;
}

export function SingleArrayChangeCheck(a: any, b: any) {
    if (a === b) return true;

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!SingleArrayChangeCheck(a[i], b[i])) return false;
        }
        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !SingleArrayChangeCheck(a[key], b[key])) return false;
    }

    return true;
}