function tryCatchWrapper<T extends Function>(fn: T) {
    return (...args: any[]) => {
        try {
            return fn(...args);
        } catch (error) {
            console.error(error);
            throw new Error('Database error. See server log for details.');
        }
    };
}

export default tryCatchWrapper;