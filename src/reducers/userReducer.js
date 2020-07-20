export const initialState = null;
export let posts=[];
export const reducer = (state, action) => {
  if (action.type == "USER") {
      console.log("HUUUUUUU",action.payload);
    return action.payload;
  }
  if (action.type == "CLEAR") {
    console.log("HUUUUUUU");
    return null;
  }
  if (action.type == "POST") {
    console.log("HUUUUUUU[[[[[[[[[[",action.payload);
     posts=action.payload;
     return posts;
  }
  return state;
};
