export const LongButton = ({onClick}: {onClick: () => void}) => {
    return <div className="rounded-full py-5 px-8" onClick={onClick}>
        <p>Details</p>
    </div>
}