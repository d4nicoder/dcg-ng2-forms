/**
 * Created by dcanada on 22/09/16.
 */

import {
	Component, OnChanges, Input, Output, EventEmitter, AfterViewInit, ViewChild
} from '@angular/core';
import { InputQueryService } from "./inputquery.provider";
import {TEMPLATE} from "./views/template";

@Component({
	selector: 'dcg-input-query',
	template: TEMPLATE,
	providers: [InputQueryService]
})
export class InputQueryComponent implements AfterViewInit {

	resultados: Array<any> = [];

	@Input() multiple: boolean = false;
	@Input() realtime: boolean = false;
	@Input() url: string;
	@Input() value: Array<string>;
	@Input() placeholder: string;
	@Input() remember: boolean = false;
	@Input() inputClass: string;
	@Input("allow-create") allowCreate: boolean = false;
	@Output() valueChange = new EventEmitter();

	@ViewChild('cuadro') cuadros: any;
	@ViewChild('buscador') buscador: any;

	topCuadro: number;
	texto: string;
	preSeleccion: any = null;
	numPreseleccion: number = null;
	seleccionados: Array<any> = [];
	capa: any;
	visible: boolean = false;

	position = {
		top: 0,
		left: 0
	};

	constructor(private inputQueryService: InputQueryService) {

	}

	ngAfterViewInit() {
		let altoInput = this.buscador.nativeElement.offsetHeight;

		this.topCuadro = altoInput;
	}

	getEstilo() {
		if (!this.capa) {
			return {display: 'none'};
		}

		let altoInput = this.capa.offsetHeight;
		let ancho = (this.capa.offsetWidth >= 200) ? this.capa.offsetWidth : 200;

		// En caso de que el input está muy por debajo de la pantalla,
		// debemos mostrar el cuadro por encima 
		const posFromTop: number = this.position.top + altoInput;

		console.log(window.innerHeight);
		console.log(posFromTop);
		let obj: any;

		if (window.innerHeight - posFromTop < 250 && posFromTop > 250) {
			const bottom: number = window.innerHeight - this.position.top;
			obj = {
				position:"fixed",
				display: (this.visible) ? "block" : "none",
				width: ancho + "px",
				bottom: bottom +"px",
				left: this.position.left + "px",
				border:"1px solid #e0e0e0",
				"background-color":"white",
				"z-index": 100,
				"overflow": "auto",
				"max-height": "300px"
			};
		} else {
			obj = {
				position:"fixed",
				display: (this.visible) ? "block" : "none",
				width: ancho + "px",
				top: (this.position.top + altoInput) +"px",
				left: this.position.left + "px",
				border:"1px solid #e0e0e0",
				"background-color":"white",
				"z-index": 100,
				"overflow": "auto",
				"max-height": "300px"
			};
		}

		return obj;
	}

	public getEstiloItem(item:any): any {

		if (item === this.preSeleccion) {
			return {
				cursor: 'pointer',
				'background-color': 'darkred',
				color: 'white'
			};
		} else {
			return {
				cursor: 'pointer'
			};
		}
	}

	public onHover(item: any): any {
		this.preSeleccion = item;

		for (let i = 0; i < this.resultados.length; i++) {
			if (this.resultados[i] === item) {
				this.numPreseleccion = i;
			}
		}
	}

	onKey($event: any) {
		this.position = this.cumulativeOffset($event.target);
		this.texto = $event.target.value.toUpperCase();
		this.capa = $event.target;
		
		this.position.top = this.position.top - window.scrollY;
		this.position.left = this.position.left - window.scrollX;

		console.log(this.position);

		
		if ($event.keyCode === 40) {
			$event.preventDefault();
			this.moveDown();
			return;
		} else if ($event.keyCode === 38) {
			$event.preventDefault();
			this.moveUp();
			return;
		} else if ($event.keyCode === 13 && this.preSeleccion !== null) {
			$event.preventDefault();
			this.seleccionar(this.preSeleccion);
			return;
		} else if ($event.keyCode === 27) {
			this.borrar();
			return;
		}
		if (!this.realtime) {
			if ($event.keyCode === 13) {
				// es intro, buscamos
				$event.preventDefault();
				this.buscar();
			}
			return;
		} else {
			this.buscar();
		}
	}

	cumulativeOffset = function(element) {
		var top = 0, left = 0;
		do {
			top += element.offsetTop  || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while(element);

		return {
			top: top,
			left: left
		};
	};

	buscar() {
		if (!this.url || this.url === "") {
			console.error("No hay url para buscar");
			return;
		}

		this.visible = true;

		if (typeof this.texto !== 'string' || this.texto.trim().length === 0) {
			this.visible = false;
			return;
		}

		this.inputQueryService.consultar(this.url, this.texto)
			.subscribe((res) => {
				// ya tenemos los resultados en res, vamos a almacenarlos para que se muestren en la vista
				this.resultados = res;
				if (this.resultados.length > 0) {
					this.preSeleccion = res[0];
					this.numPreseleccion = 0;
				} else {
					this.preSeleccion = null;
					this.numPreseleccion = null;
				}

				if (this.resultados.length === 1 && !this.realtime) {
					this.seleccionar(this.resultados[0]);
				}
			},
			(err) => {
				console.error("Error en la consulta");
				this.resultados = [];
			})
	}

	moveUp() {
		if (this.numPreseleccion === null) {
			this.numPreseleccion = this.resultados.length - 1;
		} else {
			this.numPreseleccion = (this.numPreseleccion === 0) ? this.resultados.length - 1: this.numPreseleccion - 1;
		}

		this.preSeleccion = this.resultados[this.numPreseleccion];
	}

	moveDown() {
		if (this.numPreseleccion === null) {
			this.numPreseleccion = 0;
		} else {
			this.numPreseleccion = (this.numPreseleccion === this.resultados.length - 1) ? 0: this.numPreseleccion + 1;
		}

		this.preSeleccion = this.resultados[this.numPreseleccion];
	}

	seleccionar(resultado: any) {
		this.value = (typeof this.value === "undefined") ? [] : this.value;
		// solo se permite un resultado por lo que lo almacenamos en la cadena de resultados
		this.value = [resultado];
		this.seleccionados = (!this.remember) ? [] : [resultado];
		this.valueChange.emit(this.value);

		this.borrar();
	}

	eliminar(item: any) {
		this.value = [];
		for (let i = 0; i < this.seleccionados.length; i++) {
			if (this.seleccionados[i] === item) {
				this.seleccionados.splice(i,1);
			} else {
				this.value.push(this.seleccionados[i]);
			}
		}
		this.valueChange.emit(this.value);
	}

	borrar() {
		this.visible = false;
		this.capa.value = "";
		this.value = [];
		//this.valueChange.emit(this.value);
		this.resultados = [];
	}
}