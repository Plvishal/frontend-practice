import './App.css';
import TreeLikeModuleService from './components/TreeLikeModuleService/TreeLikeModuleService';
// import Signup from './components/Signup';
import TreeLikeStructure from './components/TreeLikeStructure/TreeLikeStructure';

function App() {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center w-full bg-gradient-to-tr from-pink-200 via-blue-400 to-red-300">
        {/* <Signup /> */}

        <TreeLikeStructure />
        <TreeLikeModuleService />
      </div>
    </>
  );
}

export default App;
