import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { Hero } from './hero';
import { HeroService } from './hero.service'

@Component({
    selector: 'my-hero-detail',
    template:`
        <div *ngIf="selectedHero">
            <h2>{{selectedHero.name}} details!</h2>
            <div><label>id: </label>{{selectedHero.id}}</div>
            <div>
                <label>name: </label>
                <input [(ngModel)]="selectedHero.name" placeholder="name">
            </div>
            <button (click)="save()">Save</button>
            <button (click)="goBack()">Back</button>
        </div>
    `,
styleUrls: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    @Input()
    selectedHero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id']
            this.heroService.getHero(id).then(hero => 
                this.selectedHero = hero
            )
        })
    }

    goBack(): void {
        window.history.back()
    }

    save(): void {
        this.heroService.update(this.selectedHero)
            .then(this.goBack)
    }
}