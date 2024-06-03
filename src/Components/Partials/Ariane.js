import React from "react";
import { Link } from "react-router-dom";

export default function Ariane({ ariane }) {
    return (
        <div className="text-grey-dark">
            {ariane.map((item, index) => {
                const isLast = index === ariane.length - 1;
                const className = isLast ? 'text-blue-dark' : '';
                console.log(item.state)
                return (
                    <span key={index}>
                        {item.url ? (
                            <Link to={item.url} className={className} state={item.state? item.state : ''}>
                                {item.text}
                            </Link>
                        ) : (
                            <span className={className}>{item.text}</span>
                        )}
                        {!isLast && ' / '}
                    </span>
                );
            })}
        </div>
    );
}

