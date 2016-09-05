import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

import { Hero } from './hero'

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes'
    private postsUrl = 'https://jsonplaceholder.typicode.com/posts'
    private headers = new Headers({'Content-Type': 'application/json'})
    private handleError(error: any): Promise<any> {
        console.error('An error ocurred', error)
        return Promise.reject(error.message || error)
    }

    constructor(private http: Http) {

    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError)
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 5000)).then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then( heroes =>
            heroes.find(hero => hero.id === id)
        )
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    getPosts() {
        alert("getPosts")
        return this.http.get(this.postsUrl)
            .map(res => res.json())
    }

    createPost(post) {
        return this.http.post(this.postsUrl, JSON.stringify(post))
            .map(res => res.json())
    }
}