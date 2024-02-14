const redux = require('redux')
const createStore = redux.createStore



const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

function order_cake(){
return{
    type: CAKE_ORDERED,
    quantity: 1
}
}

function restock_cake(qty=1){
    return{
        type: CAKE_RESTOCKED,
        quantity:qty,
    }
}


const initialState = {
    numOfCakes : 10
}

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes + action.quantity 
            }
            default: 
            return state
    }
}

//1st responsibility, redux store pulling application state
const store = createStore(reducer)

//get the current state in the store
console.log('Initial state', store.getState())

//allow the app to subscribe to changes in the store
const unsubscribe = store.subscribe(()=>console.log('updatedState',store.getState()))

//allowing a dispatch for an action
store.dispatch(order_cake())
store.dispatch(order_cake())
store.dispatch(order_cake())
store.dispatch(restock_cake(4))
store.dispatch(order_cake())


unsubscribe()


