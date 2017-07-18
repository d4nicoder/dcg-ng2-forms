/**
 * Created by dcanada on 2/01/17.
 */

/**
 * Created by dcanada on 2/01/17.
 */

export const TEMPLATE = `
<input type="text" #buscador class="form-control" [ngClass]="inputClass" (keyup)="onKey($event)">
<div #cuadro [ngStyle]="getEstilo()">
    <table class="table table-hover">
        <tr *ngFor="let item of resultados">
            <td [ngStyle]="getEstiloItem(item)" (mouseover)="onHover(item)" (click)="seleccionar(item)">{{item.nombre}}</td>
        </tr>
        <tr *ngIf="(allowCreate && texto && texto.length > 0)">
            <td (mouseover)="onHover('create')" (click)="create()" class="bg-warning">
                <i class="glyphicon glyphicon-plus-sign" style="margin-right:10px;"></i>    
                {{texto}}
            </td>
        </tr>
    </table>
</div>
`;