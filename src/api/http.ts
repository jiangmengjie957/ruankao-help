const fetch = require("node-fetch").default;

interface FetchInit {
  method: string;
  headers: any;
  body?: any;
}

class FetchClass {
  private baseURL: string;
  private headers: any;
  private defaultHeader: any = {
    'Content-Type': 'application/json',
  }

  constructor(baseURL: string, headers: any = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  async get(endpoint: any, header?: any): Promise<any> {
    const response = await fetch(this.baseURL + endpoint, {
      method: "GET",
      headers: {...this.headers, ...this.defaultHeader, ...header},
    });
    return response.json();
  }

  async post(endpoint: any, body: any, header?: any): Promise<any> {
    console.log(JSON.stringify(body),'JSON.stringify(body)')
    const response = await fetch(this.baseURL + endpoint, {
      method: "POST",
      headers: {...this.headers, ...this.defaultHeader, ...header},
      body: JSON.stringify(body),
    });
    return response.json();
  }

  setHeaders(headers: any): void {
    this.headers = headers;
  }
}
export default new FetchClass('');