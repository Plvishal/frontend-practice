// import { useState } from 'react';
// import json from './data.json';
// function TreeLikeStructure() {
//   const [treeData, setTreeData] = useState(json);
//   const [isExpanded, setIsExpended] = useState({});

//   const List = ({ list = [] }) => {
//     return (
//       <div className="text-left pl-[20px]">
//         {list?.map((node) => (
//           <div key={node.name}>
//             {node.isFolder && (
//               <span
//                 className="cursor-pointer"
//                 onClick={() =>
//                   setIsExpended((prev) => ({
//                     ...prev,
//                     [node.name]: !prev[node.name],
//                   }))
//                 }
//               >
//                 {isExpanded?.[node?.name] ? '+' : '-'}
//               </span>
//             )}
//             <span>{node?.name}</span>
//             {isExpanded?.[node.name] && node?.children && (
//               <List list={node.children} />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };
//   return (
//     <>
//       <div className="font-serif text-center">
//         <h1 className="border-b">File/Folder Explores</h1>
//         <List list={treeData} />
//       </div>
//     </>
//   );
// }

// export default TreeLikeStructure;

import { useState } from 'react';
import json from './data.json';

function TreeLikeStructure() {
  const [expandedMap, setExpandedMap] = useState({});

  console.log('expandedMap=========>:::', expandedMap);

  const List = ({ list = [], parentPath = '' }) => {
    return (
      <div className="pl-5 border-l border-gray-300">
        {list.map((node) => {
          const currentPath = `${parentPath}/${node.name}`;
          const expandedChild = expandedMap[parentPath];
          const isOpen = expandedChild === node.name;

          return (
            <div key={currentPath} className="mb-1">
              {node.isFolder ? (
                <div
                  className={`cursor-pointer select-none flex items-center gap-1 px-2 py-1 rounded mb-1 
                  ${
                    isOpen
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setExpandedMap((prev) => ({
                      ...prev,
                      [parentPath]: isOpen ? null : node.name,
                    }));
                  }}
                >
                  <span className="text-sm font-medium">
                    {isOpen ? '📂' : '📁'}
                  </span>
                  <span>{node.name}</span>
                </div>
              ) : (
                <div className="pl-6 text-sm">📄 {node.name}</div>
              )}
              {isOpen && node.children && (
                <List list={node.children} parentPath={currentPath} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="font-sans text-left max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h1 className="text-lg font-bold mb-4 border-b pb-2">📁 File Explorer</h1>
      <List list={json} />
    </div>
  );
}

export default TreeLikeStructure;
