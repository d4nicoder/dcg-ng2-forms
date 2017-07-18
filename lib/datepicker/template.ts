

export const TEMPLATE = `
    <style>
    
    .flecha {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }

    .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }

    div.cajaDatePicker {
        position: fixed;
        display: block;
        border-radius: 2px;
        font-size:0.9em;
        z-index:99;
        border: 1px solid #a0a0a0;
    }
    
    tr.cabeceraTablaDatepicker {
        cursor:pointer;
        text-align:center;
        background-color: #e0e0e0;
        border-radius: 2px 2px 0 0;
    }
    
    td.diaFechaDatePicker {
        /*border-radius: 25px;*/
        border: 1px solid #f0f0f0;
        width: 50px;
        height: 50px;
        text-align:center;
        vertical-align: middle;
        cursor:pointer;
    }
    
    td.diaActivo {
        background-color: #e0e0e0;
    }
    
    td.diaFechaDatePicker:hover {
        background-color: #f0f0f0;
    }
    
    td.diaFechaDatePicker.activo {
        background-color: #e0e0e0;
    }
    </style>
    <div style="position:relative;display:block;">
    <button #boton class="btn btn-primary" (click)="toggle($event)">
        <span *ngIf="!date || date === null">Selecciona la fecha</span>
        <span *ngIf="date">{{date | date:'longDate'}}</span>
        <div class="pull-right" style="margin-left:10px;"><span class="glyphicon glyphicon-calendar"></span></div>
    </button>
    <div *ngIf="verCalendario" class="cajaDatePicker" [ngStyle]="getEstiloCaja()">
        <table class="table table-condensed table-striped" style="border-collapse:collapse;border:1px solid #e0e0e0; !important;">
            <thead>
                <tr style="border:none;">
                    <td style="height:50px;vertical-align:middle;cursor:pointer;text-align:center;" (click)="anoAnterior()">
                        <span class="flecha left"></span>
                        <span class="flecha left"></span>
                    </td>
                    <td style="height:50px;vertical-align:middle;cursor:pointer;text-align:center;" (click)="mesAnterior()">
                        <span class="flecha left"></span>
                    </td>
                    <td colspan="3" style="height:50px;vertical-align:middle;text-align:center;font-weight:bold;">
                        {{date | date:'MMMM y'}}
                    </td>
                    <td style="height:50px;vertical-align:middle;cursor:pointer;text-align:center;" (click)="mesSiguiente()">
                        <span class="flecha right"></span>
                    </td>
                    <td style="height:50px;vertical-align:middle;cursor:pointer;text-align:center;" (click)="anoSiguiente()">
                        <span class="flecha right"></span>
                        <span class="flecha right"></span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr class="cabeceraTablaDatepicker">
                    <td style="text-align:center;">Lu</td>
                    <td style="text-align:center;">Ma</td>
                    <td style="text-align:center;">Mi</td>
                    <td style="text-align:center;">Ju</td>
                    <td style="text-align:center;">Vi</td>
                    <td style="text-align:center;">Sa</td>
                    <td style="text-align:center;">Do</td>
                </tr>
                <tr *ngFor="let semana of semanas;trackBy:index">
                    <td *ngFor="let dia of semana;trackBy:index" [ngClass]="claseDia(dia)" (click)="setDia(dia)">{{dia}}</td>
                </tr>
            </tbody>
        </table>
        <div class="btn-group" style="margin:10px;">
            <button class="btn btn-danger btn-sm" (click)="quitaFecha()">Borrar</button>
            <button class="btn btn-default btn-sm" (click)="toggle()">Cerrar</button>
        </div>
    </div>
</div>
`;