import './Pagination.css';

function Pagination({postsPerPage, totalPosts, changePage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button onClick={() => changePage(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Pagination;