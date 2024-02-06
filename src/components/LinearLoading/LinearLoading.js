import React from 'react'

function LinearLoading() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1500 }}>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#ddd' }}>
            <div style={{
              height: '100%',
              width: '60%',
              backgroundColor: '#28a745',
              animation: 'loading-indeterminate 1s infinite linear'
            }}></div>
          </div>
          <style>{`
            @keyframes loading-indeterminate {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      );
}

export default LinearLoading