const scrollPaging = (isLoading, callback) => {
    if (!isLoading) {
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - 50;

        if (scrollTop + clientHeight >= scrollHeight) {
            callback();
        }
    }
};

export {
    scrollPaging
};
