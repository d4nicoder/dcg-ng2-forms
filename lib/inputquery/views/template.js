/**
 * Created by dcanada on 2/01/17.
 */
"use strict";
exports.__esModule = true;
/**
 * Created by dcanada on 2/01/17.
 */
exports.TEMPLATE = "\n<input type=\"text\" #buscador class=\"form-control\" [ngClass]=\"inputClass\" (keyup)=\"onKey($event)\">\n<div #cuadro [ngStyle]=\"getEstilo()\">\n    <table class=\"table table-hover\">\n        <tr *ngFor=\"let item of resultados\">\n            <td [ngStyle]=\"getEstiloItem(item)\" (mouseover)=\"onHover(item)\" (click)=\"seleccionar(item)\">{{item.nombre}}</td>\n        </tr>\n        <tr *ngIf=\"(allowCreate && texto && texto.length > 0)\">\n            <td (mouseover)=\"onHover('create')\" (click)=\"create()\" class=\"bg-warning\">\n                <i class=\"glyphicon glyphicon-plus-sign\" style=\"margin-right:10px;\"></i>    \n                {{texto}}\n            </td>\n        </tr>\n    </table>\n</div>\n";
