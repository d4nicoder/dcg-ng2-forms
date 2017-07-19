import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
/**
 * Created by dcanada on 22/09/16.
 */


@Injectable()
export class InputQueryService {
    constructor(private http: Http) {

    }

    consultar(url: string, query: any): Observable<any> {

        let datos = {
            q: query
        };

        return this.http.post(url, datos)
            .catch(this.handleError)
            .map((r: Response) => {
                let body = r.json();
                return (typeof body.resultados !== "undefined") ? body.resultados : { resultados: []};
            });
    }

    handleError(err: Response | any): Observable<any> {
        let errorMsg: string;

        if (err instanceof Response) {
            const body = err.json() || '';
            const error = body.error || JSON.stringify(body);
            errorMsg = `${err.status} - ${err.statusText} || ''} ${error}`;
        } else {
            errorMsg = err.message ? err.message : err.toString();
        }

        return Observable.throw(errorMsg);
    }
}
