import httpClient from "../httpClient";

export default class BaseAPI {
  endPoint = "";
  httpClient = httpClient;
  debugger;

  constructor(endPoint) {
    this.endPoint = endPoint;
  }

  async getAsync(config, apiPath = "") {
    const params = {
      keyWord: config?.keyWord || "",
    };
    return await httpClient.get(this.endPoint + apiPath, { params });
  }

  async postAsync(payload, apiPath = "") {
    return await httpClient.post(this.endPoint + apiPath, payload);
  }

  async deleteAsync(id) {
    return await httpClient.delete(this.endPoint + id);
  }

  async putAsync(payload, apiPath = "") {
    return await httpClient.put(this.endPoint + apiPath, payload);
  }
}
