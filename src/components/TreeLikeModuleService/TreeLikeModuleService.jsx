import { useState } from 'react';
import json from './data.json';

function TreeLikeModuleService() {
  const [expandedMap, setExpandedMap] = useState({});
  const [activeModule, setActiveModule] = useState(null); // Only one module can be active

  const List = ({ list = [], parentPath = '' }) => {
    return (
      <div className="pl-5 border-l border-gray-300">
        {list.map((node) => {
          const currentPath = `${parentPath}/${node.name}`;
          const expandedChild = expandedMap[parentPath];
          const isOpen = expandedChild === node.name;
          const isActiveModule = activeModule === currentPath;

          return (
            <div key={currentPath} className="mb-1">
              {node.isFolder ? (
                // SERVICE (folder-like)
                <div
                  className={`cursor-pointer select-none flex items-center gap-1 px-2 mb-1 rounded 
                    ${
                      isOpen
                        ? 'bg-green-100 text-green-700 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  onClick={() => {
                    setExpandedMap((prev) => ({
                      ...prev,
                      [parentPath]: isOpen ? null : node.name,
                    }));
                  }}
                >
                  <span className="text-sm">{isOpen ? '🟢' : '🗂️'}</span>
                  <span>{node.name}</span>
                </div>
              ) : (
                // MODULE (file-like)
                <div
                  className={`pl-6 py-1 cursor-pointer rounded px-2 
                    ${
                      isActiveModule
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveModule(currentPath)}
                >
                  📘 {node.name}
                </div>
              )}

              {/* Render children if service is open */}
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
      <h1 className="text-lg font-bold mb-4 border-b pb-2">
        🧩 Service-Module Tree
      </h1>
      <List list={json} />
      {activeModule && (
        <div className="mt-4 text-sm text-blue-700">
          <strong>Selected Module:</strong> {activeModule}
        </div>
      )}
    </div>
  );
}

export default TreeLikeModuleService;
