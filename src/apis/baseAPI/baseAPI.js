import httpClient from "./httpClient";

export default class BaseAPI {
  endPoint = "";
  httpClient = httpClient;

  async getAsync(config) {
    const params = {
      keyWord: config?.keyWord || "",
    };
    return await httpClient.get(this.endPoint, { params });
  }

  async postAsync(payload) {
    return await httpClient.post(this.endPoint, payload);
  }

  async deleteAsync(id) {
    return await httpClient.delete(this.endPoint + "/" + id);
  }

  async putAsync(payload) {
    return await httpClient.put(this.endPoint, payload);
  }
}
