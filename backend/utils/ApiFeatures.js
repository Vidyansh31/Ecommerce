class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // For searching 
    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:"i"
            }
        }:{};
        this.query = this.query.find({...keyword});
        return this;
    }

    //Filter
    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);
    
        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
      }

      // pagination 
      pagination(resultperPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = (resultperPage)* (currentPage-1);

        this.query = this.query.limit(resultperPage).skip(skip);

        return this;
      }
}

module.exports = ApiFeatures;