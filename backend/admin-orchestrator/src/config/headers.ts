const headers: {
    [header: string]: boolean | number | string;
} | undefined =  {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    "Access-Control-Allow-Origin": "*",
}

export default headers