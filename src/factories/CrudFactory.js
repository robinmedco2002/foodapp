import {CrudRequest, RequestOptions} from "@crud/core";

export class CrudFactory extends CrudRequest {
    baseUrl = "http://localhost:9000/api/";

    getUrl = (...segments) => segments.reduce((url, segment) => url + segment, this.baseUrl);

    async get(url, data = {}, requestOptions = {}){
        return this.send({
            method: "GET",
            url,
            data,
            ...requestOptions
        });
    }

    async post (url, data = {}, requestOptions = {}){
        return this.send({
            method: "POST",
            url,
            data,
            ...requestOptions
        });
    }

    async delete (url, data = {}, requestOptions = {}){
        return this.send({
            method: "DELETE",
            url,
            data,
            ...requestOptions
        });
    }

    async send (requestOptions = {}){
        const {url, data, method, notify = true} = requestOptions;

        const options = {
            ...requestOptions.ajaxOptions,
            method
        };

        let fullUrl;

        options.headers = {
            ...options.headers,
            "Accept": "application/json",
            "Authorization": localStorage.getItem("login_token")
        };

        if (!(data instanceof FormData)){
            options.headers["Content-Type"] = "application/json";
        }

        fullUrl = this.getUrl(url);

        if (options.method === "GET"){
            const queryString = new URLSearchParams(data);
            fullUrl += `?${queryString}`;
        } else if (data instanceof FormData){
            options.body = data;
        } else {
            options.body = JSON.stringify(data);
        }

        let res = {
            data: [],
            message: "",
            type: "error",
            errors: []
        };

        try {
            const response = await fetch(fullUrl, options);
            if (response.status === 200){
                res = await response.json();
                const {type, message} = res;
                if (options.method !== "GET" && notify){
                    this.notify({
                        message,
                        type,
                    });
                }
            } else {
                // noinspection ExceptionCaughtLocallyJS
                throw new Error(`${response.status} : ${response.statusText}`);
            }
        } catch (e){
            console.error(e);
            this.notify({
                message: e.message,
                type: "error",
            });
            throw e;
        }

        const {type} = res;

        if (type === "error")
            throw res;

        return res;
    }
}

export const $crud = new CrudFactory();
