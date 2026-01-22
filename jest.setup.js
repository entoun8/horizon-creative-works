// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Set up test environment variables
process.env.RESEND_API_KEY = 'test-key-12345';
process.env.CONTACT_EMAIL = 'test@example.com';

// Polyfill for Web APIs in Node.js test environment
class MockHeaders {
  constructor(init) {
    this._headers = new Map();
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers.set(key.toLowerCase(), value);
      });
    }
  }
  
  get(name) {
    return this._headers.get(name.toLowerCase()) || null;
  }
  
  set(name, value) {
    this._headers.set(name.toLowerCase(), value);
  }
}

global.Request = class Request {
  constructor(url, init = {}) {
    this.url = url;
    this.method = init.method || 'GET';
    this.headers = new MockHeaders(init.headers);
    this._body = init.body;
  }
  
  async json() {
    return JSON.parse(this._body);
  }
};

global.Response = class Response {
  constructor(body, init = {}) {
    this._bodyData = body;
    this.status = init?.status || 200;
    this.statusText = init?.statusText || '';
    this.headers = new MockHeaders(init?.headers);
  }
  
  async json() {
    if (typeof this._bodyData === 'string') {
      return JSON.parse(this._bodyData);
    }
    return this._bodyData;
  }
  
  static json(data, init = {}) {
    const response = new Response(null, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init?.headers || {}),
      },
    });
    response._bodyData = data;
    return response;
  }
};

// Mock NextResponse (used by Next.js API routes)
global.NextResponse = {
  json: (data, init = {}) => {
    const bodyData = data;
    return {
      status: init?.status || 200,
      statusText: init?.statusText || '',
      headers: new MockHeaders(init?.headers),
      json: async function() {
        return bodyData;
      }
    };
  }
};
