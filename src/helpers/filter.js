const doFilter = (item, filter) => {
    let { value } = filter;
    let { operador } = filter;
    let { property } = filter;
    let response = false;

    switch (operador.toUpperCase()) {
        case "IS":
            response = IS(item[property].toUpperCase(), value);
            break;
        case "STARTWITH":
            response = STARTWITH(item[property].toUpperCase(), value);
            break;
        case "ENDWITH":
            response = ENDWITH(item[property].toUpperCase(), value);
            break;
        case "CONTAINS":
            response = CONTAINS(item[property].toUpperCase(), value);
            break;
        case "NOT CONTAIN":
            response = NOTCONTAINS([property].toUpperCase(), value);
            break;
        default:
            break;
    }

    return response;
}

const createFilter = (...filters) => {
    if (typeof filters[0] === 'string') {
        filters = [
            {
                property: filters[0],
                value: filters[1]
            }
        ];
    }

    return item => filters.every(filter => doFilter(item, filter));
};

function CONTAINS(property, value) {
    return property.indexOf(value) > -1;
};

function NOTCONTAINS(property, value) {
    return property.indexOf(value) === -1;
};

function ENDWITH(property, value) {
    return property.endsWith(value);
};

function STARTWITH(property, value) {
    return property.startsWith(value);
}

function IS(property, value) {
    return property.search(value) > -1;
};


export default createFilter;