import './App.css'

const LogIn = ({ count, setCount }) => {
  return (
    <>
      <h1>LOGIN | SIGNUP</h1>
      <button onClick={() => setCount(count => (count  + 1))}>
        COCK SIZE is {count}
      </button>
    </>
  );
};

export default LogIn