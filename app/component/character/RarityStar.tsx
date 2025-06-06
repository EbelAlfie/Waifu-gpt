export const RarityStar = ({classname, color = "white"}: {classname?: string, color?: string}) => {
    return <svg width="8" height="8" viewBox="0 0 8 8" fill={color} xmlns="http://www.w3.org/2000/svg" className={classname}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.923 3.89L6.7 3.438a3.611 3.611 0 01-2.138-2.137L4.11.077a.117.117 0 00-.22 0L3.44 1.3a3.61 3.61 0 01-2.138 2.138L.077 3.89A.118.118 0 000 4c0 .049.031.093.077.11l1.224.451A3.61 3.61 0 013.439 6.7l.451 1.224a.117.117 0 00.22 0l.451-1.224A3.611 3.611 0 016.7 4.561l1.224-.451a.117.117 0 000-.22z" fill="#fff" fill-opacity=".45">            
        </path>
    </svg>
}