async function thenCatchWrapper(fn: Function) {
    return async (...args: any[]) =>
            await fn(...args)  
                    .then((result: any) => result)
                    .catch((error: any) => {
                        console.error(error);
                        throw new Error('Database error. See server log for details.');
                    });
}

export default thenCatchWrapper;