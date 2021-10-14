import React from 'react';

import './container.css';

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (<div className="container">
        {children}
    </div>);
}

export default Container;