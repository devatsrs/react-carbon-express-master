module.exports = {

    getPagination: (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? (page - 1) * limit : 0;

        return { limit, offset };
    },

    getPagingData: (data_, page, limit) => {

        //first page = 0;

        page = page - 1;        // -1 is for fn 

        const { count: totalItems, rows: data } = data_;
        const currentPage = page ? (page + 1) : 0;          // + 1 is for display 
        const totalPages = Math.ceil(totalItems / limit);

        return { totalItems, data, totalPages, currentPage };
    }

}


