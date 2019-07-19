const doFilter = (item, filter) => {
    let { value } = filter;
    let { operador } = filter;
    let { property } = filter;
    let response = false;

    switch (operador) {
        case "Is":
            response = item[property].includes(value);
            break;
        case "startWith":
            response = item[property].startsWith(value);
            break;
        case "endWith":
            response = item[property].endsWith(value);
            break;
        case "contain":
            response = item[property].includes(value);
            break;
        case "Notcontain":
            response = !item[property].includes(value);
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