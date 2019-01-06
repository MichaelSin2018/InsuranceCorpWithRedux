console.clear();

//People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
  return { // Action (a form in our analogy)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name)=> {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
}

// Reducers (Departments!)
const claimHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (FORM!)
    return [...oldListOfClaims, action.payload]; // ES2015
  }
  
  // we don't care the action (form!!)
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action)=> {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type == 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  
  return listOfPolicies;
}
  
console.log('Redux', Redux)

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimHistory: claimHistory,
  politicies: policies  
});

const store = createStore(ourDepartments);

const action1 = createPolicy('Alex', 20)
const action2 = createPolicy('Jim', 30)
const action3 = createPolicy('Bob', 40)
const action4 = createClaim('Alex', 120);
const action5 = createClaim('Jim', 50);
const action6 = deletePolicy('Bob');

store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);
store.dispatch(action5);
store.dispatch(action6);

console.log(store.getState());