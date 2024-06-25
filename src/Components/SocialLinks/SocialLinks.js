import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SocialLinks({ links }) {
    const { REACT_APP_API_URL } = process.env;

    return (
        <div className="flex gap-4 justify-start">
            {links.map(link => (
                <Link
                    key={link.id}
                    to={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center"
                >
                    <img src={`${REACT_APP_API_URL}/assets/images/social/${link.social_network.logo}`} className="w-6 h-6 object-contain" alt={link.social_network.name} />
                    <span>{link.social_network.name}</span>
                </Link>
            ))}
        </div>
    )
}