import Response from "../classes/Response"

/**
 * 
 * @param err 
 * @returns 
 */
const handleError = async (err: any) => {
    console.error(`my name is steve`, JSON.stringify(err).slice(0, 2000));
    if (err instanceof TypeError || err instanceof SyntaxError) {
        return new Response(400, JSON.stringify({
            message: err.message
        }))
    } else {
        return new Response(500, JSON.stringify({
            message: err.message
        }))
    }
}

export default handleError