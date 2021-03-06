import {inject} from 'aurelia-framework';
import fetch from 'whatwg-fetch';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from '../../environment';
import AuthService from 'resources/services/auth-service';

@inject(HttpClient, AuthService)
export default class ApiBaseService {
    constructor(http, authService) {
        this.authService = authService;
        this.http = http;
        this.http.configure(config => {
            config
              .withBaseUrl(environment.apiUrl)
              .withDefaults({
                  headers: {
                      'Accept':           'application/json',
                      'X-Requested-With': 'Fetch'
                  }
              });
        this.baseCorsResponseHeaderNames = ['cache-control', 'content-type'];
      });
    }

    async get(path, params={}) {
        let pathWithQuery = path;
        if (Object.keys(params).length > 0) {
            pathWithQuery = `${path}?${$.param(params)}`;
        }
        const response = await this.http.fetch(pathWithQuery, {headers: this.getHeaders()});

        return response.json();
    }

    async post(path, params) {
        let self = this;
        var headers = this.getHeaders();
        headers['Content-Type'] = 'application/json';
        const response = await this.http.fetch(path, {
            method: 'post',
            body:   json(params),
            headers: headers
        });
        if(response.status >= 400) {
        }
        if(response.status === 200) {
          return response;
        }
        if (response.status !== 201) {
            return response.json();
        } else {
            const headers = {};
            for (let [name, value] of response.headers) {
              if (!this.baseCorsResponseHeaderNames.includes(name)) {
                headers[name] = value;
            }
        }

        return new Promise((resolve, reject) => {
            if (Object.keys(headers).length > 0) {
                resolve(headers);
            } else {
                reject(Error("Response 201 didn't contain any resource-related headers."));
            }
        });
        }
  }

  async put(path, params){
        let self = this;
        var headers = this.getHeaders();
        headers['Content-Type'] = 'application/json';
        const response = await this.http.fetch(path, {
            method:     'put',
            body:   json(params),
            headers: headers
        });

        if(response.status >= 400) {
        }
        if(response.status === 200) {
          return response;
        }
        if (response.status !== 201) {
            return response.json();
        } else {
            const headers = {};
            for (let [name, value] of response.headers) {
              if (!this.baseCorsResponseHeaderNames.includes(name)) {
                headers[name] = value;
                }
            }
            return new Promise((resolve, reject) => {
                if (Object.keys(headers).length > 0) {
                    resolve(headers);
                } else {
                    reject(Error("Response 201 didn't contain any resource-related headers."));
                }
            });
        }        
    }

    async delete(path, params){
        let self = this;
        var headers = this.getHeaders();
        headers['Content-Type'] = 'application/json';
        const response = await this.http.fetch(path, {
            method:     'delete',
            body:   json(params),
            headers: headers
        });

        if(response.status >= 400) {
        }
        if(response.status === 200) {
          return response;
        }
        if (response.status !== 201) {
            return response.json();
        } else {
            const headers = {};
            for (let [name, value] of response.headers) {
              if (!this.baseCorsResponseHeaderNames.includes(name)) {
                headers[name] = value;
                }
            }
            return new Promise((resolve, reject) => {
                if (Object.keys(headers).length > 0) {
                    resolve(headers);
                } else {
                    reject(Error("Response 201 didn't contain any resource-related headers."));
                }
            });
        }        
    }

  getHeaders(){
    return {"Authorization": `Bearer ${this.authService.idToken}`};
  }
}
