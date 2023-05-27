type QueryParams = {
    [key: string]: string;
};

const getQueryParams = (): QueryParams => {
    const queryParams: QueryParams = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');

    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
    }

    return queryParams;
}

export default getQueryParams