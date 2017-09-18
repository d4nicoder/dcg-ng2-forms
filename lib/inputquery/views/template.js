/**
 * Created by dcanada on 2/01/17.
 */
/**
 * Created by dcanada on 2/01/17.
 */
exports.TEMPLATE = "\n<input type=\"text\" #buscador [disabled]=\"disabled\" placeholder=\"{{ placeholder }}\" class=\"form-control\" [ngClass]=\"inputClass\" (keyup)=\"onKey($event)\">\n<div #cuadro [ngStyle]=\"estiloCuadro\" *ngIf=\"resultados.length > 0\" id=\"cuadroResultados\">\n    <table class=\"table table-hover\">\n        <tr *ngFor=\"let item of resultados;let i = index;\">\n            <td [ngStyle]=\"estilosItem[i]\" (mouseover)=\"onHover(item)\" (click)=\"seleccionar(item)\">{{item.nombre}}</td>\n        </tr>\n        <tr *ngIf=\"(allowCreate && texto && texto.length > 0)\">\n            <td (mouseover)=\"onHover('create')\" (click)=\"create()\" class=\"bg-warning\">\n                <i class=\"glyphicon glyphicon-plus-sign\" style=\"margin-right:10px;\"></i>\n                {{texto}}\n            </td>\n        </tr>\n    </table>\n</div>\n";
