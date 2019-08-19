const doFilter = (item, filter) => {
    let { value } = filter;
    let { operador } = filter;
    let { property } = filter;
    let response = false;

    switch (operador.toUpperCase()) {
        case "IS":
            response = item[property].includes(value);
            break;
        case "STARTWITH":
            response = item[property].startsWith(value);
            break;
        case "ENDWITH":
            response = item[property].endsWith(value);
            break;
        case "CONTAIN":
            response = item[property].includes(value);
            break;
        case "NOTCONTAIN":
            response = !item[property].includes(value);
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

export default createFilter;