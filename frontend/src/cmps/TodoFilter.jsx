const { NavLink } = ReactRouterDOM;

export function TodoFilter(props) {

    return <form onSubmit={props.onSubmit}>
        <h2>Filter</h2>
        <input onChange={props.onSearch} type="text" placeholder="Search for a todo" />
        <button onClick={() => props.changeStatus('all')}>All</button>
        <button onClick={() => props.changeStatus(false)}>Active</button>
        <button onClick={() => props.changeStatus(true)}>Done</button>
    </form>
}