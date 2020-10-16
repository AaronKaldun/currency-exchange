import React from "react";
import Link from "./Link";

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link href="/" className="item">
                Current Rates
            </Link>
            <Link href="/past" className="item">
                Past Rates
            </Link>
        </div>
    );
};

export default Header;
