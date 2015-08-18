var unirest = require('unirest');
import {User} from './user';
import {Event} from './event';
import {Company} from './company';

export class Client {
  constructor(appId, appApiKey) {
    this.appId = appId;
    this.appApiKey = appApiKey;
    this.users = new User(this);
    this.events = new Event(this);
    this.companies = new Company(this);
  }
  ping(f) {
    unirest.get('https://api.intercom.io/admins')
    .auth(this.appId, this.appApiKey)
    .type('json')
    .header('Accept', 'application/json')
    .end(r => f(r.status));
  }
  post(endpoint, data, f) {
    unirest.post(`https://api.intercom.io${endpoint}`)
    .auth(this.appId, this.appApiKey)
    .type('json')
    .send(data)
    .header('Accept', 'application/json')
    .end(r => f(r));
  }
  get(endpoint, data, f) {
    unirest.get(`https://api.intercom.io${endpoint}`)
    .auth(this.appId, this.appApiKey)
    .type('json')
    .query(data)
    .header('Accept', 'application/json')
    .end(r => f(r));
  }
  nextPage(paginationObject, f) {
    unirest.get(paginationObject.next)
    .auth(this.appId, this.appApiKey)
    .type('json')
    .header('Accept', 'application/json')
    .end(r => f(r));
  }
  delete(endpoint, data, f) {
    unirest.delete(`https://api.intercom.io${endpoint}`)
    .auth(this.appId, this.appApiKey)
    .type('json')
    .query(data)
    .header('Accept', 'application/json')
    .end(r => f(r));
  }
}