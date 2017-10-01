# dcg-ng2-forms
Módulo para Angular 2, con distintos componentes de formularios. De momento está en pleno desarrollo.
Futuros componentes:
- Time picker (selección de horas y minutos)
- Switch on off
- Text mask
- Textarea con alto auto ajustable
- ...

Mejoras pendientes en los componentes actuales
1. **Datepicker**
  - Restricción de días de la semana
  - Restricción de días concretos
  - Día mínimo seleccionable
  - Día máximo seleccionable
  - Dias del mes restringidos
  - Días concretos restringidos
  - Permitir solo determinados días
2. **Input query**
  - Hacer uso de los avatares
  - Hacer uso de los iconos

## Instalación
```
npm install --save dcg-ng2-forms
```

## Importar el módulo en nuestra aplicación angular

```
import { DCGForms } from 'dcg-ng2-forms'

@NgModule({
 ....
 imports: [
  ...,
  DCGForms
  ]
})
```

### Datepicker (Selección de fecha)

Genera un botón para abrir un calendario de selección de fecha.
Hay disponibles dos vistas:

#### Vista de día
![Imgur](http://i.imgur.com/mgwmaBy.gif)

```
<dcg-datepicker [(date)]="miFecha" [view]="'dia'"></dcg-datepicker>
```

#### Vista de mes
![Imgur](http://i.imgur.com/z6jfnwN.gif)

```
<dcg-datepicker [(date)]="miFecha" [view]="'mes'"></dcg-datepicker>
```

### Input query
Este componente crea un input de tipo text en el que podremos introducir una cadena de búsqueda y éste nos mostrará en tiempo real los resultados que nos devuelva el backend. Estos resultados podremos recorrerlos y seleccionarlos.

![Imgurl](http://i.imgur.com/x2KxAgO.gif)

#### Frontend
```
<dcg-input-query [inputClass]="'input-sm'" (valueChange)="callback($event)" [realtime]="true" [url]="'apiURL'")
```

**Inputs del componente**
- **[inputClass]**: Clase que se le pasará al <input>
- **[realtime]**: Booleano que determina si se llamará a la api con cada pulsación de teclado. Es true por defecto. Si lo seteamos a false, se realizará la búsqueda cuando pulsemos intro.
- **[url]**: Url a la que se enviará la consulta.
- **[placeholder]**: Colocará un texto orientativo en el input
- **[disabled]**: Permite activar o desactivar la escritura

**Outputs del componente**
- **(valueChange)**: Función que se llama cada vez que seleccionamos un resultado. Debemos pasar como argumento **$event**, que será el resultado.

#### Backend
La cadena de texto se enviará a la url por POST en un objeto JSON en el que el texto está en la propiedad **q**, por ejemplo:
```
{
  q: 'texto a buscar'
}
```

El backend por su parte tiene que devolvernos un objeto JSON con la siguiente estructura:

```
{
  resultados: []
}
```

El cada resultado del array debe tener el siguiente formato:
```
{
  icono: 'clase css del icono (fontawesome, bootstrap, o la librería que usemos), esto es opcional',
  avatar: 'url del avatar o imagen a mostrar al lado del resultado. De momento no se usa, pero eun futuro si',
  nombre: 'Texto del resultado a motrar',
  datos: Objeto JSON con la información que queramos. Este objeto también se pasará junto con el resultado seleccionado
}
```
