const getIsFileExists = async (s3Link: string) => {
    const response = await fetch(s3Link, {
        method: 'HEAD'
    });
    return response.ok;
}

export default getIsFileExists