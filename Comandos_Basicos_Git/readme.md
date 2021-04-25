# Comandos Básicos de Git
  
## Git Clone
Es un comando que, como su nombre lo indíca, se utiliza para clonar/descargar el código fuente de algún repositorio.  
Para ello se utiliza el comando con el siguiente formato:  
`git clone <link al repositorio de git> [ruta donde descargar]`
*< obligatorio > [ opcional ]*  
Por ejemplo: el siguiente comando se utiliza para clonar el repositorio de [ReactJS](https://reactjs.org):  
`git clone https://github.com/facebook/react.git`

## Git Add
Cuando cambiamos, creamos o eliminamos un archivo, solo sucede en local y no va a ser incluido en el próximo commit. Para incluirlos se utiliza git add, un comando que revisa los archivo modificados para agregar los cambios en el commit. 
Para ello se utiliza el comando con el siguiente formato:  
`git add <ruta relativa al archivo/carpeta>`
*< obligatorio > [ opcional ]*  
Por ejemplo: el siguiente comando se utiliza para guardar todos los cambios en la carpeta y sus subcarpetas:  
`git add .`
*el punto indica que se desea agregar todo cambio sucedido en la carpeta actual y sus subcarpetas*