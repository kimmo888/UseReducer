import { useReducer } from "react";
/*
%CUANDO USAR useReducer?
*cunado se tiene una lógica que involucra sub-valores (o es compleja)
*cuando el proximo estado depende del anterior.
*cuando sobre un estado se realizan muchas acciones distintas para actualizarlo
 */

/*
*un reducer siempre tiene que ser function Pure, retorna el mismo estado, si se dispara la misma accion, con el mismo payload (su estado inicial y el action)son idénticos el resultado también tiene que ser idéntico
*los parámetros de entrada (state action)no deben ser mutados (alterados). debes utilizar functions que no modifiquen el valor original, como "push", sino que retorne uno nuevo, como "filter", "find", "map", "reduce". */

/*
¿se centra en function puras, son operaciones utilizando solo los parámetros de entrada sin recurrir o afectar a ningún otro elemento fuera de ellas,debe cumplir con dos condiciones:
*1-dado unos parámetros de entrada de idéntico valor, la function siempre devolverá
el mismo resultado.(solo utilizar los parámetros de entrada no externos)
*2-el computo de la function, su lógica, no implica ningún efecto observable colateral fuera de ella.(no debe alterar el DOM, ni hacer mutación en variables externas, ni agregar eventos) ejemplos
		function pureFoo (a,b){
			return a +b;
		}
*/

const types = {
    increment: 'increment',
    decrement: 'decrement',
    reset: 'reset'
}

const initialState = 10.25;
const init = (value) => { // el value que recibe esta function es el valor inicial del reducer o initialState, lo asigna el mismo reducer.
    return parseInt(value);
} //esta function es un mutador del estado inicial, es decir, la function que se ejecuta cuando el estado inicial es undefined

const reducer = (state, action) => { //recibe el estado  previo y el action state es el valor de counter inicial
/*     if(action.type === 'increment'){
        return state + 1
    }
    if(action.type === 'decrement'){
        return state - 1
    }
    if(action.type === 'reset'){
        return state = 0
    }
    return state  //en caso de no encontrar el action type, retorna el estado y no se pierde el valoro estado */
    switch(action.type){ // es mas utilizado el switch en estos casos
        case types.increment:
            return state + 1
        case types.decrement:
            return state - 1
        case types.reset:
            return state = init(initialState)
        default:
            return state
    }
}


const CounterApp = () => {

    const [counter, counterDispatch] = useReducer(reducer, initialState, init); // el tercer parámetro es el que se conoce como init del reducer

    return (
        <div>
            <h1> Clicks: {counter} </h1>
            <button onClick={()=>counterDispatch({ type: types.increment })} > {/* //el dispatch es el que se encarga de ejecutar el reducer y recibe el action */}
                Increment
            </button>
            <button onClick={()=>counterDispatch({ type: types.decrement })} >
                Decrement
            </button>
            <button  onClick={()=>counterDispatch({ type: types.reset })} >
                Reset
            </button>
            <p>------------------------End----------------------</p>
        </div>
    )
}

export default CounterApp;