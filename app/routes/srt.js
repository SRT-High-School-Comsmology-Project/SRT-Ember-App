import Route from '@ember/routing/route';

export default class SrtRoute extends Route {
    model() {
        return this.store.peekAll("source");
    }
}