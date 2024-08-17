class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }

  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }

  async get(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }
  async countDocuments(query) {
    try {
      const response = await this.model.countDocuments(query);
      return response;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }

  async getAll(query) {
    try {
      const data = query.data ? query.data : undefined;
      const sortby = query.sortBy ? query.sortBy : undefined;
      const limit = query.limit ? query.limit : undefined;
      const response = await this.model.find(data)
            .sort(sortby)
            .limit(limit)
            .lean()
            .exec();
      return response;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }
  async aggregate(agg) {
    try {
      const response = await this.model.aggregate(agg);
      return response;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in crud repo");
    }
  }
}

export default CrudRepository;
