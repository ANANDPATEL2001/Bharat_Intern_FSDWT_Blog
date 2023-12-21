import "./navbar.css"

const Component_navbar = () => {
    return (
        <>
            <div className="navbar">
                <img src={"https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-22.png"} className="logo" alt="Loading your Logo" />
                <ul className="links-container">
                    <li className="link-item"><a href="/" className="link">Home</a></li>
                    <li className="link-item"><a href="/editor" className="link">editor</a></li>
                </ul>
            </div>
        </>
    )
}

export default Component_navbar