const initialData = {
  stdName: "Nirajan",
};
const studentReducer = (state = initialData, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return { stdName: action.payload };
    default:
      return state;
  }
};
export default studentReducer;
