import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transactions } from '../models/transactions.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class LocalizationService {
    private _language = new Subject<string>();
    public selectLanguage: string;

    isLanguage(): Observable<string> {
        return this._language.asObservable();
    }

    set language(language: string) {
        localStorage.setItem('language', language);
        this._language.next(language);
    }
    
    get language(): string {
        return localStorage.getItem('language');
    }
}