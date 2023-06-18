const getIsFileExists = async (s3Link: string) => {
    try {
        const response = await fetch(s3Link, {
            method: 'HEAD'
        });
        return response.ok;
    } catch (err) {
        return false
    }
}

export default getIsFileExists