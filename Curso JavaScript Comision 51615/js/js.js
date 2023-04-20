// Saludo

alert("Adquiera aqui su entradas del festival")

// Etapa de ventas de boletas

let etapa = Number(prompt('Estamos en etapa dos de ventas de nuestras boletas, por ende los precios aplicados son los correspondientes a esta etapa \n \n 1. Aceptar \n 2. Rechazar') )

let trueOfalse = true;

// Proceso de compra de boletas

function seleccionEtapa () {
    while (trueOfalse) {
        if(Number(etapa) === 1){
                let opcionBoletas = Number(prompt('Seleccione las entradas que quiera comprar: \n \n 1. Individual General - $274.000 + servicio (35.000) \n 2. Individual VIP - $479.000 + servicio (57.000) \n 3. General Combo 3 días - $669.000 + servicio (65.000) \n 4. VIP Combo 3 días - $860.000 + servicio (85.000) \n \n 0. Salir ')) ;
                while (trueOfalse){
                    if (Number(opcionBoletas) === 1  ){
                        let boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                        while(trueOfalse){
                            if (Number(boletas) >= 1 && Number(boletas) <= 6){
                                function precioBoleta (a, b, servicio){
                                    console.log(`Selecciono ${boletas} entradas`);
                                    console.log(`El valor es: ${a * b + servicio}`);                    
                                }
                                precioBoleta(boletas, 274.000, 35.000)
                                let agradecimiento = alert('Tu compra ha sido exitosa')
                                trueOfalse = false
                                break
                            } else {
                                opcionNoValida = alert('Ingrese una opción válida');
                                boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                            }
                        }                                               
                    } else if (Number(opcionBoletas) === 2 ){
                        boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                        while (trueOfalse){
                            if (Number(boletas) >= 1 && Number(boletas) <= 6){
                                function precioBoleta (a, b, servicio){
                                    console.log(`Selecciono ${boletas} entradas`);
                                    console.log(`El valor es: ${a * b + servicio}`);
                                }
                                precioBoleta(boletas, 479.000, 57.000)
                                agradecimiento = alert('Tu compra ha sido exitosa')
                                trueOfalse = false
                                break
                            } else {
                                opcionNoValida = alert('Ingrese una opción válida');
                                boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                            } 
                        }
                        
                    } else if (Number(opcionBoletas) === 3 ){
                        boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                        while(trueOfalse){
                            if (Number(boletas) >= 1 && Number(boletas) <= 6){
                                function precioBoleta (a, b, servicio){
                                    console.log(`Selecciono ${boletas} entradas`);
                                    console.log(`El valor es: ${a * b + servicio}`);
                                }
                                precioBoleta(boletas, 459.000, 65.000)
                                agradecimiento = alert('Tu compra ha sido exitosa')
                                trueOfalse = false
                                break
                            } else {
                                opcionNoValida = alert('Ingrese una opción válida');
                                boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                            }
                        }
                        
                    } else if (Number(opcionBoletas) === 4 ){
                        boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                        while(trueOfalse){
                            if (Number(boletas) >= 1 && Number(boletas) <= 6){
                                function precioBoleta (a, b, servicio){
                                    console.log(`Selecciono ${boletas} entradas`);
                                    console.log(`El valor es: ${a * b + servicio}`);
                                }
                                precioBoleta(boletas, 760.000, 85.000)
                                agradecimiento = alert('Tu compra ha sido exitosa')
                                trueOfalse = false
                                break
                            } else {
                                opcionNoValida = alert('Ingrese una opción válida');
                                boletas = Number(prompt('Coloque el número de boletas que desea comprar, puedes adquirir máximo 6 boletas'))
                            }
                        }
                        
                    } else if (Number(opcionBoletas) >= 5){
                        opcionNoValida = alert('Ingrese una opción válida');
                        opcionBoletas = Number(prompt('Seleccione las entradas que quiera comprar: \n \n 1. Individual General - $274.000 + servicio \n 2. Individual VIP - $479.000 + servicio \n 3. General Combo 3 días - $669.000 + servicio \n 4. VIP Combo 3 días - $860.000 + servicio \n \n 0. Salir ')) ;
                    } else if (Number(opcionBoletas) === 0){
                        salida = alert('El  proceso de compra fue cancelado');
                        trueOfalse = false
                        break
                    } else {
                        salida = alert('El  proceso de compra fue cancelado');
                        trueOfalse = false
                        break
                    }
                }                      
            }
        else if (Number(etapa) >= 5){
                let opcionNoValida = alert('Ingrese una opción válida');
                etapa = Number(prompt('Estamos en etapa dos de ventas de nuestras boletas, por ende los precios aplicados son los correspondientes a esta etapa \n \n 1. Aceptar \n 2. Rechazar') )            
            } 
        else if (Number(etapa) === 2) {
                let salida = alert('El  proceso de compra fue cancelado');
                trueOfalse = false
                break
            } 
        else{
                alert('No se ha seleccionado una opción')
                etapa = Number(prompt('Estamos en etapa dos de ventas de nuestras boletas, por ende los precios aplicados son los correspondientes a esta etapa \n \n 1. Aceptar \n 2. Rechazar') )
            }
    } 
}

seleccionEtapa()

