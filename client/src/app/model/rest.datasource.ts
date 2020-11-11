import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Survey} from './survey.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const PROTOCOL = 'http';
const PORT = 3500;


@Injectable()
export class RestDataSource
{
    baseUrl: string;
    authToken: string;

    private httpOoptions = 
    {
        headers: new  HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        })
    };   

    
    constructor(private http: HttpClient, private jwtService: JwtHelperService)
    {
        this.baseUrl = '${PROTOCOL}://${location.hostname}:${PORT}/';
    }

    getSurveys(): Observable<Survey[]>
    {
        return this.http.get<Survey[]>(this.baseUrl + 'survey-list');
    }
    private loadToken(): void
    {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
        this.httpOoptions.headers = this.httpOoptions.headers.set('Authorization', this.authToken);
    }
}