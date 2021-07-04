import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
    return (
        <div>
            <Header />

            <main className="mx-auto">
                {props.children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout
