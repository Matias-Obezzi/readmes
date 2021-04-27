# Comandos Básicos de Git

## Descargar Repositorio Externo
### Git Clone
Es un comando que, como su nombre lo indíca, se utiliza para clonar/descargar el código fuente de algún repositorio.  
Para ello se utiliza el comando con el siguiente formato:  
`git clone <link al repositorio de git> [ruta donde descargar]`
*< obligatorio > [ opcional ]*  
Por ejemplo: el siguiente comando se utiliza para clonar el repositorio de [ReactJS](https://reactjs.org):  
`git clone https://github.com/facebook/react.git`
## Guardar Cambios
### Git Add
Cuando cambiamos, creamos o eliminamos un archivo, solo sucede en local y no va a ser incluido en el próximo commit. Para incluirlos se utiliza git add, un comando que revisa los archivo modificados para prepararlos para ser guardados. 
Para ello se utiliza el comando con el siguiente formato:  
`git add <ruta relativa al archivo/carpeta>`
*< obligatorio > [ opcional ]*  
Por ejemplo: el siguiente comando se utiliza para guardar todos los cambios en la carpeta y sus subcarpetas:  
`git add .`
*el punto indica que se desea agregar todo cambio sucedido en la carpeta actual y sus subcarpetas*
### Git Commit
Se encarga de realizar un guardado de los cambios agregados con el `add`. Para guardarlos se les asigna un "mensaje" el cual funciona como identificador de los cambios realizados.  
Para ello se utiliza el comando con el siguiente formato:  
`git commit -m "<Mensaje para identificar el commit>"`
*< obligatorio > [ opcional ]*  
Por ejemplo: el siguiente comando se utiliza para guardar todos los cambios en la carpeta y sus subcarpetas:  
`git commit -m "Cambios en X"`
### Git Diff
Se utiliza para comparar cambios entre commits. Se indican 2 conjuntos de datos (archivos de commit) y se muestran los cambios entre estos.
Para ello se utiliza el comando con el siguiente formato:  
`git diff <ruta a archivo 1> <ruta a archivo 2>`
*< obligatorio > [ opcional ]*  
Por ejemplo: el siguiente comando se utiliza para guardar todos los cambios en la carpeta y sus subcarpetas:  
`git diff a/test.txt b/test.txt`
Va a mostrar por pantalla algo asi:
```
- Esto es un archivo test
+ Esto es un test
```
Como notaras, hay un + y un - delante de las lineas, eso indica lo que se quito del archivo 1 y lo que lo reemplazo en el archivo 2. Lo que sigue estando igual (en este caso "Esto es un") se pinta de color, al igual que lo que se quita y lo que se agrega.
### Git Stash
Sirve para guardar temporalmente los cambios realizados fuera de un commit. Se utiliza para poder dejar en un estado el código e ir a realizar otra tarea, para más tarde regresar y volver a aplicar los cambios.
Para ello se utilizan los siguientes comandos:  
- `git stash`: Guarda temporalmente los cambios.
- `git stash pop`: Carga los cambios temporales anteriormente guardados.
- `git stash save "<mensaje>"`: Permite generar varios stashes. *< obligatorio >*
- `git stash list`: Lista los stashes creados.
- `git stash show`: Muestra los cambios realizados en el stash.
## Examen de un repositorio
### Git Status
Muestra el estado del directorio de trabajo permitiendo ver los cambios que estan, y no estan, preparados.
Para ello se utiliza el comando:  
`git status`
### Git Tag
Agrega una etiqueta la cual referencia a un punto concreto en el historial de Git. Generalmente es utilizado para marcar cual es la versión de producción. Esto sucede ya que, al agregar la etiqueta, el código queda inmutable.
Para ello se utiliza el comando con el siguiente formato:  
`git tag <etiqueta>`
*< obligatorio >*
### Git Blame
Muestra el último autor de cada línea. Se utiliza para examinar puntos especificos del historial y poner en contexto quién fue el último en modificarlo.
Para ello se utiliza el comando con el siguiente formato:  
`git blame <nombre archivo>`
*< obligatorio >*