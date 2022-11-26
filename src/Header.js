function Header({openAddForm}) {
    return (
        <nav className="container-fluid">
            <ul>
                <li><strong>Album Catalog</strong></li>
            </ul>
            <ul>
                <li><a href="#" onClick={openAddForm} role="button" className="outline">Add an album</a></li>
            </ul>
        </nav>
    );
}

export default Header;