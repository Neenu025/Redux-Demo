const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers



const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

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
function order_icecream(qty=1){
    return{
        type: ICECREAM_ORDERED,
        quantity:qty,
    }
}
function restock_icecream(qty=1){
    return{
        type: ICECREAM_RESTOCKED,
        quantity:qty,
    }
}

// const initialState = {
//     numOfCakes : 10,
//     numOfIcecreams : 20,
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIcecreams: 25,
}

const cakeRreducer = (state = initialCakeState, action) =>{
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

const iceCreamReducer = (state = initialIceCreamState, action) =>{
    switch(action.type) {
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIcecreams:state.numOfIcecreams + action.quantity 
            }
            default: 
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeRreducer,
    iceCream : iceCreamReducer
})

//1st responsibility, redux store pulling application state
const store = createStore(rootReducer)

//get the current state in the store
console.log('Initial state', store.getState())

//allow the app to subscribe to changes in the store
const unsubscribe = store.subscribe(()=>console.log('updatedState',store.getState()))

//allowing a dispatch for an action
// store.dispatch(order_cake())
// store.dispatch(order_cake())
// store.dispatch(order_cake())
// store.dispatch(restock_cake(4))
// store.dispatch(order_cake())

const actions = bindActionCreators({order_cake,restock_cake, order_icecream, restock_icecream}, store.dispatch)
actions.order_cake()
actions.order_cake()
actions.order_cake()
actions.order_cake()
actions.restock_cake(6)
actions.order_icecream()
actions.order_icecream()
actions.order_icecream()
actions.restock_icecream(6)



unsubscribe()


