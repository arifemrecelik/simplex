import Axios from 'axios';

export default class {
  constructor(options) {
    this.createInstance(options);
  }

  createInstance(options = {}) {
    const headers = {};
    let defaultOptions = {
      responseType: 'json',
      timeout: 60000,
      headers,
    };

    defaultOptions = Object.assign(defaultOptions, options);
    const instance = Axios.create(defaultOptions);

    instance.interceptors.response.use((response) => {
      if (response?.data.error) {
        console.error(response.data.error, response.data.message);
        return Promise.reject(response.data);
      }
      return response;
    },
    (error) => {
      // Because of this specific API server doesnt return right HTTTP codes.
      // So it shouldnt enter here most of the time.
      console.log(error);
      return Promise.reject(error);
    });

    this.instance = instance;
    return instance;
  }

  async get(url, params = null, rawData = false) {
    const response = await this.instance.get(url, { params });
    return rawData ? response : response.data;
  }

  async post(url, payload) {
    const response = await this.instance.post(url, payload);
    return response.data;
  }

  async put(url, payload) {
    const response = await this.instance.put(url, payload);
    return response.data;
  }

  async delete(url, payload = undefined) {
    // delete method in axios 0.20 is broken, this is a workaround
    const response = await this.instance.request({
      url,
      data: payload,
      method: 'delete',
    });
    return response.data;
  }
}
