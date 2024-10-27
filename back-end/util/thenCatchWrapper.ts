async function thenCatchWrapper<T extends Function>(fn: T) {
    return (...args: any[]) => {
        return fn(...args).then((result: any) => result).catch((error: any) => {
            console.error(error);
            throw new Error('Database error. See server log for details.');
        });
    };
}

export default thenCatchWrapper;